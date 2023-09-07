import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'; // you will have to install yup
import { yupResolver } from '@hookform/resolvers/yup'; // you will have to install @hookform/resolvers
import axios from "axios";
import swal from 'sweetalert';

function Copyright(props: string) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Alongkorn Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignupSchema = yup.object().shape({
  email: yup.string().required("email is required"),
  password: yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),
  // website: yup.string().url(),
});

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {

  const { register, handleSubmit, reset, formState:{ errors } } = useForm({
    resolver: yupResolver(SignupSchema)
  });

  const onSubmitHandler = async (value) => {
    console.log({ value });

    const email = value.email;
    const password = value.password

    let data = JSON.stringify({
      "username": email, 
      "password": password
    });

    console.log(data);
    
    await axios({
      method: "post",
      url: 'https://candidate.neversitup.com/todo/users/auth',
      headers: {
        // 'Authorization': "Basic " + Config.encoded,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        // then print response status
        if (res) {
          // swal("Success", res.data, "success", {
          //   buttons: false,
          //   timer: 2000,
          // })
          localStorage.setItem('accessToken', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.token));
          window.location.href = "/todo";
        }
      })
      .catch((error) => {
        console.log(error);
        if (error) {
        swal("Failed", error.message, "error");
          // alert(error.message);
        }
      });

    reset();
  };

  // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate sx={{ mt: 1, minWidth: '460px' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email")} 
            />
            <div className="invalid-feedback" style={{ color: 'red', textAlign: 'left' }}>
              {errors.email?.message}
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password")} 
            />
            <div className="invalid-feedback" style={{ color: 'red', textAlign: 'left' }}>{errors.password?.message}</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}