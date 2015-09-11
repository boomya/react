var React = require('react');
var TodoItemInput = require('./TodoItemInput');
var TodoActions = require('../actions/TodoActions');
var PropTypes = React.PropTypes;

var Header = React.createClass({

    render: function () {
        return (
            <header id="header">
                <h1>todo</h1>
                <TodoItemInput />
            </header>
        );
    },
    // _onSave: function (text) {
    //     console.log("header:" + text);
    //     if (text.trim()) {
    //         console.log("header2:" + text);
    //         TodoActions.create(text);
    //     }
    // }

});

module.exports = Header;
