
import Box from "@mui/material/Box";
import CssBaseline from '@mui/material/CssBaseline';

import './App.css'
import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from './components/page/LoginPage'

function App() {
  const [open, setOpen] = React.useState(true);

  return (
    <>
     <Box sx={{ display: "flex" }}>
     <CssBaseline />
      {/* <Main open={open}> */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} />
          <Route path="/stock" element={<StockPage />} /> */}
        </Routes>
      {/* </Main> */}
    </Box>  
    </>
  )
}

export default App
