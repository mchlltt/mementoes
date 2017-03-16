var React = require('react');

var Event = React.createClass({

    handleClick: function() {
        // edit or expand post
    },
    render: function render() {
        return(
            <div className="result-div panel panel-default" id={this.props.articleID}>
                <div className="panel-body">
                    <a href={this.props.url} className="black-text"><h5>{this.props.title}</h5></a>
                    <p className="black-text">Published {this.props.date}</p>
                </div>
                <div className="panel-footer">
                    <button className={this.state.button} onClick={this.handleClick}>{this.state.buttonText} <span className={this.state.glyphicon}/> </button>
                </div>
            </div>
        )
    }
});

module.exports = Event;