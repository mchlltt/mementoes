var React = require('react');

var Event = React.createClass({

    handleClick: function() {
        // edit or expand post
    },
    render: function render() {
        return(
            <div>
                <span><strong>{this.props.title}</strong></span>
                <br />
                <span>{ this.props.event.desc && ('tags: ' + this.props.event.desc)}</span>
            </div>
        )
    }
});

module.exports = Event;