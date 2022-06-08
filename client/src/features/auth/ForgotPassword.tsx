import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from 'yup';
import useHandleFromik from '../../custom hooks/useHandleFormik';
import { Stack } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import agent from '../../api/agent';
import { useAppDispatch } from '../../hooks';
import { createAlert } from '../../components/slices/alertify.slice';

interface IEmail {
    email: string
}

const initialState:IEmail = {
  email: ''
}
const validationSchema = yup.object().shape({
  email: yup.string().email("email is required").required("email is required")
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

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleformSubmit = async () =>{
    let response: any;
    response = await agent.auth.forgotPassword(values.email);
    console.log(response);
    if(response.success)
    dispatch(createAlert({
      severity: 'success',
      message: response.message as string,
      open: true
    }))
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
            <Stack sx={{ mt: 2 }}>
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                />
                <Typography color="red" component="span">
                  {touched.email && errors.email}
                </Typography>
                <Typography sx={{visibility: 'hidden'}} color="red" component="span">
                  Login OTP is required
                </Typography>
                <Button
                  startIcon={<Send />}
                  type="submit"
                  disabled = {
                    (errors.email) ? true : false
                  }
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Verify
                </Button>
              </form>
              <Grid container>
                <Grid item xs>
                  <Link onClick={()=> navigate("/login")} sx={{cursor: 'pointer'}}>
                    want to login ?
                  </Link>
                </Grid>
              </Grid>
            </Stack>
            <Copyright sx={{ mt: 8 }} />
          </Stack>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}