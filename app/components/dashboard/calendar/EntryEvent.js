var React = require('react');

var Event = React.createClass({

    render: function render() {
        return(
            <a href={'#/dashboard/users/' + this.props.event.googleId + '/entries/' + this.props.event.id + '/edit/'} className="plain-link">
                <span><strong>{this.props.title}</strong></span>
            </a>
        )
    }
});

module.exports = Event;