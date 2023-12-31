import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function Tables(props) {
  
  
  return (
    <div style={{ height: 670, width: '100%' }}>
      {props.tableData.length ?<DataGrid
        rows={props.tableData}
        columns={props.cols}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]}
        checkboxSelection={false}
      /> : ' Please add new'}
    </div>
  );
}