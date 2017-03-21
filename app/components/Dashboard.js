import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from 'jquery';
import New from './dashboard/entries/New';
import Charts from './dashboard/charts/Charts';
import Calendar from './dashboard/calendar/Calendar';
import Settings from './dashboard/settings/Settings';

import GetService from '../utils/getService';
var verifyService = new GetService('api/verify/');

var Dashboard = React.createClass({
    getInitialState: function () {
        return {}
    },
    componentWillMount: function () {
        this.setState({Height: $(window).height()});
        verifyService.get().then(function (response) {
            this.setState({googleId: response.googleId});
        }.bind(this));
    },
    componentWillUnmount: function () {
        $(window).unbind('resize', this.adjustResize);
    },
    render: function () {

        return (
            <div className='dashboard-page ui-view'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-3 col-md-2 sidebar'>
                            <div className='text-center'>
                                <h2 className='brand'> Mementoes </h2>
                                <img src={'assets/images/user-icon.svg'} className='user-avatar'/>
                                <br />
                                <a href='/api/logout'
                                   className='btn btn-white btn-outline btn-rounded btn-sm'>Logout</a>
                            </div>

                            <ul className='nav nav-sidebar'>
                                <li>
                                    <a href='#/dashboard/calendar'>Calendar</a>
                                </li>
                                <li>
                                    <a href='#/dashboard/new'>New Entry</a>
                                </li>
                                <li>
                                    <a href='#/dashboard/charts'>Charts</a>
                                </li>
                                <li>
                                    <a href='#/dashboard/settings'>Settings</a>
                                </li>
                            </ul>
                        </div>

                        <ReactCSSTransitionGroup component='div'
                                                 transitionName='ng'
                                                 transitionEnterTimeout={500}
                                                 transitionLeaveTimeout={300}
                        >
                            {React.cloneElement(<div
                                className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main ng-scope ui-view'>
                                    {this.props.location === '/dashboard/calendar' &&
                                    <Calendar/>
                                    }
                                    {this.props.location === '/dashboard/new' &&
                                    <New/>
                                    }
                                    {this.props.location === '/dashboard/edit' &&
                                    <Edit entryId={1}/>
                                    }
                                    {this.props.location === '/dashboard/charts' &&
                                    <Charts/>
                                    }
                                    {this.props.location === '/dashboard/settings' &&
                                    <Settings/>
                                    }
                                </div> || <div />, { key: this.props.location })}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Dashboard;
