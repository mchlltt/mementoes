var React = require('react');

var Tag = require('./Tag');

var Tags = React.createClass({
    render: function render() {
        function tagToURL(tag) {
            return tag.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase() + '/';
        }

        return(
            <div>
            {this.props.tags.length > 0 &&
            <span className='tags'>Tags:&nbsp;
                {this.props.tags.map(function(tag, i) {
                    return (
                        <Tag key={i} text={tag} url={tagToURL(tag)}/>
                    );
                })}
            </span>
            }
            </div>
        )
    }
});

module.exports = Tags;