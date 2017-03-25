import React from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from 'jquery';
import New from './dashboard/entries/New';
import Charts from './dashboard/charts/Charts';
import Edit from './dashboard/entries/Edit';
import CalendarComponent from './dashboard/calendar/Calendar';
import Settings from './dashboard/settings/Settings';

import GetService from '../utils/getService';
var verifyService = new GetService('/api/verify/');

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

        let pathname = this.props.location.split('/');

        return (
            <div className='dashboard-page ui-view'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-3 col-md-2 sidebar'>
                            <div className='text-center'>
                                <img src={'assets/images/logo.png'} className='sidebar-logo'/>
                                <br />
                                <a href='/api/logout'
                                   className='btn btn-white btn-outline btn-rounded btn-sm'>Logout</a>
                            </div>

                            <ul className='nav nav-sidebar'>
                                <li>
                                    <Link to ='/dashboard/calendar'>Calendar</Link>
                                </li>
                                <li>
                                    <Link to ='/dashboard/new'>New Entry</Link>
                                </li>
                                <li>
                                    <Link to ='/dashboard/charts'>Charts</Link>
                                </li>
                                <li>
                                    <Link to ='/dashboard/settings'>Settings</Link>
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
                                    {pathname.indexOf('calendar') !== -1 &&
                                    <CalendarComponent/>
                                    }
                                    {pathname.indexOf('new') !== -1 &&
                                    <New/>
                                    }
                                    {pathname.indexOf('edit') !== -1 &&
                                    <Edit params={pathname}/>
                                    }
                                    {pathname.indexOf('charts') !== -1 &&
                                    <Charts/>
                                    }
                                    {pathname.indexOf('settings') !== -1 &&
                                    <Settings/>
                                    }
                                </div> || <div />, { key: pathname.join('/') })}
                        </ReactCSSTransitionGroup>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Dashboard;
