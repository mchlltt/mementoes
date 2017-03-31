// Import dependencies and components.
import React from 'react';
import moment from 'moment';
import Tags from '../calendar/Tags';

// Create component.
let Entry = React.createClass({
    render: function render() {
        return(
            <div>
                <span>Date: {moment(this.props.entry.date.split('T')[0]).format('MMMM DD[,] YYYY')}</span>
                <br/>
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