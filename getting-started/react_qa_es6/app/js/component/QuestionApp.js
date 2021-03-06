var React = require('react');
var AddButton = require('./AddButton.js');
var QuestionForm = require('./QuestionForm.js');
var QuestionList = require('./QuestionList.js');
var _ = require('lodash');
module.exports = React.createClass({
    printf: function () {
        console.log([1,2,3].map(x => x * x));
    },
    getInitialState: function () {
        this.printf();
        console.log('a' * 100);
        var aa = [];
        console.log(aa[10] * 100);
        this.printf();
        return {
            questions:[
                {
                    id: 1,
                    title: '产品经理与程序员矛盾的本质是什么？',
                    content: '理性探讨，请勿撕逼。产品经理的主要工作职责是产品设计。接受来自其他部门的需求，经过设计后交付研发。但这里有好些职责不清楚的地方。',
                    voteCount: 22,
                },
                {
                    id: 2,
                    title: '热爱编程是一种怎样的体验？',
                    content: '别人对玩游戏感兴趣，我对写代码、看技术文章感兴趣；把泡github、stackoverflow、v2ex、reddit、csdn当做是兴趣爱好；遇到重复的工作，总想着能不能通过程序实现自动化；喝酒的时候把写代码当下酒菜，边喝边想边敲；不给工资我也会来加班；做梦都在写代码。',
                    voteCount: 12,
                },
                {
                    id: 3,
                    title: 'test',
                    content: 'testtesttest',
                    voteCount: 99,
                }
            ],
            isShowForm: false,
        }
    },
    componentWillMount: function () {
        var newQuestions = _.uniq(this.state.questions);
        newQuestions = this.sortQuestions(newQuestions);
        this.setState({
            questions: newQuestions,
        });
    },
    onToggleForm: function () {
        this.setState({
            isShowForm: !this.state.isShowForm,
        })
    },
    onVote: function (id, newVoteCount) {
        var newQuestions = _.uniq(this.state.questions);
        var index = _.findIndex(newQuestions, function (item) {
            return item.id == id;
        });
        newQuestions[index].voteCount = newVoteCount;

        newQuestions = this.sortQuestions(newQuestions);

        this.setState({
            questions:newQuestions
        });

    },
    addNewQuestion: function (newQuestion) {
        var newQuestions = this.state.questions;
        newQuestions.id = newQuestions.length + 1;
        newQuestions.push(newQuestion);
        newQuestions = this.sortQuestions(newQuestions);
        this.setState({
            questions: newQuestions
        });
    },
    sortQuestions: function (questions) {
        questions.sort(function (a, b) {
            return b.voteCount-a.voteCount;
        });
        return questions;
    },
    render: function() {
        return (
            <div>
            <div className="jumbotron text-center">
                <div className="container">
                  <h1>React问答</h1>
                  <AddButton onToggleForm={this.onToggleForm} />
                </div>
            </div>
            <div className="main container">
                <QuestionForm isShowForm={this.state.isShowForm} onToggleForm={this.onToggleForm} addNewQuestion={this.addNewQuestion}/>
                <QuestionList questions={this.state.questions} onVote={this.onVote}/>

            </div>
        </div>
        );
    }

});
