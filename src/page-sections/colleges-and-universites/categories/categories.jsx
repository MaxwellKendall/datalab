import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Accordion from '../../../components/accordion/accordion';
import Downloads from '../../../components/section-elements/downloads/downloads';
import Grid from '@material-ui/core/Grid';
import { Hidden } from '@material-ui/core';
import SearchPanel from '../../../components/chartpanels/search';
import StoryHeading from '../../../components/section-elements/story-heading/story-heading';
import SunburstIcon from '../../../images/sunburst_icon.svg';
import VizControlPanel from '../../../components/chartpanels/viz-control';
import TableContainer from "./table-container";

import CategoriesVizContainer from "./sunburst-container/sunburst-container";
import * as _ from "lodash"

const Categories = () => {

  const [chartView, isChartView] = useState(true);
  const switchView = view => {
    if (view === 'chart') {
      isChartView(true);
    } else {
      isChartView(false);
    }
  }

  const [fundingType, setFundingType] = useState('contracts');
  function onTypeChange(e) {
    setFundingType(e.currentTarget.value);
    updateTableData(tableData[e.currentTarget.value]);
  };

  const titlesByType = {
    contracts: {
      categoryLabel: 'Contract',
      dataType: 'PSC',
      centerText: 'Total FY2018 Contract Funding'
    },
    grants: {
      categoryLabel: 'Grant',
      dataType: 'CFDA',
      centerText: 'Total FY2018 Grant Funding'
    },
    research: {
      categoryLabel: 'Research Grant',
      dataType: 'CFDA',
      centerText: 'Total FY2018 Research Grants Funding'
    }
  }

  const _data = useStaticQuery(graphql`
    query {
      contracts: allInvestmentSectionContractsV2Csv {
        nodes {
          id
          Agency
          Obligation
          Program_Title
          Recipient
          Subagency
          family
        }
      }
      grants: allInvestmentSectionGrantsV2Csv {
        nodes {
          id
          Agency
          Obligation
          Program_Title
          Recipient
          Research
          Subagency
          family
        }
      }
      research: allInvestmentSectionGrantsV2Csv(filter: {Research: {eq: "y"}}) {
        nodes {
          id
          Agency
          Obligation
          Program_Title
          Recipient
          Research
          Subagency
          family
        }
      }
      contractsSearch: allInvestmentSectionContractsV2Csv {
        group(field: Program_Title) {
          nodes {
            id
            family
            Program_Title
          }
        }
      }
      grantsSearch: allInvestmentSectionGrantsV2Csv {
        group(field: Program_Title) {
          nodes {
            id
            family
            Program_Title
          }
        }
      }
      researchSearch: allInvestmentSectionGrantsV2Csv(filter: {Research: {eq: "y"}}) {
        group(field: Program_Title) {
          nodes {
            id
            family
            Program_Title
          }
        }
      }
    }
  `);

  const searchSort = (a, b) => {
    if (a.heading > b.heading) return 1;
    if (a.heading < b.heading) return -1;
    if (a.subheading > b.subheading) return 1;
    if (a.subheading < b.subheading) return -1;
    return 0;
  };

  // due to how GraphQL groups, we only want the first of each unique group
  const searchList = {
    contracts: _data.contractsSearch.group
      .map(n => ({
        id: n.nodes[0].id,
        heading: n.nodes[0].family,
        subheading: n.nodes[0].Program_Title
      }))
      .sort(searchSort),
    grants: _data.grantsSearch.group
      .map(n => ({
        id: n.nodes[0].id,
        heading: n.nodes[0].family,
        subheading: n.nodes[0].Program_Title
      }))
      .sort(searchSort),
    research: _data.researchSearch.group
      .map(n => ({
        id: n.nodes[0].id,
        heading: n.nodes[0].family,
        subheading: n.nodes[0].Program_Title
      }))
      .sort(searchSort)
  };


  const tableColumnTitles = [{title: 'Family'}, {title: 'Program Title'}, {title: 'Agency'}, {title:'Subagency'}, {title: 'Recipient'}, {title: 'Obligation'}];
  const tableData = {
    contracts: _data.contracts.nodes
      .map(n => [n.family, n.Program_Title, n.Agency, n.Subagency, n.Recipient, parseInt(n.Obligation)]),
    grants: _data.grants.nodes
      .map(n => [n.family, n.Program_Title, n.Agency, n.Subagency, n.Recipient, parseInt(n.Obligation)]),
    research: _data.research.nodes
      .map(n => [n.family, n.Program_Title, n.Agency, n.Subagency, n.Recipient, parseInt(n.Obligation)])
  };

  const [filteredTableData, setFilteredData] = useState(tableData[fundingType]);
  const tableRef = React.createRef();

  function filterTableData(id) {
    let data = [];
    let itemList;

    const searchListByType = searchList[fundingType];

    itemList = searchListByType.find(function(el){
      return el.id === id;
    });

    let obj = _.filter(tableData[fundingType], {0: itemList.heading, 1:itemList.subheading});

    if(obj && obj.length > 0) {
      data.push(obj);
    }

    data = _.flatten(data);
    console.log(data);

    updateTableData(data);
  }

  function updateTableData(data) {
    setFilteredData(data);
    if (tableRef && tableRef.current) { tableRef.current.updateTableData(data); }
  }

  const chartRef = React.createRef();

  const searchItemSelected = id => {
    filterTableData(id);
    if (chartRef && chartRef.current) { chartRef.current.clickById(id); }
  }

  return (
    <>
      <StoryHeading
        number={'04'}
        title={'Investment Categories'}
        teaser={'How was the money used?'}
        blurb={`Now that we know how much money was invested in higher education, are you curious to know how the money was used? This visualization allows you to discover the various categories the government uses to classify funding. Note: Product and Service Codes (PSCs) are used to categorize contract purchases of products and services and Federal Assistance Listings are used to categorize grant funding.`}
      />

      <Hidden lgUp>
        <SearchPanel
          searchList={searchList[fundingType]}
          listDescription='Categories'
          showCollapse
          onSelect={searchItemSelected}
        />
      </Hidden>

      <Accordion title='Instructions'>
        <ul>
          <li>Select an investment type: contracts, grants, or research grants</li>
          <li>Hover over each section to determine the category</li>
          <li>Click on a specific section to display the total awards for that category</li>
          <li>Click the center section to return to the original display</li>
        </ul>
      </Accordion>

      <Grid container>
        <Grid item>
          <Hidden mdDown>
            <VizControlPanel
              searchList={searchList[fundingType]}
              listDescription='Categories'
              onSelect={searchItemSelected}
              switchView={switchView}
            >
              <img src={SunburstIcon} />
            </VizControlPanel>
          </Hidden>
        </Grid>
        <Grid item>
          <div id='sunburstRadio'>
            <Grid container>
              <Grid item>
                <input type='radio'
                  id='cuContracts'
                  name='FundingType'
                  value='contracts'
                  onChange={onTypeChange}
                  checked={fundingType === 'contracts'}
                />
                <label htmlFor='cuContracts'>&nbsp;Contracts</label>
              </Grid>
              <Grid item>
                <input type='radio'
                  id='cuGrants'
                  name='FundingType'
                  value='grants'
                  onChange={onTypeChange}
                  checked={fundingType === 'grants'}
                />
                <label htmlFor='cuGrants'>&nbsp;Grants</label>
              </Grid>
              <Grid item>
                <input type='radio'
                  id='cuResearch'
                  name='FundingType'
                  value='research'
                  onChange={onTypeChange}
                  checked={fundingType === 'research'}
                />
                <label htmlFor='cuResearch'>&nbsp;Research Grants</label>
              </Grid>
            </Grid>
          </div>
          <CategoriesVizContainer
            display={chartView}
            items={_data[fundingType].nodes}
            title={titlesByType[fundingType]}
            chartRef={chartRef}
          />
          <TableContainer
            fundingType={fundingType}
            display={!chartView}
            title={titlesByType[fundingType].categoryLabel + 's'}
            columnTitles={tableColumnTitles}
            data = {filteredTableData}
            tableRef = {tableRef} />

        </Grid>
      </Grid>

      <Downloads
        href={'assets/js/colleges-and-universities/download-files/Agency_Section_Download.csv'}
        date={'March 2019'}
      />
    </>
  )
}

export default Categories;
