import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react'
import { AddCircle, Create, Grade, HomeOutlined, LibraryBooks, People } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ISideBarList } from '../../models/Layout.model';
import {useAppSelector} from '../../hooks';
import { IUserInfo } from '../auth/auth.slice';

const sideBarItems = {
    ADMIN: {
        routes: [
            {
                text: 'Home',
                icon: <HomeOutlined color="primary" />,
                path: '/'
            },
            {
                text: 'Courses',
                icon: <LibraryBooks color="primary" />,
                path: '/courses'
            },
            {
                text: 'Add Student',
                icon: <AddCircle color="primary" />,
                path: '/add-student'
            },
            {
                text: 'Add Teacher',
                icon: <AddCircle color="primary" />,
                path: '/add-teacher'
            },
            {
                text: 'Create Class',
                icon: <Create color="primary" />,
                path: '/create-class'
            },
            {
                text: 'View Classes',
                icon: <Create color="primary" />,
                path: '/view-class'
            },
            {
                text: 'Students',
                icon: <People color="primary" />,
                path: '/view-student'
            },
            {
                text: 'Teachers',
                icon: <People color="primary" />,
                path: '/view-teacher'
            },
             {
                text: ' Attendence',
                icon: <People color="primary" />,
                path: '/mark-attendence'
            },
            {
                text: 'Grading Criteria',
                icon: <Grade color="primary" />,
                path: '/grading'
            },
        ],
        allAuthorizedPaths: ['', 'profile', 'courses', 'grading', 'add-student', 'view-student', 'add-teacher', 'view-teacher','mark-attendence', 'create-class','view-class']
    },
    TEACHER: {
        routes: [
            {
                text: 'Home',
                icon: <HomeOutlined color="primary" />,
                path: '/'
            },
            {
                text: 'Grading Criteria',
                icon: <Grade color="primary" />,
                path: '/grading'
            }
        ],
        allAuthorizedPaths: ['', 'profile', 'grading']
    },
    STUDENT: {
        routes: [
            {
                text: 'Home',
                icon: <HomeOutlined color="primary" />,
                path: '/'
            },
            {
                text: 'Grading Criteria',
                icon: <Grade color="primary" />,
                path: '/grading'
            }
        ],
        allAuthorizedPaths: ['', 'profile', 'grading']
    }
}


const SideBarList:React.FC<ISideBarList> = ({handleOpen}) => {
    const navigate = useNavigate();
    const user: IUserInfo | null = useAppSelector(state=> state.auth.user);
    const location:string = useLocation().pathname;
    const locationPath:string = location.split('/')[1];
    React.useEffect(()=>{
        if(user !== null && sideBarItems[`${user.role}`].allAuthorizedPaths.indexOf(locationPath) === -1)
            navigate('/not-found');
    },[user])
    const handleClick = (path: string) => {
        navigate(path);
        handleOpen();
    }; 
  return (
  <>
    <Typography margin={'15px 5px'} variant='h3'>
        FCIT
        <Typography margin={'5px'} variant='body2' color={'grey'}>
        Campus Management System
    </Typography>
    </Typography>
    <Divider />
    <List sx={{ padding: '5px 10px'}}>
    <ListItem sx={{
        display: {sm: 'flex', xs: 'flex', md: 'none'}
        }}>
        <ListItemIcon>
            <Avatar />
        </ListItemIcon>
        <ListItemText primary={`Welcome Back ${user?.name}!`} />
    </ListItem>
    <Divider sx={{display: {sm: 'block', xs: 'block', md: 'none'}}} />
        {
            (user !== null && sideBarItems !== null) && sideBarItems[`${user.role}`].routes.map(item=>{
                return <ListItem 
                        sx={{
                            backgroundColor: (locationPath === item.path.split('/')[1] ? '#dde1e4' : 'default'),
                            margin: '5px 0px',
                            borderRadius: '10px',
                            color: 'rgba(0,0,0,0.75)',
                            ":hover": {
                                backgroundColor: (locationPath === item.path.split('/')[1] ? '#dde1e4' : 'default')
                            }
                            }} 
                        onClick={()=>handleClick(item.path)} 
                        key={item.text}
                        button >
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                     <ListItemText primary={item.text} />
                </ListItem>
            })
        }
    </List>
  </>
  )
}

export default SideBarList;