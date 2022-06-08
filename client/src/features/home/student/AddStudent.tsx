import { Button, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import InputMask from 'react-input-mask';
import { degrees, INewStudent } from '../../../models/user.model';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppDispatch } from '../../../hooks';
import { createAlert } from '../../../components/slices/alertify.slice';
import agent from '../../../api/agent';
import * as yup from 'yup';
import useHandleFormik from '../../../custom hooks/useHandleFormik';

const initialState:INewStudent = {
    name: '',
    fatherName: '',
    cnic: '',
    email: '',
    DOB: null,
    degree: '',
    shift: 'M'
}

const validationSchema = yup.object().shape({
    name: yup.string().required("full name is required"),
    fatherName: yup.string().required('Father Name is required'),
    email: yup.string().email("give proper email").required("email is required"),
    cnic: yup.string().required("CNIC is required").min(29),
    DOB: yup.date().required("DOB is required"),
    degree: yup.string().required("degree is required"),
    shift: yup.string().required("Shift should be morning or evening")
})

const AddStudent = () => {
    const dispatch = useAppDispatch();

    const handleFormSubmit = async () =>{

        const response = await agent.student.addStudent(localStorage.getItem('token') as string,{
            ...values,
            name: values.name.toUpperCase() as string,
            fatherName: values.fatherName.toUpperCase() as string
        });
        if(response.success)
            dispatch(createAlert({
                message: response.message as string,
                open: true,
                severity: 'success'
            }))
        else
        dispatch(createAlert({
            message: response.message as string,
            open: true,
            severity: 'error'
        }))

    }

    const {
        values, setFieldValue, getFieldProps, handleSubmit, errors, touched
    } = useHandleFormik(initialState, validationSchema, handleFormSubmit);

  return (
    <>
        <Paper
            sx={{ padding: '20px'}}
            variant="elevation"
            elevation={4}
        >
            <Typography
                variant="h1"
                component="h1"
                fontSize="30px"
                align="center"
                color="rgba(0,0,0,0.75)"
                padding="0px 0px 0px 10px"
            >
                Enroll Student
            </Typography>
            <br />
            <form noValidate onSubmit={handleSubmit}>
                <Grid spacing={1} container>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <TextField
                            label="Name"
                            type="text"
                            margin="dense"
                            fullWidth
                            {...getFieldProps('name')}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                         />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                    <TextField
                            label="Father's Name"
                            type="text"
                            margin="dense"
                            fullWidth
                            {...getFieldProps('fatherName')}
                            error={Boolean(touched.fatherName && errors.fatherName)}
                            helperText={touched.fatherName && errors.fatherName}
                         />
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            minDate={new Date(12/31/1980)}
                            disableFuture
                            label="Date of Birth"
                            value={values.DOB}
                            views={["year","month", "day"]}
                            onChange={(newValue=> setFieldValue('DOB',newValue))}
                            renderInput={(params) => <TextField 
                                                        error={Boolean(touched.DOB && errors.DOB)}
                                                        helperText={touched.DOB && errors.DOB}
                                                        {...params}
                                                        margin="dense"
                                                        />}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                    <InputMask
                        mask="9 9 9 9 9 - 9 9 9 9 9 9 9 - 9"
                        maskPlaceholder=" "
                        {...getFieldProps('cnic')}
                    >
                        {() => <TextField label="CNIC" margin='dense'
                            error={Boolean(touched.cnic && errors.cnic)}
                            {...getFieldProps('cnic')}
                            helperText={touched.cnic && errors.cnic} fullWidth />}
                    </InputMask>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                    <TextField
                            label="E-mail"
                            type="email"
                            margin="dense"
                            fullWidth
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                         />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <TextField {...getFieldProps('degree')}
                            margin="dense"
                            error={Boolean(touched.degree && errors.degree)}
                            helperText={touched.degree && errors.degree} select fullWidth label="Select the degree">
                            {degrees.map((item,index)=>{
                                return <MenuItem key={index} value={item.value}>{item.title}</MenuItem>
                            })}
                        </TextField>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        <TextField {...getFieldProps('shift')}
                            error={Boolean(touched.shift && errors.shift)}
                            helperText={touched.shift && errors.shift} select fullWidth label="Select the degree">
                            <MenuItem value={'M'}>Morning</MenuItem>
                            <MenuItem value={'E'}>Evening</MenuItem>
                        </TextField>
                    </Grid>
                </Grid>
                <br />
                <Button color='primary' variant='contained' type='submit'>Add Student</Button>
            </form>
        </Paper>
    </>
  )
}

export default AddStudent;