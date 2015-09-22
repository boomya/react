import React from 'react';

let classNames = require('classnames');
let HNAction = require('../actions/HNActions');

let HNSettings = React.createClass({
    getInitialState: function () {
        return {
            showSettings: false,
            userIdInput:''
        }
    },
    toggleSettings: function (event) {
        event.preventDefault();
        this.setState({
            showSettings: !this.state.showSettings
        })
    },
    render: function () {
        let classNameObj = classNames({
            'settings-layer': true,
            'hidden': !this.state.showSettings
        });
        return (
            <div className="header-setting">
                <div onClick={this.toggleSettings} >settings</div>
                <div className={classNameObj}>
                    <input
                        type="text"
                        onKeyDown={this._addUser}
                        onChange={this._onChange}
                        value={this.state.userIdInput}
                        />
                </div>
            </div>
        );
    },
    _onChange: function (event) {
        this.setState({
            userIdInput: event.target.value
        });
    },
    _addUser: function (event) {
        if(event.keyCode === 13){
            let value = this.state.userIdInput.trim();
            if(value){
                HNAction.create(value);
            }
            this.setState({
                userIdInput: ''
            })
        }
    }
});

module.exports = HNSettings;

