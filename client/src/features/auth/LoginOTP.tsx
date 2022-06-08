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
import OtpInput from "react-otp-input";
import { createAlert } from '../../components/slices/alertify.slice';
import { useAppDispatch } from '../../hooks';

interface Iotp {
    otp: string
}

const initialState:Iotp = {
  otp: ''
}
const validationSchema = yup.object().shape({
  otp: yup.string().required("Login OTP is required")
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
export default function LoginOTP() {
  const dispatch = useAppDispatch();
  const userId = localStorage.getItem("userId");
  const [again, setAgain] = React.useState<true | false>(true);
  
    const sendOTPAgain = async () =>{
      if(again){
      setAgain(false);
      let response: any;
      response = await agent.auth.sendOTPAgain(userId as string);
      if(response.success){
        dispatch(createAlert({
          severity: 'success',
          message: response.message as string,
          open: true
        }))
        setTimeout(()=> setAgain(true), 60000);
      }
      else
      dispatch(createAlert({
        severity: 'error',
        message: response.message as string,
        open: true
      }))
    }
    else{
      dispatch(createAlert({
        severity: 'error',
        message: "wait for 1 minute before sending again",
        open: true
      }))
    }
    }

    const navigate = useNavigate();

    React.useEffect(()=>{
      console.log("checking", userId);
      if(userId === null || userId === undefined)
        navigate('/login');
    },[navigate])
  
  const handleformSubmit = async () =>{
    let response: any;
    response = await agent.auth.loginOTP(userId as string,values.otp);
    console.log(response);
    if(response.success){
      dispatch(createAlert({
        severity: 'success',
        message: response.message as string,
        open: true
      }))
      localStorage.setItem("token",response.token);
      localStorage.removeItem("userId");
      setTimeout(()=>{
        navigate('/');
      }, 300)
    }
    else
    dispatch(createAlert({
      severity: 'error',
      message: response.message as string,
      open: true
    }))
  }
  const {values, setFieldValue, handleSubmit, errors} = useHandleFromik(initialState,validationSchema, handleformSubmit);
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
                <OtpInput
                  numInputs={6}
                  value={values.otp}
                  onChange={(otp:string)=>setFieldValue('otp', otp)}
                  separator={<span style={{padding: '0px 5px'}}>-</span>}
                  shouldAutoFocus={true}
                    inputStyle={{
                      border: "1px solid grey",
                      borderRadius: "8px",
                      width: "54px",
                      height: "54px",
                      fontSize: "24px",
                      color: "#006699",
                      fontWeight: "400",
                      caretColor: "#C8D4DB",
                    }}
                    focusStyle={{
                      border: "1px solid #CFD3DB",
                      outline: "none",
                    }}
                />
                <Button
                  startIcon={<Send />}
                  type="submit"
                  disabled = {
                    (errors.otp) ? true : false
                  }
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Verify OTP
                </Button>
              </form>
              <Grid container>
                <Grid item xs>
                  <Link onClick={sendOTPAgain} sx={{cursor: 'pointer'}}>
                    Send OTP Again ?
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