var React = require('react');

var Tags = require('../calendar/Tags');

var Entry = React.createClass({
    render: function render() {
        return(
            <div>
                <p>{this.props.entry.date}</p>
                <a href={'#/dashboard/users/' + this.props.entry.googleId + '/entries/' + this.props.entry.id + '/edit/'} className="plain-link">
                    <span><strong>Edit</strong></span>
                </a>
                <br />
                <span>
                    {this.props.entry.tags &&
                        <Tags tags={this.props.entry.tags} />
                    }
                </span>
            </div>
        )
    }
});

module.exports = Entry;