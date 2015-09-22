/**
 * Created by jiangshan on 15/9/12.
 */
let React = require('react');
let ChatAction = require('../actions/ChatActions');

let MessageInput = React.createClass({
    getInitialState: function(){
        return {
            text: '',
        }
    },
    render: function(){
        return (
            <div className="row message-section-input">
                <textarea
                    className="message-section-input-textarea"
                    value={this.state.text}
                    onChange={this._onChange}
                    onKeyDown={this._onKeyDown}
                    >
                </textarea>
            </div>
        );
    },
    _onChange: function(event, value){
        this.setState({
           text: event.target.value
        });
    },
    _onKeyDown: function(event){
        if(event.keyCode === 13){
            event.preventDefault();
            let text = this.state.text.trim();
            if(text){
                console.log(text);
				ChatAction.create(text, this.props.threadId);
            }
            this.setState({
                text:''
            });
        }
    }

});

module.exports = MessageInput;