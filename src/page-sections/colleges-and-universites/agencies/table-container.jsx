import React from "react";
import DataTable from "src/components/table/data-table";


const AgenciesTableContainer = (props) => {

  if(props.display) {
    return(<>
      <DataTable
        idName={'agenciesTable'}
        columnTitles={props.tableColumnTitles}
        data={props.tableData}
        ref={props.tableRef}
      />
    </>)
  } else {
    return null;
  }

}

export default AgenciesTableContainer;