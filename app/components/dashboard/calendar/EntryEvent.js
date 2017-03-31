// Import dependencies and components.
import React from 'react';
import {Link} from 'react-router';

// Create components.
let Event = React.createClass({
    render: function render() {
        return(
            <Link to={'/dashboard/users/' + this.props.event.googleId + '/entries/' + this.props.event.id + '/edit/'} className="plain-link">
                <span><strong>{this.props.title}</strong></span>
            </Link>
        )
    }
});

module.exports = Event;