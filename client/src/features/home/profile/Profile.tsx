import { CameraAlt } from '@mui/icons-material';
import { Avatar, Badge, Box, Button, Grid, Paper, Stack, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  paper: {
    padding: 15
  },
  avatarBox: {
    textAlign: 'center',
    marginBottom: 30
  },
  camAvatar: {
    cursor: 'pointer',
    transition: '0.25s all ease-in-out',
    "&:hover": {
      transition: '0.25s all ease-in-out',
      width: 38,
      height: 38
    }
  }
});
const dummyLink = '/my.jpg';
const Profile = () => {
  const [modelOpen, setmodelopen] = React.useState<true | false>(false);
  const classes = useStyles();
  return (
    <Paper className={classes.paper} variant='outlined'>
        <form>
          <Box className={classes.avatarBox}>
            <Badge
            overlap='circular'
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            badgeContent = {
              <Avatar className={classes.camAvatar} sx={{width: 35, height: 35}}>
                <CameraAlt />
              </Avatar>
            }
            >
              <Avatar src={dummyLink} sx={{width: 100, height: 100}}
              />
            </Badge>
          </Box>
          <Grid container spacing={3}>
            <Grid item md={6} sm={6} xs={12}>
              <TextField
              label="First Name"
              fullWidth
              defaultValue={'User First Name'}
              disabled
               />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TextField
              label="Last Name"
              fullWidth
              defaultValue={'User Last Name'}
              disabled
               />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TextField
              label="Date Of Birth"
              type={'date'}
              defaultValue={new Date().toISOString().slice(0, 10)}
              fullWidth
              disabled
               />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <TextField
              label="Roll No"
              defaultValue={'BSEFXYMABC'}
              fullWidth
              disabled
               />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <TextField
              label="House Address"
              fullWidth
               />
            </Grid>
          </Grid>
          <Stack marginTop={'15px'} direction={'row-reverse'}>
            <Button variant='contained' color='primary'>
              Save
            </Button>
          </Stack>
        </form>
      </Paper>
  )
}

export default Profile;