// Import dependencies and components.
import React from 'react';
import {Link} from 'react-router';

// Create component.
let Tag = React.createClass({
    render: function render() {
        return(
            <Link to={this.props.url} className="plain-link tag">
                {this.props.text}
            </Link>
        )
    }
});

module.exports = Tag;