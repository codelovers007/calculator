import * as React from 'react';
import Screen from '../screen';
import Keypad from '../keypad';

function Calculator() {
  return (
    <div className="App">
      <Screen/>
      <Keypad/>
    </div>
  );
}

export default Calculator;
