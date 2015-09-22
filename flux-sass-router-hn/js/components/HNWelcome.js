import React from 'react';

let APIUtils = require('../utils/APIUtils');
let HNStore = require('../stores/HNStore');

var HNWelcome = React.createClass({
    render: function () {
        return (
            <div className="box-container ">
                <h2>Hello World.</h2>
            </div>
        );
    }
});

module.exports = HNWelcome;

