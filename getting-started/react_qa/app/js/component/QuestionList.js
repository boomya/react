var React = require('react');
var QuestionItem = require('./QuestionItem.js');

module.exports = React.createClass({

    render: function() {
        var questions = this.props.questions;
        console.log(questions);
        if(!Array.isArray(questions)){
            throw new Error('questions must array!!!');
        }
        var onVote = this.props.onVote;
        var questionItemList = questions.map(function (item) {
            return <QuestionItem question={item} key={"key_" + item.id} onVote={onVote} />
        });

        // var questionItemList = [];
        // questions.forEach(function (item, index) {
        //     return questionItemList.push(<QuestionItem question={item} key={"key_" + index}/>);
        // });

        return (
            <div id="questions" className="">
                {questionItemList}
            </div>
        );
    }

});
