import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function ListClassRecord({classRecord, onSelectRecord}) {
    // console.log(studentClass, ".......studentClass");
    const columns = [
        { field: 'id', headerName: 'id', width: 200 },
        {
          field: 'date',
          headerName: 'Attendence Date',
          width: 150,
          editable: true,   
        },
    
      ];
      const rows = [];
      classRecord.forEach(element => {
          rows.push({id: element.id, date: element.createdAt});
      });

    const data = {"rows": rows, "columns": columns}

  const [selectionModel, setSelectionModel] = React.useState([]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        onSelectionModelChange={(newSelectionModel) => {
            console.log(newSelectionModel, "newSelectionModel");
            setSelectionModel(newSelectionModel);
             onSelectRecord(newSelectionModel);
        }}
        selectionModel={selectionModel}
        {...data}
      />
    </div>
  );
}
