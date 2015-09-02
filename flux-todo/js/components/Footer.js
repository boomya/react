var React = require('react');
var TodoActions = require('../actions/TodoActions');
var PropTypes = React.PropTypes;

var Footer = React.createClass({

    render: function () {
        var allTodos = this.props.allTodos;
        var total = Object.keys(allTodos).length;

        if (total === 0) {
          return null;
        }

        var leftItemCount = 0;
        for (var key in allTodos) {
            if(allTodos[key].complete == false){
                leftItemCount++;
            }
        }

        var clearButton;
        if(total-leftItemCount > 0){
            clearButton =
                <button id="clear-completed" onClick={this._destroyCompleted}>
                Clear completed ({total-leftItemCount})
                </button>
        }

        return (
            <footer id="footer">
                <span id="todo-count">
                    <strong>{leftItemCount}</strong>
                    {leftItemCount==1?' item':' items'}
                </span>
                {clearButton}
            </footer>
        );
    },
    _destroyCompleted: function () {
        TodoActions.destroyCompleted();
    }

});

module.exports = Footer;
