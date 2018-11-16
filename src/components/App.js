import React from 'react';
import './App.css';

class App extends React.Component{
    constructor(prop){
        super(prop);
        this.state={
            count: 0
        }
        // this.addCount = this.addCount.bind(this);
        this.reduceCount = this.reduceCount.bind(this);
    }
    addCount=()=>{
        this.setState({count:this.state.count+1})
    }
    reduceCount(){
        this.setState({count:this.state.count-1})
    }
    render(){
        return (
            <div className='box'>
                <button onClick={this.addCount}>+</button>
                <button onClick={this.reduceCount}>-</button>
                <span>{this.props.name}</span>
                <span>{this.state.count}</span>
            </div>
        )
    }
}

export default App;