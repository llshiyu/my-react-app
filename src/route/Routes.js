import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from './../login/Login';

class Routes extends React.Component {
    constructor(prop) {
        super(prop)
    }

    render() {
        return (

            <Router>
                <Route path={'/' + this.props.url} component={Login}></Route>
            </Router>

        )
    }
}

export default Routes