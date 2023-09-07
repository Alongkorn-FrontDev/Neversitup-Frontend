
import Box from "@mui/material/Box";
import CssBaseline from '@mui/material/CssBaseline';

import './App.css'
import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from './components/page/login/LoginPage'
import Todos from './components/page/Todos'
import EditTodos from './components/page/Todos/edit'
import AddTodos from './components/page/Todos/add'
import PageTest2 from './components/page/PageTest2'

function App() {

  return (
    <>
     <Box>
     <CssBaseline />
      {/* <Main open={open}> */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/todo" element={<Todos />} />
          <Route path="/todo/add" element={<AddTodos />} />
          <Route path="/todo/edit" element={<EditTodos />} />
          <Route path="/PageTest-2" element={<PageTest2 />} />
        </Routes>
      {/* </Main> */}
    </Box>  
    </>
  )
}

export default App
