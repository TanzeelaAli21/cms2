import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from 'yup';
import { IUserChangepassword } from '../../models/universal.model';
import useHandleFromik from '../../custom hooks/useHandleFormik';
import { Stack } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import agent from '../../api/agent';
import { useAppDispatch } from '../../hooks';
import { createAlert } from '../../components/slices/alertify.slice';


const initialState: IUserChangepassword = {
  password: '',
  confirmPassword: ''
}
const validationSchema = yup.object().shape({ 
    password: yup.string().required('Password is required').min(6,"password must have 6 digits"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password and confirm password must be same')
});

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target={'_blank'} href="http://www.avisebusiness.com/">
        Avise Business Solutions
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function ResetPassword() {
  const {resetToken} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleformSubmit = async () =>{
    let response: any;
    response = await agent.auth.resetPassword(values.password,resetToken as string);
    console.log(response);
    if(response.success){
      dispatch(createAlert({
        severity: 'success',
        message: response.message as string,
        open: true
      }))
      localStorage.removeItem("userId");
      navigate('/login');
    }
    else
    dispatch(createAlert({
      severity: 'error',
      message: response.message as string,
      open: true
    }))
  }
  const {values,getFieldProps, handleSubmit, errors, touched} = useHandleFromik(initialState,validationSchema, handleformSubmit);
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(/images/pucit.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Stack
            sx={{
              my: 8,
              mx: 4,
              height: '80vh' 
            }}
            direction='column'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography color={'GrayText'} component="h1" variant="h3">
              FCIT CMS
            </Typography>
            <Stack sx={{ mt: 1 }}>
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="New Password"
                  type='password'
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                />
                <Typography color="red" component="span">
                  {touched.password && errors.password}
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...getFieldProps('confirmPassword')}
                  error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                />
                <Typography color="red" component="span">
                  {touched.confirmPassword && errors.confirmPassword}
                </Typography>
                <Button
                  startIcon={<Send />}
                  type="submit"
                  disabled = {
                    (errors.confirmPassword || errors.password) ? true : false
                  }
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              </form>
            </Stack>
            <Copyright sx={{ mt: 8 }} />
          </Stack>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}