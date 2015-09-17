/**
 * Created by jiangshan on 15/9/12.
 */
var React = require('react');
var classNames = require('classnames');
var ChatAction = require('../actions/ChatActions');

var ThreadItem = React.createClass({
    getInitialState:function(){
        //console.log(this.props.message);
        return {}
    },
    render: function(){
        console.log(this.props.currentThreadId + " " + this.props.threadId);
        let classNameObj = classNames({
            'col': true,
            'md-12': true,
            'thread-section-item': true,
            'thread-section-item-flag': this.props.unread,
            'thread-section-item-active': this.props.currentThreadId===this.props.threadId
        });
        return (
            <div className={classNameObj} onClick={this._onClick}>
                <div className="row thread-section-item-content">
                    <div className="col md-6 thread-section-item-name">{this.props.message.threadName}</div>
                    <div className="col md-6 thread-section-item-date">{this.props.message.date.toLocaleTimeString()}</div>
                    <div className="row">
                        <div className="col md-12 thread-section-item-text">
                            <p>{this.props.message.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    _onClick: function(){
        console.log(this.props.threadId);
        ChatAction.clickThread((this.props.threadId));
    }
});
module.exports = ThreadItem;