var React = require('react');
var Header = require('./Header');
var MainSection = require('./MainSection');
var TodoStore = require('../stores/TodoStore');
var Footer = require('./Footer');
var PropTypes = React.PropTypes;

var TodoApp = React.createClass({
    getInitialState: function () {
       return {
           allTodos: TodoStore.getAll(),
           areAllComplete: TodoStore.areAllComplete()
       }
    },
    componentDidMount: function () {
       console.log("componentDidMount-->");
       TodoStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function () {
       console.log("componentWillUnmount-->");
       TodoStore.removeChangeListener(this._onChange);
    },
    render: function () {
        return (
            <div>
                <Header />
                <MainSection allTodos={this.state.allTodos} areAllComplete={this.state.areAllComplete}  />
                <Footer allTodos={this.state.allTodos} />
            </div>
        );
    },
    _onChange: function () {
       console.log("_onChange-->");
       this.setState({
           allTodos: TodoStore.getAll(),
           areAllComplete: TodoStore.areAllComplete()
       });
    }


});

module.exports = TodoApp;
