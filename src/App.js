import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/';
import Home from './components/Home';
import View from './components/View';
import Edit from './components/Edit';
import Create from './components/Create';

const theme = createTheme({
  typography: {
    fontFamily: "'League Spartan', sans-serif"
  }
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/create' element={<Create />} />
            <Route path='/view/:id' element={<View />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
