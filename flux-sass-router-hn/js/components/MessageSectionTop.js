/**
 * Created by jiangshan on 15/9/12.
 */
var React = require('react');

var MessageSectionTop = React.createClass({
    render: function(){
        return (
            <div className="row message-section-top">
                <div><h4>{this.props.threadId}</h4></div>
            </div>
        );
    }
});
module.exports = MessageSectionTop;