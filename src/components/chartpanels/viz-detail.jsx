import React from 'react';
import PropTypes from 'prop-types';
import { Paper, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Grid from '@material-ui/core/Grid';
import './viz-detail.scss'; // because this overrides MUI class names and they are mixed-case with hyphens, CSS module won't work here

export default class VizDetailPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.expandDetails = this.expandDetails.bind(this);
  }

  componentDidMount() {
    this.props.showDetails(this.expandDetails);
  }

  expandDetails() {
    this.setState({ expanded: true });
  }

  closeDetails() {
    this.setState({ expanded: false });
  }

  renderDetails() {
    let tables;
    if (this.props.data.tables) {
      tables = this.renderTables(this.props.data.tables);
    }

    const header = this.props.data.header;
    if (header) {
      let display = <>
        <Grid container justify='space-between'>
          <Grid item xs={12} className='label'>{header.title}</Grid>
          <Grid item xs={12} className='itemName'>{header.itemName}</Grid>
          <Grid item xs={12} className='label'>{header.label}</Grid>
          <Grid item xs={12} className='itemName'>{header.subitemName}</Grid>
          <Grid item xs={6} className='rowLabel'>{header.totalLabel}</Grid>
          <Grid item xs={6} className='rowValue'>${header.totalValue.toLocaleString('en')}</Grid>
          {tables}
        </Grid>
      </>
      return display;
    }
  }

  renderTables(data) {
    let tableFrag = [];
    data.forEach(table => {
      tableFrag.push(<Grid item xs={6} className='col1title'>{table.col1Title}</Grid>);
      tableFrag.push(<Grid item xs={6} className='col2title'>{table.col2Title}</Grid>);

      if (table.rows) {
        Object.keys(table.rows).forEach(rowLabel => {
          tableFrag.push(<Grid item xs={6} className='rowLabel'>{rowLabel}</Grid>);
          tableFrag.push(<Grid item xs={6} className='rowValue'>${table.rows[rowLabel].toLocaleString('en')}</Grid>);
        });
      }
    });
    return tableFrag;
  }

  render = () => (
    <Paper className={'details' + (this.state.expanded ? ' expanded' : '')}>
      <IconButton className='closeButton'
        onClick={() => this.closeDetails()}
      >
        <HighlightOffIcon />
      </IconButton>
      {this.renderDetails()}
    </Paper>
  );
};

/*
  Notes on props:
  showDetails is a function on the parent viz triggering opening this panel
  data is all the info for the details, with main properties "header" and array of "table"s
  e.g.
{
  'header': {
    'title': 'Institution',
    'itemName': 'Central College',
    'label': 'Public, 2-year',
    'subItemName': null,
    'totalLabel': 'Total $ Received',
    'totalValue': 1100000
  },
  'tables': [
    {
      'col1Title': 'Funding Investment Type',
      'col2Title': null,
      'rows': {
        'Contracts': 35000,
        'Grants': 590200,
        '   Grants (Research)': 0
      }
    },
    {
      'col1Title': 'Institution (Top 5)',
      'col2Title': 'Toatal Investment',
      'rows': {
        'UNLV': 35000,
        'Baker College': 590200,
        'Massachusetts General Hospital Dietetic Intership': 6954359235967253
      }
    }
  ]
}
*/

VizDetailPanel.propTypes = {
  showDetails: PropTypes.func,
  data: PropTypes.object.isRequired
};
