import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import useHandleFormik from "../../../custom hooks/useHandleFormik";
import { makeStyles } from "@mui/styles";
import { ArrowBackOutlined, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../../../hooks';
import { createAlert } from '../../../components/slices/alertify.slice';
import agent from '../../../api/agent';

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

const AddCourse = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleAddCourseSubmit = async () => {
    const response = await agent.course.addCourse(localStorage.getItem('token') as string, values);
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
        onClick={() => navigate("/courses")}
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
              Add Course
            </Typography>
            <Grid container justifyContent={"space-between"}>
              <Grid
                item
                sx={{ paddingRight: "5px" }}
                xs={6}
                sm={6}
                md={6}
                lg={6}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  label="Course Id"
                  {...getFieldProps("courseId")}
                  error={Boolean(touched.courseId && errors.courseId)}
                  required
                />
                <Typography color="red" component="span">
                  {touched.courseId && errors.courseId}
                </Typography>
              </Grid>
              <Grid
                item
                sx={{ paddingLeft: "5px" }}
                xs={6}
                sm={6}
                md={6}
                lg={6}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  label="Course Name"
                  {...getFieldProps("courseName")}
                  error={Boolean(touched.courseName && errors.courseName)}
                  required
                />
                <Typography color="red" component="span">
                  {touched.courseName && errors.courseName}
                </Typography>
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              fullWidth
              label="Credit Hours"
              {...getFieldProps("creditHours")}
              type='number'
              error={Boolean(touched.creditHours && errors.creditHours)}
              required
            />
            <Typography color="red" component="span">
              {touched.creditHours && errors.creditHours}
            </Typography>

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
                  errors.courseId||
                  errors.courseName ||
                  errors.creditHours
                    ? true
                    : false
                }
                startIcon={<Save />}
                fullWidth
              >
                Save
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </>
  );
};

export default AddCourse;
