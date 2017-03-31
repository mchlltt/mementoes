// Import dependencies and components.
import React from 'react';
import {Link} from 'react-router';
import Tags from './Tags';

// Create component.
let Event = React.createClass({
    render: function render() {
        return(
            <div>
                <Link to={'/dashboard/users/' + this.props.event.googleId + '/entries/' + this.props.event.id + '/edit/'} className="plain-link">
                    <span><strong>{this.props.title}</strong></span>
                </Link>
                <br />
                <span>
                    {this.props.event.tags &&
                    <Tags tags={this.props.event.tags} />
                    }
                </span>
            </div>
        )
    }
});

module.exports = Event;