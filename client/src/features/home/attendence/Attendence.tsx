import React, {useEffect} from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  MenuItem
} from "@mui/material";
import * as yup from "yup";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import useHandleFormik from "../../../custom hooks/useHandleFormik";
import { makeStyles } from "@mui/styles";
import { ArrowBackOutlined, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../../hooks';
import { createAlert } from '../../../components/slices/alertify.slice';
import Drop from "../../../components/dropdown/Drop";
import Checkbox from "../../../components/checkbox/Checkbox";
import ListClassRecord from "../../../components/classList/ClassList";
import agent from '../../../api/agent';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';



let initialValue = {
  courseId: "",
  courseName: "",
  creditHours: "",
};

const validationSchema = yup.object().shape({
  courseId: yup
    .string()
    .required("courseId is required")
    .min(3, "minimum three characters are required"),
  courseName: yup
    .string()
    .required("course name is required")
    .min(3, "minimum three characters are required"),
  creditHours: yup
    .number()
    .required("credit hours is required")
    .positive('credit hours are always positive')
    .min(1, "credit number can not be less than 1")
    .max(5, "credit hours can not be greater than 5")
});

const useStyles = makeStyles({
  paper: {
    padding: "20px",
  },
});

const Attendence = () => {
let studentAttendances = '';
const [classesData, setClassesData] = React.useState([]);

  useEffect(() => {
    // Update the document title using the browser API
    let token = localStorage.getItem('token') as string; 
    axios.get(`/class/get-students`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.log("response ....", res);
      setClassesData(res.data.classes);
      
    })
  }, []);

  const [value, setValue] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );
  const [studentClass, setStudentClass] = React.useState('');
  const [students, setStudents] = React.useState([]);
  const [classRecord, setClassRecord] = React.useState([]);
  const [updateAttendence, setUpdateAttendence] = React.useState([]);
  const [selectedRecord, setSelectedRecord] = React.useState('');


  const onSelectRecord = (data: string) => {
    console.log("row selected: ", data);
    console.log("row student class : ", studentClass);
    console.log("classRecord", classRecord);

    setUpdateAttendence(classRecord);
    setSelectedRecord(data)
  }
  const handleClassChange = (event: string) => {
    console.log("receviedd ....", event);
    setStudentClass(event);

    // get class record
    let token = localStorage.getItem('token') as string; 
    axios.post(`/class/class-record`,{ currentClass: event }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.log("response ...currentClass.", res);
      setClassRecord(res.data.classRecord);
      
    })
    .catch((err) => {
      console.log("err........", err);
      
    } )
  };
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  const getCheckedAttendance = ( checkedStudents: string)=> {
    studentAttendances = checkedStudents;
    console.log(studentAttendances, ".....checkedStudents......");
    //classStudent, studentAttendances submit both
  }

  const submitAttendence = () =>{
    console.log("submit attendence......");
    let token = localStorage.getItem('token') as string; 
    axios.post(`/attendence/create-attendence`,{date: value, presents:studentAttendances,
       currentClass: studentClass } ,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      console.log("response ....", res);
      setClassesData(res.data.classes);
      
    })
    // axios.post('/create-attendence',{date: value, presents:studentAttendances, currentClass: studentClass })
  
  }


  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleAddCourseSubmit = async () => {
    const response = await agent.course.addCourse(localStorage.getItem('token') as string, values);
    console.log(response);
    if (response.success)
      dispatch(createAlert({
        message: response.message as string,
        open: true,
        severity: "success"
      }));
    else
      dispatch(createAlert({
        message: response.message as string,
        open: true,
        severity: "error"
      }));
    if (response.success)
      setTimeout(() => {
        navigate("/mark-attendence");
      }, 500);
  };
  const { getFieldProps, handleSubmit, touched, errors, values } = useHandleFormik(
    initialValue,
    validationSchema,
    handleAddCourseSubmit
  );
  return (
    <>
      <Button
        sx={{ marginBottom: "15px" }}
        startIcon={<ArrowBackOutlined />}
        color="primary"
        variant="contained"
        onClick={() => navigate("/mark-attendence")}
      >
        Go Back
      </Button>
      <Paper
        className={classes.paper}
        variant="elevation"
        elevation={4}
      >
        <form noValidate onSubmit={handleSubmit}>
          <Stack sx={{ mt: 1 }}>
            <Typography
              variant="h1"
              component="h1"
              fontSize="30px"
              align="center"
            >
              Mark Attendance
            </Typography>
            <Grid container justifyContent={"space-between"}>
              {/* <Grid item xs={4} sm={4} md={4} lg={4}>
                    <TextField label="Designation" select value={searchValue.designation}
                    onChange={(e)=>handleChanges(e.target.name, e.target.value)}
                    margin="dense" size="small" name="designation" fullWidth>
                        <MenuItem value={""}>Select</MenuItem>
                        {
                            designations.map((item,index)=><MenuItem key={index} value={item.value.toUpperCase()} >{item.title}</MenuItem>)
                        }
                    </TextField>
                </Grid> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>


                  <DateTimePicker
                    label="Date&Time picker"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Stack>
              </LocalizationProvider>

              <Drop
                studentClass = {studentClass}
                classesData = {classesData}
                handleClassChange={handleClassChange}
              />

            </Grid>
            {studentClass ? <Checkbox 
              studentClass = {studentClass}
              getCheckedAttendance = {getCheckedAttendance}
              updateAttendence = {updateAttendence} 
              selectedRecord = {selectedRecord}
             /> : null}

            <Box
              sx={{
                mt: 2,
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  errors.courseId ||
                    errors.courseName ||
                    errors.creditHours
                    ? true
                    : false
                }
                startIcon={<Save />}
                fullWidth
                onClick={submitAttendence}
              >
                Save
              </Button>

            </Box>
          </Stack>
        </form>
      </Paper>
      <ListClassRecord classRecord = {classRecord} onSelectRecord = {onSelectRecord}/>

    </>
  );
};

export default Attendence;
