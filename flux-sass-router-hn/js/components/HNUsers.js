import React from 'react';

let HNUser = require('./HNUser');
let HNStore = require('../stores/HNStore');

var HNUsers = React.createClass({
    getInitialState: function () {
        return {
            userIds: HNStore.getUserIds(),
        }
    },
    componentDidMount: function(){
        console.log("HNUsers compoentDidMount");
        HNStore.addUserChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        console.log("HNUsers componentWillUnmount");
        HNStore.removeUserChangeListener(this._onChange);
    },
    _onChange: function () {
        console.log("HNUsers _onChange trigger. ");
        this.setState({
            userIds: HNStore.getUserIds()
        })
    },
    render: function () {
        let userItemComp = [];
        this.state.userIds.forEach(value => {
            userItemComp.push(<HNUser userId={value}/>);
        });
        return (
            <div className="box-container ">
                <div className="box-item layout-box-border main">
                    {userItemComp}
                </div>
            </div>
        );
    }
});

module.exports = HNUsers;

