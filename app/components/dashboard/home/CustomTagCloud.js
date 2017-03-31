// Import dependencies and components.
import React from 'react';
import {TagCloud} from 'react-tagcloud';

// Create and export component class.
// I created this custom component because the default TagCloud refreshed anytime the page state changed.
export default class CustomTagCloud extends TagCloud {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // This method was the main purpose/fix. It checks whether the tags themselves have actually updated.
    shouldComponentUpdate(nextProps) {
        return this.props.tags !== nextProps.tags;
    }

    render() {
        return (
            <TagCloud
                tags={this.props.tags}
                maxSize={this.props.maxSize}
                minSize={this.props.minSize}
                colorOptions={this.props.colorOptions}
                onClick={this.props.onClick}
            />
        )
    }

}