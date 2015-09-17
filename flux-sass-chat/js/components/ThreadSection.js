/**
 * Created by jiangshan on 15/9/12.
 */
var React  = require('react');
var ChatStore = require('../stores/ChatStore');
var ThreadSectionTop = require('./ThreadSectionTop');
var ThreadSectionList = require('./ThreadSectionList');
var ThreadSectionFooter = require('./ThreadSectionFooter');

var ThreadSection = React.createClass({
    getInitialState: function(){
        return {
            threads: ChatStore.getAllThread(),
            currentThreadId: ChatStore.getCurrentThreadId(),
            unreadThreads: ChatStore.getAllUnreadThread()
        }
    },
    componentDidMount: function () {
        console.log("ThreadSection event onchange");
        ChatStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
        ChatStore.removeChangeListener(this._onChange);
    },
    render: function(){
        return (
            <div className="col md-4 thread-section">
                <ThreadSectionTop
                    currentThreadId={this.state.currentThreadId}
                    unreadThreads={this.state.unreadThreads}
                    />
                <ThreadSectionList
                    threads={this.state.threads}
                    currentThreadId={this.state.currentThreadId}
                    unreadThreads={this.state.unreadThreads}
                />
                <ThreadSectionFooter />
            </div>
        );
    },
    _onChange: function(){
        this.setState({
            threads: ChatStore.getAllThread(),
            currentThreadId: ChatStore.getCurrentThreadId(),
            unreadThreads: ChatStore.getAllUnreadThread()
        });
    }

});

module.exports = ThreadSection;

