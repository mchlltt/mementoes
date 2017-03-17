import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Dashboard from './Dashboard';
import Login from './children/Login';

import GetService from './utils/getService';

var verifyService = new GetService('/api/verify');

var Main = React.createClass({
    getInitialState: function () {
        return {
            auth: false,
            googleId: null
        };
    },
    componentDidMount: function() {
        verifyService.get().then(function(response) {
            this.setState({ auth: response.auth,
                            googleId: response.googleId
            });
        }.bind(this));
    },
    render: function() {
        const { pathname } = this.props.location;

        let change;

        if (pathname.substr(0, 10) == '/dashboard')
            change = 'internal';
        else
            change = pathname;

        return (
            <div className='ui-view'>
                <div className='ui-base'>
                    {<ReactCSSTransitionGroup component='div'
                                              transitionName='ng'
                                              transitionEnterTimeout={500}
                                              transitionLeaveTimeout={300}
                    >
                        {React.cloneElement(
                            <div className='ui-view'>
                                {this.state.auth &&
                                <Dashboard location={pathname} googleId={this.state.googleId}/>
                                }
                                {!this.state.auth &&
                                <Login />
                                }
                            </div> || <div />, { key: change })}
                    </ReactCSSTransitionGroup>}
                </div>
            </div>
        );
    }

});

module.exports = Main;