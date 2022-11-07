import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import logo from './logo.svg';
import './App.css';


function FormRow(props) {
  return (
    <React.Fragment>
      <Grid item xs={1}>
        <Button variant="contained">{props.num}</Button>
      </Grid>
    </React.Fragment>
  );
}

const NUMERS = ['1','2','3','4','5','6','7','8','9','0'];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Grid container spacing={1}>
        {NUMERS.map((num, key)=> 
            <Grid container spacing={num} key={key}>
              <FormRow num={num} />
            </Grid>
          )
        }
      </Grid>
    </div>
  );
}

export default App;
