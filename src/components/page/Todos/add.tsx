import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

import { useForm } from 'react-hook-form';
import * as yup from 'yup'; // you will have to install yup
import { yupResolver } from '@hookform/resolvers/yup'; // you will have to install @hookform/resolvers
import axios from "axios";
import swal from 'sweetalert';

const AddToDoSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string()
      .required("Description is required")
  // website: yup.string().url(),
});


export default function Add({onValueChange}) {
  const [open, setOpen] = React.useState(false);

  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <LoginPage />;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    onValueChange();
    setOpen(false);
    reset()
    // window.location.reload();
  };

  const { register, handleSubmit, reset, formState:{ errors } } = useForm({
    resolver: yupResolver(AddToDoSchema)
  });


  const handleAddForm = async (value) => {

    const title = value.title;
    const description = value.description

    let data = JSON.stringify({
      "title": title, 
      "description": description
    });

    await axios({
      method: "post",
      url: "https://candidate.neversitup.com/todo/todos/",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        swal("Good job!", "You clicked the button!", "success");
        // then print response status
        if (res) {
          console.log(res.data);
          // setOpen(false);
          handleClose();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          swal("Failed", error.message, "error");
        }
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create To Do
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>TODO</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(handleAddForm)} noValidate>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title "
                name="title"
                autoComplete="title"
                autoFocus
                {...register("title")} 
              />
              <div className="invalid-feedback" style={{ color: 'red', textAlign: 'left' }}>
                {errors.title?.message}
              </div>
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label="description"
                id="description"
                autoComplete="description"
                multiline
                {...register("description")} 
              />
              <div className="invalid-feedback" style={{ color: 'red', textAlign: 'left' }}>{errors.description?.message}</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
             type="submit"
             variant="contained"
             >
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}