import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import {useAppDispatch, useAppSelector} from '../../../hooks';
import { useNavigate } from "react-router-dom";
import { ICreateClass } from "../../../models/class.model";
import { getClassesAsync } from '../class/classes.slice';
import useGetHeight from "../../../custom hooks/useGetHeight";
import { classTableHead } from "../../../models/class.model";

const ViewClasses = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(()=>{
    const getClasses = async () => await dispatch(getClassesAsync(localStorage.getItem('token') as string));
    getClasses();
  },[])
  const { classes } = useAppSelector(state=> state.class);
  console.log('classes',classes);
  const handleCLick = () => {
    navigate("/create-class");
  };    
  return (
    <>
      <Button
        onClick={handleCLick}
        variant="contained"
        color="primary"
        startIcon={<Add />}
      >Add Class</Button>
      <br /> <br />
      <Paper sx={{width: '100%', overflow: 'hidden'}}>
      <TableContainer
        sx={{maxHeight: (+useGetHeight().height-175)}}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {classTableHead.map((item, index) => (
                <TableCell sx={{ fontWeight: 'bold'}} key={index}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.length <=0 ? (
              "NO Classes found"
            ) : classes.map(item => (
              <TableRow key={item.id} hover>
                <TableCell style={{minWidth: 100}}>{item.id}</TableCell>
                {/* <TableCell style={{minWidth: 100}}>{item.courseId}</TableCell> */}
                <TableCell style={{minWidth: 100}}>{item.course.courseId}</TableCell>
                <TableCell style={{minWidth: 200}}>{item.course.courseName}</TableCell>
                <TableCell style={{minWidth: 100}}>
                  <IconButton
                    onClick={() => navigate(`/view-classes/${item.id}`)}
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

export default ViewClasses;