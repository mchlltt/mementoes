import React from 'react';
import GetService from '../../../utils/getService';
import Entry from './Entry';
import {Link} from 'react-router';
import {Panel, Jumbotron} from 'react-bootstrap';
var getTaggedEntries = new GetService('/api/tags/');
var verifyService = new GetService('/api/verify/');

var TagView = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentWillMount: function () {
        verifyService.get().then(function (res) {
            getTaggedEntries.get([res.googleId, this.props.params[3]]).then(function (response) {
                var entries = [];

                response.forEach(function (entry) {
                    var tags = [];

                    if (entry.entryHasTags) {
                        entry.entryHasTags.forEach(function (tag) {
                            tags.push(tag.text);
                        });
                    }

                    entries.push({
                        googleId: entry.googleId,
                        id: entry.id,
                        title: entry.text,
                        date: entry.date,
                        tags: tags
                    });
                });
                this.setState({entries});
            }.bind(this));
        }.bind(this));
    },
    render: function () {
        return (
            <div key="/dashboard/tags">
                <Link to="/dashboard/home" className="pull-right btn btn-primary btn-outline btn-rounded">Home</Link>
                <Link to="/dashboard/new" className="pull-right btn btn-success btn-outline btn-rounded">New Memento</Link>
                <h2>Mementoes tagged with '{decodeURIComponent(this.props.params[3])}'</h2>
                <Jumbotron>
                    {this.state.entries && this.state.entries.length > 0 &&
                    this.state.entries.map(function (entry, i) {
                        return (
                            <Panel
                                header={entry.title}
                                bsStyle='primary'
                                key={i}
                                footer={<Link to={'/dashboard/users/' + entry.googleId + '/entries/' + entry.id + '/edit'}>Edit</Link>}
                            >
                                <Entry entry={entry}/>
                            </Panel>
                        )
                    })
                    }
                    {this.state.entries && this.state.entries.length === 0 &&
                        <Panel bsStyle='danger'>
                            No Mementoes found with the tag '{decodeURIComponent(this.props.params[3])}'.
                        </Panel>
                    }
                </Jumbotron>
            </div>
        )
    }

});

module.exports = TagView;