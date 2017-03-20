var React = require('react');

var Tags = require('./Tags');

var Event = React.createClass({
    render: function render() {
        return(
            <div>
                <a href={'#/users/' + this.props.event.googleId + '/entries/' + this.props.event.id + '/edit/'} className="plain-link">
                    <span><strong>{this.props.title}</strong></span>
                </a>
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