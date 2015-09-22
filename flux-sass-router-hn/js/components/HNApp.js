import React from 'react';
import {Router, Route, RouteHandler, Link, History} from 'react-router';
import HNWelcome from './HNWelcome.js';
import HNUsers from './HNUsers.js';
import HNUserDetail from './HNUserDetail.js';

let HNSettings = require('./HNSettings');

var HNApp = React.createClass({
    componentDidMount: function(){
        console.log("HNApp compoentDidMount");
    },
    componentWillUnmount: function(){
        console.log("HNApp componentWillUnmount");
    },
    render: function () {
        return (
            <div>
                <div className="box-container">
                    <div className="box-item header">
                        <div className="header-logo">
                            logo
                        </div>
                        <div className="header-menu">
                            <Link to="welcome">Welcome </Link>
                            <Link to="users">Users</Link>
                            <Link to="userDetail" params={{id:1}}>Detail</Link>
                        </div>
                        <HNSettings />
                    </div>
                </div>
                <RouteHandler {...this.props}/>
                <div className="box-container">
                    <div className="box-item footer">Sam Jiang</div>
                </div>
            </div>
        );
    }
});

//module.exports = HNApp;

export let routes = (
    <Route name="app" path="/" handler={HNApp}>
        <Route name="welcome" handler={HNWelcome} />
        <Route name="users" path="users" handler={HNUsers} />
        <Route name="userDetail" path="users/:id" handler={HNUserDetail} />
    </Route>
);
