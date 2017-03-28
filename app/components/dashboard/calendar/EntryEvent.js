var React = require('react');
import {Link} from 'react-router';

var Event = React.createClass({

    render: function render() {
        return(
            <Link to={'/dashboard/users/' + this.props.event.googleId + '/entries/' + this.props.event.id + '/edit/'} className="plain-link">
                <span><strong>{this.props.title}</strong></span>
            </Link>
        )
    }
});

module.exports = Event;