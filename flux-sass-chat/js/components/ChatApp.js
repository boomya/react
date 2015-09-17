var React = require('react');
var ThreadSection = require('./ThreadSection');
var MessageSection = require('./MessageSection');
var ChatStore = require('../stores/ChatStore')

var ChatApp = React.createClass({
    render: function () {
        return (
            <div className="container">
                <div className="row">
                    <ThreadSection />
                    <MessageSection />
                </div>
            </div>
        );
    }

});

module.exports = ChatApp;
