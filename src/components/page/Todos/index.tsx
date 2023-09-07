import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { styled } from "@mui/material/styles";
import { deepOrange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import moment from 'moment';

import LoginPage from "../LoginPage";
import ButtonAdd from "./add";

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


const defaultTheme = createTheme();

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: 'rgb(31, 200, 219)',
  backgroundImage: 'linear-gradient(141deg, rgb(159, 184, 173) 0%, rgb(31, 200, 219) 51%, rgb(44, 181, 232) 75%)',
  borderRadius: '5px',
  color: '#fff'
}));

export default function Todos() {
  const [data, setData] = useState([]);

  // data.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  // console.log(data);
   
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <LoginPage />;
  }

  const fethDataTodoAll = useCallback(async (token) => {

    await axios({
      method: "get",
      url: "https://candidate.neversitup.com/todo/todos/",
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
        }
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          swal("Failed", error.message, "error");
        }
      });
  }, [token]);

  const handleRemove = async (id) => {
    await axios({
      method: "delete",
      url: `https://candidate.neversitup.com/todo/todos/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((res) => {
        // then print response status
        if (res) {
          console.log(res.data);
          fethDataTodoAll();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          swal("Failed", error.message, "error");
          // fethDataTodoAll();
        }
      });
  };

  const handleValueChange = async () => {
    // alert("AEEEY");
    fethDataTodoAll(token);
  }

  useEffect(() => {

    let active = true;

    const fetchData = async () => {
      try {
        fethDataTodoAll(token);
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

  }, [token, fethDataTodoAll]);

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Todo List
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <ButtonAdd onValueChange={handleValueChange}></ButtonAdd>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((card) => (
              <Grid item key={card._id} xs={12} sm={12} md={12}>
                <Demo>
                  <List>
                    <ListItem
                    sx={{pr: {xs: 7, md: 9, lg: 10 }}}
                      secondaryAction={
                        <>
                        <IconButton 
                        sx={{ display: {xs: 'block', md: 'inline-flex', lg: 'inline-flex'}}}
                        edge="center" 
                        aria-label="edit" 
                        onClick={() => {
                          window.location.href = `/todo/edit?id=${card._id}`
                        }}
                        >
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(card._id)}>
                          <DeleteIcon />
                        </IconButton>
                        </>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: deepOrange[500] }} alt={card.title}  src="/">
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={card.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "block" }}
                              component="span"
                              variant="body2"
                              color="white"
                            >
                              {card.description ? card.description : null}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              color="white"
                            >
                                {card.createdAt ? moment(card.createdAt).format('L') : null}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </List>
                </Demo>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
    </>
  );
}
