import * as React from 'react';
import './App.css';
import Calculator from './components/calculator';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Typography variant='h4' className="h4-white-typo">
        Simple Calculator
      </Typography>

      <Calculator/>
    </div>
  );
}

export default App;
