var React = require('react');
var TodoItem = require('./TodoItem');
var TodoStore = require('../stores/TodoStore')
var TodoActions = require('../actions/TodoActions');
var PropTypes = React.PropTypes;

var MainSection = React.createClass({
    // getInitialState: function () {
    //     console.log("MainSection-->getInitialState");
    //     return {
    //         allTodos: TodoStore.getAll(),
    //         areAllComplete: TodoStore.areAllComplete()
    //     }
    // },
    // componentDidMount: function () {
    //     console.log("componentDidMount-->");
    //     TodoStore.addChangeListener(this._onChange);
    // },
    // componentWillUnmount: function () {
    //     console.log("componentWillUnmount-->");
    //     TodoStore.removeChangeListener(this._onChange);
    // },
    render: function () {
        var allTodos = this.props.allTodos;
        if(Object.keys(allTodos).length == 0){
            return null;
        }
        var todos = [];
        for (var key in allTodos) {
            todos.push(<TodoItem key={key} todo={allTodos[key]} />);
        }

        return (
            <section id="main">
                <input id="toggle-all" type="checkbox" checked={this.props.areAllComplete} onChange={TodoActions.toggleCompleteAll} />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul id="todo-list">
                    {todos}
                </ul>
            </section>
        );
    },
    // _onChange: function () {
    //     console.log("_onChange-->");
    //     this.setState({
    //         allTodos: TodoStore.getAll(),
    //         areAllComplete: TodoStore.areAllComplete()
    //     });
    // }

});

module.exports = MainSection;
