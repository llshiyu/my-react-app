import React from 'react';

class Square extends React.Component{
    constructor(prop){
        super(prop);
        this.state={
            value: null
        }
    }
    bottonClick=()=>{
        this.props.onClick();
    };
    render(){
        return (
            <button className='square' onClick={this.bottonClick}>
                {this.props.value}
            </button>
        )
    }
}

export default Square