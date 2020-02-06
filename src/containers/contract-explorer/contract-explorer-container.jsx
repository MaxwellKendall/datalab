import React, { useState, useEffect } from 'react'

import { Grid, Hidden } from '@material-ui/core';

import Downloads from "src/components/section-elements/downloads/downloads"
import flareData from '../../../static/unstructured-data/contract-explorer/flare.json';
import awardsData from '../../../static/unstructured-data/contract-explorer/awards_contracts_FY18_v2.csv';
import SunburstDetails from './details/sunburst-details';
import Sunburst from 'src/components/visualizations/sunburst-vega/sunburst-vega';
import BreadCrumbs from "src/components/breadcrumbs/breadcrumbs";
import styles from './contract-explorer-container.module.scss';
import Search from 'src/components/chartpanels/search';
import appendColors from './utils/colors';
import findArcById from './utils/find-by-id';
import findArcByName from './utils/find-by-name';
import filterSunburst from './utils/filter';

const SunburstVegaContainer = () => {
  const colors = ['#7A2149', '#61344A', '#4E4861', '#3F566E', '#3C596A', '#2F6567', '#38705F', '#517852', '#88923D',
    '#AE933D', '#D39248', '#EA8052'];

  const detailDefaults = {
    label: null,
    total: null,
    top5: [],
    name: null
  }

  const defaultSelection = {
    name: 'flare',
    depth: 0
  }

  const [arc, setSelectedArc] = useState(null);
  const [previousArc, setPreviousArc] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState(null);
  const [details, setDetails] = useState(detailDefaults);
  const [sunData, setOriginalData] = useState(flareData);
  const [updatedSunData, setData] = useState(sunData);

  useEffect(() => {
    setOriginalData(appendColors(flareData, colors));
    getDetails();
  }, []);

  // create arrays of unique agencies, subagencies and recipients with ID for search list
  const agencies = [];
  const subagencies = [];
  const recipients = [];

  awardsData.map((e, i) => {

    if (agencies.findIndex(a => a.display === e.agency) === -1) {
      agencies.push({
        id: `a${e.agency}`,
        display: e.agency
      });
    }

    if (subagencies.findIndex(s => s.display === e.subagency) === -1) {
      subagencies.push({
        id: `s${e.subagency}`,
        display: e.subagency
      });
    }

    if (recipients.findIndex(r => r.display === e.recipient) === -1) {
      recipients.push({
        id: `r${e.recipient}`,
        display: e.recipient
      });
    }
  });

  const searchList = agencies.concat(subagencies).concat(recipients);

  // try to force redraw of sunburst (or entire container); NOT WORKING
  // const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({ 'thing': 'one' }), ['thing', 'two']);

  const sunburstRef = React.createRef();

  const searchSelect = (id) => {
    const selectedArc = findArcById(sunData, id);
    setSelectedArc(selectedArc);
    // if (sunburstRef && sunburstRef.current) {
    //   sunburstRef.current.updateSunburst(selectedArc);
    // }
  }

  function updateSunburst(selectedArc) {
    const previousArc = arc;
    const newData = selectedArc.id === 1 ? sunData : { "tree": filterSunburst(sunData, selectedArc) };

    if (sunburstRef && sunburstRef.current) { sunburstRef.current.updateData(newData); }
    
    setSelectedArc(selectedArc);
    setPreviousArc(previousArc);
    setData(newData);
    // Update the sections here - ie. breadcrumbs, details,
  }

  function getTop5(items, type) {
    // get all unique values of the item type
    let unique = [...new Set(items.map(item => item[type]))];
    let summedItems = [];

    for (let i = 0; i < unique.length; i++) {
      summedItems.push({
        name: unique[i],
        type: type,
        obligation: items.filter(node => node[type] === unique[i]).reduce((a, b) => a + (b.obligation || 0), 0)
      });
    }
    return summedItems.sort((a, b) => (a.obligation < b.obligation) ? 1 : -1).slice(0, 5);
  }

  function createBreadcrumbTrail(selectedArc) {
    if (!selectedArc) { return; };

    const breadcrumbs = [];
    const agency = sunData.tree.find(node => node.name === selectedArc.agency);

    switch(selectedArc.depth) {
      case 0:
        return;
        break;
      case 1:
        breadcrumbs.push(agency);
        break;
      case 2:
        breadcrumbs.push(agency);
        breadcrumbs.push(selectedArc);
        break;
      case 3:
        const subagency = sunData.tree.find(node => node.id === selectedArc.parent);
        breadcrumbs.push(agency);
        breadcrumbs.push(subagency);
        breadcrumbs.push(selectedArc)
        break;
    }

    const trail = [defaultSelection];

    breadcrumbs.forEach((item) => {
      trail.push({
        name: item.name,  // abbreviation
        depth: item.depth,
        id: item.id,
        arc: selectedArc
      });
    });

    return trail;
  }

  function selectBreadcrumb (d) {
    // if depth is 0, the item flare will be selected
    const selectedArc = findArcByName(sunData, d);
    setSelectedArc(selectedArc);
  }

  const breadcrumbRef = React.createRef();

  function updateBreadcrumbs (selectedArc) {
    const trail = createBreadcrumbTrail(selectedArc);
    if (breadcrumbRef && breadcrumbRef.current) {
      breadcrumbRef.current.updateBreadcrumbs(selectedArc.colorHex, trail);
    }
    setBreadcrumbs(trail);
  }

  function getDetails (selectedArc) {
    const depth = selectedArc && selectedArc.depth ? selectedArc.depth : 0;

    const details = {
      label: null,
      total: null,
      top5: [],
      name: null
    };

    switch (depth) {
      case 0:
        details.label = 'Agencies';
        details.total = awardsData.reduce((a, b) => a + (b.obligation || 0), 0);
        details.top5 = getTop5(awardsData, 'agency');
        details.name = 'Contract Spending In Fiscal Year 2019';
        break;
      case 1:
        details.label = 'Subagencies';
        details.total = awardsData.filter(node => node.agency === selectedArc.agency).reduce((a, b) => a + (b.obligation || 0), 0);
        details.top5 = getTop5(awardsData.filter(node => node.agency === selectedArc.agency), 'subagency');
        details.name = selectedArc.name;
        break;
      case 2:
        details.label = 'Contractors';
        details.total = awardsData.filter(node => node.agency === selectedArc.agency && node.subagency === selectedArc.name).reduce((a, b) => a + (b.obligation || 0), 0);
        details.top5 = getTop5(awardsData.filter(node => node.agency === selectedArc.agency && node.subagency === selectedArc.name), 'recipient');
        details.name = selectedArc.name;
        break;
      case 3:
        const subagency = sunData.tree.find(node => node.id === selectedArc.parent);
        details.total = awardsData.filter(node => node.agency === selectedArc.agency && node.subagency === subagency.name && node.recipient === selectedArc.name).reduce((a, b) => a + (b.obligation || 0), 0);
        details.name = selectedArc.name;
        // add detail here
        break;
    }

    setDetails(details);

  }

  // Upon arc selection, sunburst sends the arc info to the container
  // Use arc to the arc color, selected arc, update breadcrumbs and get details
  function getSelectedArc(selectedArc) {
    const tempPreviousArc = arc;
    updateBreadcrumbs(selectedArc);
    getDetails(selectedArc);
    setPreviousArc(tempPreviousArc);
    setSelectedArc(selectedArc);
  }

  return <>
    <Hidden smDown>
      <Grid container spacing={4} className={styles.sectionContainer}>
        <Grid item md={6}>
          <Search
            searchList={searchList}
            listDescription='Search List of Contracts and Agencies'
            showIcon
            onSelect={searchSelect}
          />
          <div className={styles.sunburstDetails}>
            <SunburstDetails details={details} />
          </div>
        </Grid>
        <Grid item md={6}>
          <BreadCrumbs className={`${styles.header} ${styles.breadcrumbsContainer}`} items={breadcrumbs} onSelect={selectBreadcrumb} ref={breadcrumbRef} />
          <Sunburst
            data={updatedSunData}
            getSelectedArc={getSelectedArc}
            updateSunburst={updateSunburst}
            default={defaultSelection}
            ref={sunburstRef} />
          <div className={styles.sunburstMessage}>The visualization contains data on primary awards to recipients. Sub-awards are not included.</div>
          <Downloads className={styles.downloadContainer}
            href={'/unstructured-data/contract-explorer/awards_contracts_FY18_v2.csv'} />
        </Grid>
      </Grid>
    </Hidden>
    <Hidden mdUp>
      <Search
        searchList={searchList}
        listDescription='Search List of Contracts and Agencies'
        onSelect={searchSelect}
      />
      <BreadCrumbs className={`${styles.header} ${styles.breadcrumbsContainer}`} items={breadcrumbs} onSelect={selectBreadcrumb} ref={breadcrumbRef} />
      <Sunburst
        data={updatedSunData}
        getSelectedArc={getSelectedArc}
        updateSunburst={updateSunburst}
        default={defaultSelection}
        ref={sunburstRef} />
      <div className={styles.sunburstMessage}>The visualization contains data on primary awards to recipients. Sub-awards are not included.</div>
      <Downloads className={styles.downloadContainer}
                 href={'/unstructured-data/contract-explorer/awards_contracts_FY18_v2.csv'} />
      <SunburstDetails details={details} />
    </Hidden>
  </>;
}

export default SunburstVegaContainer;
