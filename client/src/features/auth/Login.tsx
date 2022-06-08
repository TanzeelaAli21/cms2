import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as yup from 'yup';
import { IUser } from '../../models/universal.model';
import useHandleFromik from '../../custom hooks/useHandleFormik';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { Cancel, Send, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import agent from '../../api/agent';
import { useAppDispatch } from '../../hooks';
import { createAlert } from '../../components/slices/alertify.slice';


const initialState: IUser = {
  email: '',
  password: ''
}
const validationSchema = yup.object().shape({
  email: yup.string().email("email is required").required("email is required").min(3, "minimum three characters are required"),
  password: yup.string().required("password is required").min(6, "minimum six characters password are required")
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

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = React.useState<true | false>(false);

  const handleformSubmit = async () =>{
    let response: any;
    response = await agent.auth.login({email: values.email, password: values.password});
    console.log(response);
    if(response.success){
      dispatch(createAlert({
        severity: 'success',
        message: response.message as string,
        open: true
      }))
      localStorage.setItem("userId",response.data.id);
      navigate('/login-otp');
    }
    else
      dispatch(createAlert({
        severity: 'error',
        message: response.message as string,
        open: true
      }))
  }
  const {values, setFieldValue, getFieldProps, handleSubmit, errors, touched} = useHandleFromik(initialState,validationSchema, handleformSubmit);
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
                  label="email"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  InputProps= {{
                    endAdornment: <InputAdornment position='end'>
                      {
                        values.email && <IconButton onClick={()=>setFieldValue('email', '')
                      }> <Cancel /> </IconButton>
                      }
                    </InputAdornment>
                  }}
                />
                <Typography color="red" component="span">
                  {touched.email && errors.email}
                </Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  type= {`${isVisible ? 'text' : 'password'}`}
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                  InputProps= {{
                    endAdornment: <InputAdornment position='end'>
                      { <IconButton onClick={()=>setIsVisible(isVisible=> !isVisible)}>
                        {isVisible ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      }</InputAdornment>
                  }}
                />
                <Typography color="red" component="span">
                  {touched.password && errors.password}
                </Typography>
                <Button
                  type="submit"
                  startIcon={<Send />}
                  disabled = {
                    (errors.username || errors.password) ? true : false
                  }
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </form>
              <Grid container>
                <Grid item xs>
                  <Link onClick={()=>navigate('/forgot-password')} sx={{cursor: 'pointer'}}>
                  Forgot password?
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