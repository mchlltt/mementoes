// Import dependencies, components, and services.
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Dashboard from './Dashboard';
import Login from './Login';
import GetService from '../utils/getService';

// Import stylesheets from node_modules.
import 'react-datepicker/dist/react-datepicker.css';
import 'react-tagsinput/react-tagsinput.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Import stylesheets from the styles folder.
import '../styles/calendar.css';
import '../styles/datepicker.css';
import '../styles/animate.css';
import '../styles/toastr.min.css';
import '../styles/mementoes.css';

// Construct services.
let verifyService = new GetService('/api/verify/');

// Create component.
let Main = React.createClass({
    getInitialState: function () {
        return { }
    },
    componentWillMount: function() {
        verifyService.getRoute().then(function(response) {
            this.setState({
                auth: response.auth,
                googleId: response.googleId
            });
        }.bind(this));
    },
    render: function() {
        const { pathname } = this.props.location;

        let change;

        if (pathname.substr(0, 10) === '/dashboard')
            change = 'internal';
        else
            change = pathname;

        let showDash = this.state.auth && pathname !== '/logged-out';

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
                                {showDash &&
                                    <Dashboard location={pathname} googleId={this.state.googleId}/>
                                }
                                {!showDash &&
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