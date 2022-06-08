import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
// import { courseTableBody } from '../../../models/course.model';
import * as yup from 'yup';
import useHandleFormik from '../../../custom hooks/useHandleFormik';
import { makeStyles } from '@mui/styles';
import { ArrowBackOutlined, Save } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { createAlert} from '../../../components/slices/alertify.slice';
import agent from '../../../api/agent';

let initialValue = {
    courseName:'',
    courseId:'',
    creditHours:0       
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
        padding: '20px'
    },
    btn: {
        maxWidth: 200
    }
});

const EditCourse = () => {
    const classes = useStyles();
    const { courses } = useAppSelector(state=> state.course);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {id} = useParams();
    useEffect(()=>{

        if(id !== undefined){
            const getCourse = courses.filter(item=> item.id === (+id))[0];
        if(getCourse){
            initialValue.courseName = getCourse.courseName;
            initialValue.courseId = getCourse.courseId;
            initialValue.creditHours = getCourse.creditHours;
            setValues(initialValue);
        }
        else
            navigate('/courses');
    }else
    navigate('/courses');
    },[]);
    const handleSaveCourseSubmit= async ()=>{
        if(id !== undefined){
            const ID = courses.filter(item=>item.id === (+id))[0].id
            const response = await agent.course.editCourse(localStorage.getItem('token') as string,{...values, id: ID });
            console.log(response);
            if(response.success)
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
            if(response.success)
            setTimeout(()=>{
                navigate("/courses");
            },500);
    }
    else
        setTimeout(()=>{
            navigate("/courses");
        },500);
    }
    const {getFieldProps, handleSubmit, touched, errors, setValues, values} = useHandleFormik(initialValue, validationSchema,handleSaveCourseSubmit);
  return (
    <>
    <Button sx={{marginBottom: '15px'}} startIcon={<ArrowBackOutlined />} color="primary" variant='contained' onClick={()=> navigate('/courses')}>
        Go Back
    </Button>
    <Paper className={classes.paper} sx={{maxWidth: 650}} variant="elevation" elevation={4}>
    <form noValidate onSubmit={handleSubmit}>
        <Stack sx={{mt: 1}}>
            <Typography variant='h1' component='h1' fontSize='30px' align='center'>
                Editing Course
            </Typography>
            <TextField
                margin='normal'
                fullWidth
                label="Course Name"
                {...getFieldProps('courseName')}
                error={Boolean(touched.courseName && errors.courseName)}
                required
             />
             <Typography color="red" component="span">
                  {touched.courseName && errors.courseName}
                </Typography>
             <TextField
                margin='normal'
                fullWidth
                label="Course Id"
                {...getFieldProps('courseId')}
                error={Boolean(touched.courseId && errors.courseId)}
                required
             />
             <Typography color="red" component="span">
                  {touched.courseId && errors.courseId}
                </Typography>
             <TextField
                margin='normal'
                fullWidth
                label="Credit Hours"
                {...getFieldProps('creditHours')}
                error={Boolean(touched.creditHours && errors.creditHours)}
                type='number'
                required
             />
             <Typography color="red" component="span">
                  {touched.creditHours && errors.creditHours}
                </Typography>
             <Box sx ={{
                 mt: 2,
                 display: 'flex',
                 justifyContent: 'space-evenly',
                 alignItems: 'center'
             }}>
                 <Button
                    type="submit"
                    className={classes.btn} 
                    variant='contained' 
                    color="primary"
                    disabled = {
                        (errors.courseName || errors.courseId || errors.creditHours) ? true : false
                      } 
                    startIcon={<Save/>} 
                    fullWidth>
                     Save
                 </Button>
             </Box>
        </Stack>
    </form>
    </Paper>
    </>
  )
}

export default EditCourse;