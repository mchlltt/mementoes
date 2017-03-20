var React = require('react');

var Tag = require('./Tag');

var Tags = React.createClass({
    render: function render() {
        function tagToURL(tag) {
            return tag.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase() + '/';
        }

        return(
            <div><span>tags: </span>
                {this.props.tags.map(function(tag, i) {
                    return (
                        <Tag key={i} text={tag} url={tagToURL(tag)}/>
                    );
                })}
            </div>
        )
    }
});

module.exports = Tags;