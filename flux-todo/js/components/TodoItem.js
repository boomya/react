var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoItemInput = require('./TodoItemInput');
var PropTypes = React.PropTypes;
var classNames = require('classnames');

var TodoItem = React.createClass({
    getInitialState: function () {
        return {
            editing: false,
        }
    },
    render: function () {
        var todo = this.props.todo;
        var classNameObj = classNames({
            'completed': todo.complete,
            'editing': this.state.editing
        });

        var input;
        if(this.state.editing){
            input = <TodoItemInput className="edit" value={todo.text} onSave={this._onSave}  />
        }

        return (
            <li className={classNameObj}>
                <div className="view">
                    <input type="checkbox" className="toggle" checked={todo.complete} onClick={this._toggleComplete}/>
                    <label onDoubleClick={this._onDoubleClick}>{todo.text}</label>
                    <button className="destroy" onClick={this._destroy} />
                </div>
                {input}
            </li>
        );
    },
    _onSave: function (text) {
        TodoActions.updateText(this.props.todo.id, text);
        this.setState({
            editing:false
        });
    },
    _onDoubleClick: function () {
        this.setState({
            editing: true,
        });
    },
    _toggleComplete: function () {
        console.log("_toggleComplete-->");
        TodoActions.toggleComplete(this.props.todo);
    },
    _destroy: function () {
        TodoActions.destroy(this.props.todo.id);
    },

});

module.exports = TodoItem;
