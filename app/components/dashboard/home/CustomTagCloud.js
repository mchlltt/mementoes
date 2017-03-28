import React from 'react';
import {TagCloud} from 'react-tagcloud';

export default class CustomTagCloud extends TagCloud {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState) {
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