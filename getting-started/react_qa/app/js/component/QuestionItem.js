var React = require('react');

module.exports = React.createClass({
    voteUp: function () {
        var newVoteCount = this.props.question.voteCount + 1;
        this.props.onVote(this.props.question.id, newVoteCount);
    },
    voteDown: function () {
        var newVoteCount = this.props.question.voteCount;
        if(newVoteCount == 0){
            return;
        }
        this.props.onVote(this.props.question.id, newVoteCount-1);
    },
    render: function() {
        return (
            <div className="media">
              <div className="media-left">
                <button className="btn btn-default" onClick={this.voteUp}>
                  <span className="glyphicon glyphicon-chevron-up"></span>
                  <span className="vote-count">{this.props.question.voteCount}</span>
                </button>
                <button className="btn btn-default" onClick={this.voteDown}>
                  <span className="glyphicon glyphicon-chevron-down"></span>
                </button>
              </div>
              <div className="media-body">
                <h4 className="media-heading">{this.props.question.title}</h4>
                <p>{this.props.question.content}</p>
              </div>
            </div>
        );
    }

});
