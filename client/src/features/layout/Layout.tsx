import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../store';
import { loginAsync } from '../auth/auth.slice';
import Header from './Header';
import Sidebar from './Sidebar';

const useStyles = makeStyles({
    page: {
        padding: '25px',
        marginTop: '60px'
    },
    root:{
        display: 'flex'
    }
})

const Layout:React.FC = () => {
    const navigate = useNavigate();
    const classes = useStyles();
    const [Mobileopen, setMObileOpen] = useState<true | false>(false);
    const handleMobileOpen = () => setMObileOpen((open)=> !open);
    const [open, setOpen] = useState<true | false>(true);
    const handleOpen = () => setOpen((open)=>!open);
    const dispatch = useAppDispatch();
    const auth = useAppSelector((state:RootState)=> state.auth);
    const checkLogin = async (token:string) =>{
        await dispatch(loginAsync(token));
    }
    useEffect(()=>{
        let token = localStorage.getItem('token');
        if(token !== 'undefined' && token !== null)
            checkLogin(token as string);
        else{
            localStorage.removeItem('token');
            navigate('/login');
        }
    },[navigate]);
    useEffect(()=>{
        if(!auth.isLoading && !auth.isLoggedIn){
            navigate('/login');
        }
    }, [auth.isLoading])
    return (
        <div className={classes.root}>
            <Header open={open} handleOpen={handleOpen}  handleMobileOpen={handleMobileOpen} />
            <Sidebar open={open} handleOpen={handleOpen} Mobileopen={Mobileopen} handleMobileOpen={handleMobileOpen} />
            <Grid className={classes.page} container>
                <Grid item lg={8} sm={12} xs={12}>
                <Outlet />
                </Grid>
            </Grid>
        </div>
    )
}

export default Layout;
