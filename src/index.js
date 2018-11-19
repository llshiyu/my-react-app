import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Game from './game/Game';

ReactDOM.render(<div><App name='当前点击次数'/><Game/></div>,document.getElementById('root'));