
import React from 'react';
import PropTypes from 'prop-types';

import tableTheme from './data-table-theme';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
const theme = () => createMuiTheme(tableTheme);

export default class dataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  options = {
    serverSide: false,
    selectableRows: 'none',
    download: true,
    print: true,
    filterType: 'textField'
  };

  render = () =>
    <MuiThemeProvider theme={theme()}>
      <MUIDataTable
        title={this.props.title}
        columns={this.props.columnTitles}
        data={this.props.data}
        options={this.options}
      />
    </MuiThemeProvider>
}

/*
  Notes on props:
  length of "columns" and each "data" row should match and have same order; excess data columns will not appear
*/
dataTable.propTypes = {
  title: PropTypes.string,
  columnTitles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired
}
