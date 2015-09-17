/**
 * Created by jiangshan on 15/9/12.
 */
var React = require('react');

var ThreadSectionTop = React.createClass({
    getInitialState: function(){
        return {}
    },
   render: function(){
       let unreadThreads = this.props.unreadThreads;
       let unreadCount = unreadThreads.size;
       console.log(this.props.unreadThreads + " " + unreadCount);
       return (
           <div className="row thread-section-top">
               <div><h4>Unread:{unreadCount}</h4></div>
           </div>
       );
   }
});
module.exports = ThreadSectionTop;