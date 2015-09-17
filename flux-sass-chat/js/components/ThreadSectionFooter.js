/**
 * Created by jiangshan on 15/9/12.
 */
var React = require('react');
var classNames = require('classnames');

var TestUtil = require('../utils/TestUtil');

var ThreadSectionFooter = React.createClass({
    getInitialState: function(){
        return {
            isStop: true,
        }
    },
    render: function(){
        let startClassNameObj = classNames({
            'btn': true,
            'btn-success': true,
            'btn-sm': true,
            'hide': !this.state.isStop
        });
        let stopClassNameObj = classNames({
            'btn': true,
            'btn-warning': true,
            'btn-sm': true,
            'hide': this.state.isStop
        });
       return (
           <div className="row thread-section-footer-button">
               <div>
                   <a className={startClassNameObj} onClick={this._start}>start</a>
               </div>
               <div>
                   <a className={stopClassNameObj} onClick={this._stop}>stop</a>
               </div>
           </div>
       );
    },
    _start: function(){
        TestUtil.simulateSendMessage();
        this.setState({
           isStop:false
        });
    },
    _stop: function(){
        TestUtil.stopSendMessage();
        this.setState({
            isStop:true
        });
    }
});
module.exports = ThreadSectionFooter;