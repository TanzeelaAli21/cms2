import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';



 const Drop = ({studentClass, classesData,handleClassChange }) => {

    const handleChange = (event) => {
       const currentClass = classesData.filter((classObj) => classObj.id == event.target.value)
        handleClassChange(currentClass[0]);
        console.log(currentClass[0], "...currentClass.......");
        
        // setAge(event.target.value as string);
      };
      const list = classesData ? classesData.map((product, key) => <MenuItem value={product.id}>{product.course.courseName}</MenuItem>) : [];

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={studentClass}
          label="studentClass"
          onChange={handleChange}
        >
            {list}
        </Select>
      </FormControl>
    </Box>
  );
};
export default Drop;