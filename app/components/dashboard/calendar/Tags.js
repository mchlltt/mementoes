// Import dependencies and components.
import React from 'react';
import Tag from './Tag';

// Create component.
let Tags = React.createClass({
    render: function render() {
        function tagToURL(tag) {
            return '/dashboard/tags/' + tag.toLowerCase();
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