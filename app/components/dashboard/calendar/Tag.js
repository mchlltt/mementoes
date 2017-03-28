var React = require('react');

var Tag = React.createClass({
    render: function render() {
        return(
            <a href={'/#/dashboard/tags/' + this.props.url} className="plain-link tag">
                {this.props.text}
            </a>
        )
    }
});

module.exports = Tag;