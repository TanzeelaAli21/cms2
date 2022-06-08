import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import {useAppDispatch, useAppSelector} from '../../../hooks';
import { useNavigate } from "react-router-dom";
import { courseTableHead } from "../../../models/course.model";
import { getCoursesAsync } from './course.slice';
import useGetHeight from "../../../custom hooks/useGetHeight";

const ViewCourse = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(()=>{
    const getCourses = async () => await dispatch(getCoursesAsync(localStorage.getItem('token') as string));
    getCourses();
  },[])
  const {courses} = useAppSelector(state=> state.course);
  const handleCLick = () => {
    navigate("/courses/");
  };    
  return (
    <>
      <Button
        onClick={handleCLick}
        variant="contained"
        color="primary"
        startIcon={<Add />}
      >
        Add Course
      </Button>
      <br /> <br />
      <Paper sx={{width: '100%', overflow: 'hidden'}}>
      <TableContainer
        sx={{maxHeight: (+useGetHeight().height-175)}}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {courseTableHead.map((item, index) => (
                <TableCell sx={{ fontWeight: 'bold'}} key={index}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.length <=0 ? (
              "NO Course found"
            ) : courses.map(item => (
              <TableRow key={item.id} hover>
                <TableCell style={{minWidth: 100}}>{item.courseId}</TableCell>
                <TableCell style={{minWidth: 200}}>{item.courseName}</TableCell>
                <TableCell style={{minWidth: 100}}>{item.creditHours}</TableCell>
                <TableCell style={{minWidth: 100}}>
                  <IconButton
                    onClick={() => navigate(`/courses/${item.id}`)}
                    color="success"
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
    </>
  );
};

export default ViewCourse;
