var React = require('react');

var Event = React.createClass({

    handleClick: function() {
        // edit or expand post
    },
    render: function render() {
        return(
            <div>
                <span><strong>{this.props.title}</strong></span>
            </div>
        )
    }
});

module.exports = Event;