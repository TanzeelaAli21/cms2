import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function ControlledSelectionGrid({studentClass ,getCheckedAttendance,updateAttendence,selectedRecord}) {
    console.log(studentClass, ".......studentClass");
    if (selectedRecord) {
      let result = updateAttendence.find((obj) => {
        return obj['id'] === parseInt(data[0]);
      });
      result.attendances.map((record) => {
        return ({RollNo: record.studentId, })
      })

    }

    const columns = [
        { field: 'id', headerName: 'RollNo', width: 200 },
        {
          field: 'FullName',
          headerName: 'FullName',
          width: 150,
          editable: true,   
        },
    
      ];
      const rows = [];
      studentClass.students.forEach(element => {
          rows.push({id: element.RollNo, FullName: element.name});
      });

    const data = {"rows": rows, "columns": columns}

  const [selectionModel, setSelectionModel] = React.useState([]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
            console.log(newSelectionModel, "newSelectionModel");
            setSelectionModel(newSelectionModel);
            getCheckedAttendance(newSelectionModel);
        }}
        selectionModel={selectionModel}
        {...data}
      />
    </div>
  );
}
