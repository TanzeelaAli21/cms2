import { Drawer } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { ISideBar } from '../../models/Layout.model';
import SideBarList from './SideBarList';

const drawerWidth: number = 240;

const useStyles = makeStyles({
    drawer: {
        width: drawerWidth
    },
    DrawerPaper: {
        width: drawerWidth,
    }
})

const Sidebar:React.FC<ISideBar> = ({open, Mobileopen, handleOpen, handleMobileOpen}) => {
    const classes = useStyles();
    return (
        <>
        <Drawer
            className={classes.drawer}
            sx={{
                display: { xs: 'none', sm: 'none', md: 'block' }
            }}
            variant='permanent'
            open
            classes={{paper: classes.DrawerPaper}}
        >
            <SideBarList handleOpen={()=>null} />
        </Drawer>
        <Drawer
            className={open ? classes.drawer : ''}
            sx={{
                display: { xs: 'none', sm: 'block', md: 'none' }
            }}
            variant='persistent'
            open={open}
            classes={{paper: classes.DrawerPaper}}
        >
            <SideBarList handleOpen={()=>null} />
        </Drawer>
        <Drawer
            sx={{
                display: { xs: 'block', sm: 'none', md: 'none' }
            }}
            ModalProps={{
                keepMounted: true
            }}
            variant='temporary'
            anchor='left'
            open={Mobileopen}
            onClose={handleMobileOpen}
            classes={{paper: classes.DrawerPaper}}
        >
            <SideBarList handleOpen={handleMobileOpen} />
        </Drawer>
        </>
    )
}

export default Sidebar;