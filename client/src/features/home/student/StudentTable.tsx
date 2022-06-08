import { Avatar, IconButton, Skeleton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../../hooks';
import { StudentTableHead } from '../../../models/user.model';
import useGetHeight from '../../../custom hooks/useGetHeight';
import { makeStyles } from "@mui/styles";
import { Edit, Visibility } from '@mui/icons-material';
import { IStudent } from './student.slice';
import agent from '../../../api/agent';

interface IStudentTable {
    searching: true | false
}

const useStyles = makeStyles({
    tableHead: {
        border: '1px solid lightgrey',
        backgroundColor: 'lightgrey'
    }
})

const StudentTable:React.FC<IStudentTable> = ({searching}) => {
    const { students, isLoading } = useAppSelector(state=>state.students);
    const [showStudents, setShowStudents] = React.useState<IStudent[]>(students);
    useEffect(()=>{
        setShowStudents(students);
    },[students])
    const handleActive = async (index: number) =>{
        Object.freeze(showStudents);
        let newShowStudents = [...showStudents];
        let setActive =  !showStudents[index].active
        newShowStudents[index] = {...showStudents[index], active: setActive };
        setShowStudents(newShowStudents);
        const response = await agent.user.changeActive(localStorage.getItem('token') as string,showStudents[index].id , setActive);
        console.log(response);
    }
    const classes = useStyles();
    const height = +useGetHeight().height;
  return (
    <>
        { !searching && <Typography color="CaptionText" component={'h5'} variant={'h5'}>Search Students</Typography> }
        { (searching && isLoading) && <Skeleton variant='rectangular' animation='wave' width="100%" height={300}></Skeleton>}
        {
            (searching && !isLoading) && students.length === 0 ? <Typography color="CaptionText" component={'h5'} variant={'h5'}>No Students Found</Typography> 
            : (searching && !isLoading) && <TableContainer sx={{maxHeight: height - 275, border: '1px solid lightgrey'}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow className={classes.tableHead}>
                            {
                                StudentTableHead.map((item, index)=>(
                                    <TableCell sx={{ fontWeight: 'bold'}} key={index}>{item}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            showStudents.map((item, index)=>(
                                <TableRow key={item.id} hover>
                                    <TableCell>
                                        <Avatar />
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.RollNo}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>
                                        <Switch
                                            color='primary'
                                            checked={item.active}
                                            onChange={()=>handleActive(index)}
                                        />
                                    </TableCell>
                                    <TableCell>    
                                    <IconButton size="small" color="primary"> <Visibility /> </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        }
    </>
  )
}

export default StudentTable