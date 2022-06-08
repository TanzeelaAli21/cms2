import { Visibility } from '@mui/icons-material';
import { Avatar, IconButton, Skeleton, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react'
import agent from '../../../api/agent';
import useGetHeight from '../../../custom hooks/useGetHeight';
import { useAppSelector } from '../../../hooks'
import { TeacherTableHead } from '../../../models/user.model';
import { ITeacher } from './teacher.slice';

interface ITeacherTable {
    searching: true | false
}

const TeacherTable:React.FC<ITeacherTable> = () => {
    const { teachers, isLoading } = useAppSelector(state=>state.teachers);
    const [showTeachers, setShowTeachers] = React.useState<ITeacher[]>(teachers);
    React.useEffect(()=>{
      setShowTeachers(teachers);
    },[teachers])
    const handleActive = async (index: number) =>{
      Object.freeze(showTeachers);
      let newShowTeachers = [...showTeachers];
      let setActive =  !showTeachers[index].active
      newShowTeachers[index] = {...showTeachers[index], active: setActive };
      setShowTeachers(newShowTeachers);
      const response = await agent.user.changeActive(localStorage.getItem('token') as string,showTeachers[index].id , setActive);
      console.log(response);
  }
    const height = +useGetHeight().height;
  return (
    <>
    {
      isLoading ? <Skeleton variant='rectangular' animation='wave' width="100%" height={300}></Skeleton> :
      showTeachers.length <= 0 ? <Typography color="CaptionText" component={'h5'} variant={'h5'}>No Teacher Found</Typography> :
      <TableContainer sx={{maxHeight: height - 275, border: '1px solid lightgrey'}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {
                                TeacherTableHead.map((item, index)=>(
                                    <TableCell sx={{ fontWeight: 'bold'}} key={index}>{item}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            showTeachers.map((item, index)=>(
                                <TableRow key={item.id} hover>
                                    <TableCell>
                                        <Avatar />
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.designation}</TableCell>
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

export default TeacherTable