import * as React from 'react';

class Screen extends React.Component {
    state = {
        firstVal: '',
        secondVal: '',
        operator: '',
        display: '0',
    }

    getOverall = () => {
        const { 
            firstVal,
            secondVal,
            operator,
        } = this.state
        return firstVal + ' ' + operator + ' ' + secondVal
    }

    render() {
        return(
            <div className="display">
                <p className="display-overall">{ this.getOverall().trim() }</p>
                <p className="display-text">{ this.state.display }</p>
            </div>
        );
    }

}

export default Screen;