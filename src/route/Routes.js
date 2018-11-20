import React from 'react';
import {HashRouter as Router,Route} from 'react-router-dom';

import Login from './../login/Login';
import Register from './../register/Register';
import Home from './../home/Home';


import App from './../components/App';
import Game from './../game/Game';

class Routes extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' component={Login}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/home' component={Home}/>
                    <Route path='/app' component={App}/>
                    <Route path='/game' component={Game}/>
                </div>
            </Router>
        )
    }
}
//exact： bool
// 若为 true，只有当访问地址严格匹配时激活样式才会应用
//strict: bool
// 若为 true，只有当访问地址后缀斜杠严格匹配（有或无）时激活样式才会应用
export default Routes