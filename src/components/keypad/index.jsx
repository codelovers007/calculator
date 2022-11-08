import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const NUMERS = ['1','2','3','4','5','6','7','8','9','0'];

function FormRow(props) {
    return (
      <React.Fragment>
        <Grid item xs={1}>
          <Button variant="contained">{props.num}</Button>
        </Grid>
      </React.Fragment>
    );
}

export default function Keypad() {
  return (
    <Grid container spacing={1}>
        {NUMERS.map((num, key)=> 
            <Grid container spacing={num} key={key}>
            <FormRow num={num} />
            </Grid>
        )
        }
    </Grid>
  );
}