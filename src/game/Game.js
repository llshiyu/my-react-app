import React from 'react';
import './Game.css';
import Board from './Board';

class Game extends React.Component{
    constructor(prop){
        super(prop)
    }

    render(){
        return (
            <div className='game'>
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div></div>
                    <ol></ol>
                </div>
            </div>
        )
    }
}

export default Game;