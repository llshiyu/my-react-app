import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login/Login';
import App from './components/App';
import Game from './game/Game';

import Routes from './route/Routes';

// ReactDOM.render(<div><App name='当前点击次数'/><Game/></div>,document.getElementById('root'));
ReactDOM.render(<Login />, document.getElementById('root'));
// ReactDOM.render(<Routes url='Login'/>, document.getElementById('root'));