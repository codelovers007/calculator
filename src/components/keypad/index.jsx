import * as React from 'react';

class Keypad extends React.Component {
    state = {
      firstVal: '',
      secondVal: '',
      operator: '',
      display: '0',
    }
  
    componentDidMount() {
      const { keypressHandler } = this
      document.addEventListener('keyup', ev => {
        keypressHandler(ev)
      })
    }
  
    keypressHandler = ev => {
      const numRegex = /^([0-9]|\.)*$/g;
      const opRegex =  /[+|\-|:|*]/g;
      const eqRegex =  /(=)/g;
      const delRegex = /(Backspace|Delete)/g;
      const acRegex = /(Escape)/g;
      const key = ev.key
     
      const isNumber = !!numRegex.exec(key)
      const isOperator = !!opRegex.exec(key)
      const isEqual = !!eqRegex.exec(key)
      const isDel = !!delRegex.exec(key)
      const isAc = !!acRegex.exec(key)
      
      if (key && isNumber) {
        this.setNumberValue(key + '')
      }
      
      if (key && isOperator) {
        this.setOperatorValue(key + '')
      }
      
      if (key && isEqual) {
        this.equalHandler()
      }
      
      if (key && isDel) {
        this.deleteChar()
      }
      
      if (key && isAc) {
        this.allClear()
      }
    }
  
    resetState = resetAll => {
        if (resetAll) {
            this.setState({
                firstVal: '',
                secondVal: '',
                operator: '',
                display: '0',
          })
      } else {
            this.setState({
                firstVal: '',
                secondVal: '',
                operator: '',
          })
      }
    } 
    
    hasPoint = (value) => {
        return value.indexOf('.') > -1
    }
    
    setNumberValue = value => {
      let total

      if (value === '.') {
          if (!this.state.operator && !this.hasPoint(this.state.firstVal)) {     	
          total = this.fixNumberString(this.state.firstVal + value)
                  this.setState({
                     firstVal: total
              })
        }
          if (!!this.state.operator && !this.hasPoint(this.state.secondVal)) {
          total = this.fixNumberString(this.state.secondVal + value)
                  this.setState({
                     secondVal: total
              })
        }
        if (total) {
          this.setDisplay(total + '')
        }
        return
      }

      if (!this.state.operator) {
        total = this.fixNumberString(this.state.firstVal + value)
        this.setState({
            firstVal: total
        })
      } else {
        total = this.fixNumberString(this.state.secondVal + value)
        this.setState({
            secondVal: total
        })
      }
      this.setDisplay(total + '')
    }
    
    setDisplay = value => {
        this.setState({
          display: value,
      })
    }
    
    getCurrentTargetValue = () => {
      return !this.state.operator ? this.state.firstVal : this.state.secondVal
    }
    
    numberClickHandler = (e) => {
      const value = e.target.innerHTML
      if (value) {
        this.setNumberValue(value)
      }
    }
    
    setOperatorValue = operatorInput => {
      const fixedNumber = this.fixNumberString(this.state.firstVal, false)
      
      if (this.state.firstVal && !this.state.secondVal) {
        this.setState({
          operator: operatorInput,
          display: fixedNumber,
        })
      } else if (this.state.firstVal && this.state.operator && this.state.secondVal) {
       const total = this.calculate()
       this.setState({
         operator: operatorInput,
         firstVal: total + '',
         secondVal: '',
       })
       this.setDisplay(total + '')
      } else {
        this.setState({
          operator: operatorInput,
          firstVal: this.fixNumberString(this.state.display, false),
        })
      }
    }
    
    operatorClickHandler = (e) => {      
      this.setOperatorValue(e.target.innerHTML)
    }
    
    allClear = () => {
        this.resetState(true)
    }
    
    deleteChar = () => {      
      if (!this.state.operator) {
        const newVal = this.state.firstVal.slice(0, -1)
        this.setState({
          firstVal: newVal,
          display: newVal ? newVal : '0',
        })
      } else if (this.state.operator && !this.state.secondVal) {
        this.setState({
          display: this.state.firstVal,
          operator: '',
        })
      } else {
        const newVal = this.state.secondVal.slice(0, -1)
        this.setState({
          secondVal: newVal,
          display: newVal ? newVal : '0',
        })
      }
    }
    
    removeZeroAtStart = value => {
      return value.indexOf('0') === 0 ? value.substring(1) : value
    }
    
    fixNumberString = (value, finalize = false) => {
      if (finalize && value.indexOf('.') === value.length - 1 && value.length > 1) { 
        return value + '0'
      }
      if (value.indexOf('0') === 0 && !value.indexOf('0.') === 0) {
        return value.substring(1)
      }
      if (value.indexOf('.') === 0 && value.length === 1) {
        return '0.'
      }
      if (!value) {
        return '0'
      }
      return value
    }
    
    calculate = () => {
      const vfirstVal = this.fixNumberString(this.state.firstVal, true)
      const vsecondVal = this.fixNumberString(this.state.secondVal, true)
      let total = '0';
      
      switch (this.state.operator) {
          case '-' :
            total = parseFloat(vfirstVal) - parseFloat(vsecondVal)
            break;
        case '*':
            total = parseFloat(vfirstVal) * parseFloat(vsecondVal)
            break;
          case ':' :
            total = parseFloat(vfirstVal) / parseFloat(vsecondVal)
            break;
          case '+' :
        default:
            total = parseFloat(vfirstVal) + parseFloat(vsecondVal)
            break;
      }
      
      return total.toLocaleString()
    }
    
    equalHandler = () => {      
      if (this.state.firstVal && this.state.secondVal && this.state.operator) {
        let total = this.calculate()
        this.setDisplay(total + '')
        this.resetState()
      }
    }

    numberButtons = (handler, nums) => {
      return(
        <div className="row">
          <button onClick={handler}>{nums[0]}</button>
          <button onClick={handler}>{nums[1]}</button>
          <button onClick={handler}>{nums[2]}</button>
        </div>
      );
    }

    render(){
        const activeOperator = name => {
            return this.state.operator === name ? 'active' : ''
        }
        
        const operatorsArr = ['+', '-', ':', '*']

        return(
            <div className="inputs">
                <div className="column main">
                <div className="operator">
                    <div className="row">
                        { operatorsArr.map( opr => {
                            return (
                              <button 
                                className={activeOperator(opr)}
                                onClick={this.operatorClickHandler}>
                                  {opr}
                              </button>
                            )
                          })
                        }
                    </div>
                </div>
                <div className="numbers">
                    { this.numberButtons(this.numberClickHandler, [1,2,3])}
                    { this.numberButtons(this.numberClickHandler, [4,5,6])}
                    { this.numberButtons(this.numberClickHandler, [7,8,9])}
                    <div className="row">
                        <button onClick={this.numberClickHandler}>.</button>
                        <button onClick={this.numberClickHandler}>0</button>
                        <button onClick={this.deleteChar}>C</button>
                    </div>
                </div>
                </div>
                <div className="column sides">
                    <button className="ac" onClick={this.allClear}>AC</button>
                    <button className="equal" onClick={this.equalHandler}>=</button>
                </div>
            </div>
        );
    }
}

export default Keypad;