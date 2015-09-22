/**
 * Created by jiangshan on 15/9/12.
 */
var React = require('react');
var ThreadItem = require('./ThreadItem');

var ThreadSectionList = React.createClass({
    render: function(){
        let threads = this.props.threads;
        let threadItemList = [];
        threads.forEach((value, key) => {
            let unread = false;
            if(this.props.unreadThreads.size > 0){
                unread = this.props.unreadThreads.has(key);
            }
            threadItemList.push(
                <ThreadItem
                    message={value}
                    key={key}
                    threadId={key}
                    currentThreadId={this.props.currentThreadId}
                    unread={unread}
                    />
            );
        });
        return (
            <div className="row row-border thread-section-list">
                {threadItemList}
            </div>
        );
    }
});
module.exports = ThreadSectionList;