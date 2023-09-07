import React, { useEffect, useState, useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup"; // you will have to install yup
import { yupResolver } from "@hookform/resolvers/yup"; // you will have to install @hookform/resolvers
import axios from "axios";
import swal from "sweetalert";

function Copyright(props: string) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Alongkorn Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const EditToDoSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  // website: yup.string().url(),
});

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Edit() {
  const [data, setData] = useState([]);

  // Use the useLocation hook to access the current location, which includes the search (query) part of the URL
  const location = useLocation();

  // Use URLSearchParams to parse the query parameters
  const queryParams = new URLSearchParams(location.search);

  // Get the 'id' parameter from the query
  const id = queryParams.get("id");

  const token = localStorage.getItem("accessToken");


  if (!token) {
    return <LoginPage />;
  }

  const fethDataTodoAll = useCallback(
    async (token, id) => {

      await axios({
        method: "get",
        url: `https://candidate.neversitup.com/todo/todos/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          // then print response status
          if (res) {
            console.log(res.data);
            setData(res.data);
            setValue("title", res.data?.title, { shouldValidate: true });
            setValue("description", res.data?.description, { shouldValidate: true });
          }
        })
        .catch((error) => {
          console.log(error);
          if (error) {
            swal("Failed", error.message, "error");
          }
        });
    },
    [token]
  );

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        fethDataTodoAll(token, id);
      } catch (error) {
        // Handle errors
      }
    };

    if (active) {
      fetchData();
    }
    return () => {
      active = false;
    };
  }, [token, id, fethDataTodoAll]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditToDoSchema),
  });

  const onSubmitHandler = async (value) => {
    // console.log({ value });

    const title = value.title;
    const description = value.description;

    
    let data = JSON.stringify({
      title: title,
      description: description,
    });

    // console.log(data);
    
    // return false
    await axios({
      method: "put",
      url: `https://candidate.neversitup.com/todo/todos/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        // then print response status
        if (res) {
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

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit To Do List
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            sx={{ mt: 1, minWidth: "460px" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label=""
              id="title"
              autoComplete="title"
              multiline
              {...register("title")}
            />
            <div
              className="invalid-feedback"
              style={{ color: "red", textAlign: "left" }}
            >
              {errors.title?.message}
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label=""
              id="description"
              autoComplete="description"
              multiline
              {...register("description")}
            />
            <div
              className="invalid-feedback"
              style={{ color: "red", textAlign: "left" }}
            >
              {errors.description?.message}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
