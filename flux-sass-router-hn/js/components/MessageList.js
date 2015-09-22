/**
 * Created by jiangshan on 15/9/12.
 */
let React = require('react');

let MessageItem = require('./MessageItem');

let MessageList = React.createClass({

    render: function(){
		let messages = this.props.messages;
		var messageListItem = [];
		if(messages.length > 0){
			messages.forEach((value) => {
				messageListItem.push(
					<MessageItem message={value} key={value.id} />
				)
			});
		}

        return (
            <div className="row row-border message-section-list">
				{messageListItem}
            </div>
        );
    }
});
module.exports = MessageList;