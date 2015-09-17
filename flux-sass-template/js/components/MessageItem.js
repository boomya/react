/**
 * Created by jiangshan on 15/9/12.
 */
var React = require('react');

var MessageItem = React.createClass({
	getInitialState: function(){
		//console.log('date:' + this.props.message.date);
		//console.log('text:' + this.props.message.text);
		return {
		}
	},
    render: function(){
        return (
			<div className="row message-section-item">
				<div className="col md-6 message-section-item-name">{this.props.message.threadName}</div>
				<div className="col md-6 message-section-item-date">{this.props.message.date.toLocaleString()}</div>
				<div className="row message-section-item-content">
					<div className="col md-12 message-section-item-text">
						<p>{this.props.message.text}</p>
					</div>
				</div>
			</div>
        );
    }
});

module.exports = MessageItem;