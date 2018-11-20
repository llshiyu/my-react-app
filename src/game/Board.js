import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            squares: Array(9).fill(null),
            XIsNext: true
        }
    }

    calculateWinner=(squares)=> {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    parentSquareClick(i) {
        const squares = this.state.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.XIsNext ? 'X' : 'O';
        this.setState({squares: squares, XIsNext: !this.state.XIsNext});
    };

    renderSquare(i) {
// 不能写成 onClick={props.onClick()} 否则 props.onClick 方法会在 Square 组件渲染时被直接触发
// 而不是等到 Board 组件渲染完成时通过点击触发，
// 又因为此时 Board 组件正在渲染中（即 Board 组件的 render() 方法正在调用），
// 又触发 handleClick(i) 方法调用 setState() 会再次调用 render() 方法导致死循环。
        return <Square value={this.state.squares[i]} onClick={() => this.parentSquareClick(i)}/>
    }

    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.XIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

export default Board