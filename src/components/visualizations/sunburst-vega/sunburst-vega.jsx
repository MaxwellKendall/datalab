/* eslint-disable no-magic-numbers */
import React from 'react';
import { Vega } from 'react-vega';
import sunburstSpec from './utils/sunburst-spec';
import * as _ from 'lodash';

import './sunburst-vega.scss';

/* PLEASE DO NOT DELETE this import
  This code is used to transform the sunburst data in to code that's usable by Vega.  This should be handled on the data analyst
  side but hasn't been rewritten yet due to the analyst backlog being long. */
// import transformData from './utils/transformData.js';

export default class Sunburst extends React.Component {
  constructor(props) {
    super(props);
    /* PLEASE DO NOT DELETE this console.log
        This code is used to transform the sunburst data in to code that's usable by Vega.  This should be handled on the data analyst
        side but hasn't been rewritten yet due to the analyst backlog being long. */
    // console.log(transformData());

    const data = this.appendColors(this.props.data);

    this.state = {
      data: data,
      info: '',
      spec: sunburstSpec,
      originalData: data,
      agency: null,
      level: null
    };

    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleUpdateData = this.handleUpdateData.bind(this);
    this.appendColors = this.appendColors.bind(this);
    this.updateViz = this.updateViz.bind(this);
    this.signalListeners = { arcClick: this.handleClick, arcHover: this.handleHover };
  }

  // works: data is updated by parent, but chart won't redraw when state changed below
  // componentDidUpdate(prevProps) { 
  //   if (this.props.data !== prevProps.data) {
  //     this.setState({ data: this.props.data });
  //   }
  // }

  appendColors(flare) {
    let agencies = _.filter(flare.tree, { 'type': 'agency' });
    let agenciesColors = {};
    let colors = this.props.colors;
    agencies = _.map(agencies, 'name');
    agencies = _.uniqBy(agencies);

    for (let i = 0; i < agencies.length; i++) {
      agenciesColors[agencies[i]] = colors[i % colors.length];
    }

    flare.tree[0]['colorHex'] = '#fff';

    for (let i = 1; i < flare.tree.length; i++) {
      flare.tree[i]['colorHex'] = agenciesColors[flare.tree[i].agency];
    }

    return flare;
  };

  handleHover(...args) {
    const item = args[1];
    this.props.getDetails(item);
  }

  handleClick(...args) {
    const item = args[1];
    this.updateViz(item);
  }

  updateViz(item) {
    const newData = item.id === 1 ? this.state.originalData : { "tree": this.handleUpdateData(item.id) };
    this.props.getDetails(item);
    this.setState({ data: newData, depth: item.depth });
  }

  handleUpdateData(newId) {
    const flare = this.state.originalData;

    let selectedArc = flare.tree.filter(function (item) {
      if (item.id === newId) {
        return item.agency;
      }
    });

    const agencyName = selectedArc[0].agency;
    const depth = selectedArc[0].depth;
    let recipientSubAgencyIds, recipients, subagencies, subAgencyIds, agencyNames;

    if (depth === 2) {
      subagencies = _.filter(flare.tree, { 'name': selectedArc[0].name, 'type': 'subagency' });
      agencyNames = _.map(subagencies, 'agency');
      agencyNames = _.uniqBy(agencyNames);
      subAgencyIds = _.map(subagencies, 'id');

    } else if (depth === 3) {
      recipients = _.filter(flare.tree, { 'name': selectedArc[0].name, 'type': 'recipient' });
      agencyNames = _.map(recipients, 'agency');
      agencyNames = _.uniqBy(agencyNames);
      recipientSubAgencyIds = _.map(recipients, 'parent');

    }

    const filtered = flare.tree.filter(function (item) {
      if(item.id === 1) {
        return true;
      }

      if(depth === 1) {
        return item.agency === agencyName;

      } else if (depth === 2) {
        switch (item.depth) {
          case 1:
            return agencyNames.includes(item.name);

          case 2:
            return item.name === selectedArc[0].name;

          case 3:
            return subAgencyIds.includes(item.parent);

        }

      } else if (depth === 3) {
        switch (item.depth) {
          case 1:
            return agencyNames.includes(item.name);

          case 2:
            return recipientSubAgencyIds.includes(item.id);

          case 3:
            return item.name === selectedArc[0].name;

        }
      }
    });

    this.props.onSelect(selectedArc[0]);

    return filtered;
  }

  render() {
    const { data, spec } = this.state;
    if (typeof window !== 'undefined') {
      return (
        <Vega data={data} spec={spec} signalListeners={this.signalListeners} />
      )
    } else {
      return <div></div>
    }
  }
}