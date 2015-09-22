import React from 'react';
import {Link} from 'react-router';
let HNStore = require('../stores/HNStore');

let {UserDO} = require('../utils/Domain');

var HNUser = React.createClass({
    getInitialState: function () {
        let user = HNStore.getUser(this.props.userId);
        return {
            user: user
        }
    },
    componentDidMount: function(){
        console.log("HNUser compoentDidMount");
        HNStore.addChangeListener(this._onChange);
        if(typeof this.state.user === 'undefined'){
            HNStore.fetchUser(this.props.userId);
        }

    },
    componentWillUnmount: function(){
        console.log("HNUser componentWillUnmount");
        HNStore.removeChangeListener(this._onChange);
    },
    render: function () {
        let user = this.state.user;
        console.log(user + " " + typeof user);
        if(typeof user === 'undefined' || typeof this.state.user.id === 'undefined'){
            return (
                <div className="main-item">
                    LOADING...
                </div>
            );
        }
        return (
            <div className="main-item">
                <div className="main-item-seq">
                    <Link to="userDetail" params={{id:user.id}}> {user.id} </Link>
                </div>
                <div className="main-item-head">
                    <img src={user.headUrl} alt="" />
                </div>
                <div className="user-main-item-content">
                    <div>{user.userName}</div>
                    <div>{user.homePage}</div>
                    <div>{user.location}</div>
                    <div>{user.followers}</div>
                    <div>{user.following}</div>
                </div>
            </div>
        );
    },
    _onChange: function () {
        console.log('HNUser _onChange trigger. ' + this.props.userId);
        let user = HNStore.getUser(this.props.userId);
        if(user !== null){
            this.setState({
                user: user,
            });
        }

    }
});

module.exports = HNUser;

