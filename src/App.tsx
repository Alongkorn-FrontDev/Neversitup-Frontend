
import Box from "@mui/material/Box";
import CssBaseline from '@mui/material/CssBaseline';

import './App.css'
import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from './components/page/LoginPage'
import TodoPage from './components/page/TodosPage'
import Todos from './components/page/Todos'
import EditTodos from './components/page/Todos/edit'
import AddTodos from './components/page/Todos/add'

function App() {
  const [open, setOpen] = React.useState(true);

  return (
    <>
     <Box>
     <CssBaseline />
      {/* <Main open={open}> */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/todo" element={<Todos />} />
          <Route path="/todo/add" element={<AddTodos />} />
          <Route path="/todo/edit" element={<EditTodos />} />
          {/* <Route path="/stock" element={<StockPage />} /> */}
        </Routes>
      {/* </Main> */}
    </Box>  
    </>
  )
}

export default App
