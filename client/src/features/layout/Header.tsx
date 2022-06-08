import { ExitToAppOutlined, Menu, PersonOutline } from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createAlert } from '../../components/slices/alertify.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IAppBar } from '../../models/Layout.model';

const drawerWidth:number = 240;

const Header:React.FC<IAppBar> = ({ open,handleOpen,handleMobileOpen }) => {
    const user = useAppSelector( state=> state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogOut = () =>{
        localStorage.removeItem("token");
        dispatch(createAlert({
            message: "Logout successful",
            open: true,
            severity: 'info'
        }))
        navigate('/login');
    }
    return (
        <>
        <AppBar sx={{
            backgroundColor: 'rgba(255,255,255,0.85)',
            width: { md: `calc(100% -${drawerWidth}px)` ,sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
            ml: { sm: `${drawerWidth}px` },
        }} position='fixed' elevation={6}>
            <Toolbar>
            <Box component={'div'} sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                <IconButton sx={{display: {sm: 'none'}, mr: 2}} onClick={handleMobileOpen} size='small' color='primary'>
                    <Menu fontSize='large' />
                </IconButton>
                <IconButton sx={{display: {md: 'none',sm: 'block', xs: 'none'}, mr: 2}} onClick={handleOpen} size='small' color='primary'>
                    <Menu fontSize='large' />
                </IconButton>
                <Stack direction={'row'} alignItems={'center'} spacing={2} sx={{display: {sm: 'none',md: 'flex',xs: 'none'}}}>
                    <Avatar />
                    <Typography variant='h5' color="black">
                        Welcome Back {user?.name}!
                    </Typography>
                </Stack>
                <Box component={'div'} sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <Button color='primary' onClick={()=>navigate('/profile')} sx={{mx: { md: 2, sm: 1, xs: 1}}} startIcon={<PersonOutline />}>Profile</Button>
                    <Button color='primary' onClick={()=>handleLogOut()} sx={{mx: { md: 2, sm: 1, xs: 1}}} startIcon={<ExitToAppOutlined />}>Log out</Button>
                </Box>
                </Box>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Header;
