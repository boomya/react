var React = require('react');
var TodoActions = require('../actions/TodoActions');
var PropTypes = React.PropTypes;

var TodoItemInput = React.createClass({

    getInitialState: function () {
        console.log("TodoItemInput-->getInitialState:" + this.props.value);

        var valueTmp = this.props.value;
        if(typeof valueTmp == 'undefined'){
            valueTmp = ""
        }
        return {
            value: valueTmp,
        }
    },
    render: function () {
        return (
            <div>
                <input
                    id="new-todo"
                    ref="todoItemInput"
                    placeholder="input someting..."
                    value={this.state.value}
                    onChange={this._onChange}
                    onKeyDown={this._save}
                    autoFocus={true}
                />
            </div>
        );
    },
    _onChange: function () {
        this.setState({
            value: this.refs.todoItemInput.getDOMNode().value,
        });
    },
    _save: function () {
        if (event.keyCode === 13) {
            var text = this.state.value;
            console.log("_save:" + this.state.value);
            var superSave = this.props.onSave;
            if(!(typeof superSave == "undefined")){
                console.log("super save:");
                this.props.onSave(text);
                return;
            }
            // this.props.onSave(this.state.value);

            if (text.trim()) {
                console.log("header3:" + text);
                TodoActions.create(text);
            };
            this.setState({
                value: ''
            });
        }
    }

});

module.exports = TodoItemInput;
