import * as React from 'react';
import './App.css';
import Calculator from './components/calculator';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className="App calculator">
      <Typography variant='h2'>
        Calculator
      </Typography>

      <Calculator/>
    </div>
  );
}

export default App;
