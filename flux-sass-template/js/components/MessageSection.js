/**
 * Created by jiangshan on 15/9/12.
 */
var React = require('react');
let ChatStore = require('../stores/ChatStore');

var MessageSectionTop = require('./MessageSectionTop');
var MessageList = require('./MessageList');
var MessageInput = require('./MessageInput');

var MessageSection = React.createClass({
	getInitialState: function(){
        let allMessages = ChatStore.getAllByCurrentThreadId();
        //let currentThreadName = '';
        //if(allMessages.length > 0){
        //    currentThreadName = allMessages[0].threadName;
        //}
		return {
            currentThreadId: ChatStore.getCurrentThreadId(),
			messages: allMessages,
		}
	},
	componentDidMount: function () {
		ChatStore.addChangeListener(this._onChange);
	},
	componentWillUnmount: function () {
		ChatStore.removeChangeListener(this._onChange);
	},
	componentDidUpdate: function() {
		console.log('componentDidUpdate');
		this._scrollToBottom();
	},
    render: function(){
        return (
            <div className="col md-7 message-section">
                <MessageSectionTop threadId={this.state.currentThreadId}/>
                <MessageList ref='messageList' messages={this.state.messages}/>
                <MessageInput threadId={this.state.currentThreadId} />

            </div>
        );
    },
	_onChange: function(){
		this.setState({
            currentThreadId: ChatStore.getCurrentThreadId(),
			messages: ChatStore.getAllByCurrentThreadId()
		});
	},
	_scrollToBottom: function(){
		let messageList = this.refs.messageList.getDOMNode();
		messageList.scrollTop = messageList.scrollHeight;
	}
});
module.exports = MessageSection;