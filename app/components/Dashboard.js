import React from 'react';
import { Link } from 'react-router';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from 'jquery';
import {LinkContainer} from 'react-router-bootstrap';
import Home from './dashboard/home/Home';
import New from './dashboard/entries/New';
import TagView from './dashboard/home/TagView';
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

        let location = this.props.location;
        let pathname = location.split('/');

        // Add logic to allow the root to display 'Home'.
        let showHome = pathname.indexOf('home') === 2 || location === '/';

        return (
            <div className='dashboard-page ui-view'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-sm-3 col-md-2 sidebar'>
                            <div className='text-center'>
                                <Link to='/dashboard/home'>
                                    <img src={'/assets/images/logo.png'} className='sidebar-logo'/>
                                </Link>
                                <br />
                                <a href='/api/logout'
                                   className='btn btn-white btn-outline btn-rounded'>Log Out</a>
                            </div>

                            <ul className='nav nav-sidebar'>
                                <li>
                                    <Link to ='/dashboard/home'>Home</Link>
                                </li>
                                <li>
                                    <Link to ='/dashboard/calendar'>Calendar</Link>
                                </li>
                                <li>
                                    <Link to ='/dashboard/settings'>Settings</Link>
                                </li>
                            </ul>
                        </div>

                        <div className='col-xs-12 xs-only'>
                            <Navbar.Header>
                                <Nav>
                                    <Navbar.Brand>
                                        <Link to='/dashboard/home'>Mementoes</Link>
                                    </Navbar.Brand>
                                    <Nav pullRight>
                                    <NavDropdown
                                        title='Menu'
                                        id='basic-nav-dropdown'
                                        pullRight
                                    >
                                        <LinkContainer to='/dashboard/home'>
                                            <MenuItem>Home</MenuItem>
                                        </LinkContainer>
                                        <LinkContainer to='/dashboard/calendar'>
                                            <MenuItem>Calendar</MenuItem>
                                        </LinkContainer>
                                        <LinkContainer to='/dashboard/settings'>
                                            <MenuItem>Settings</MenuItem>
                                        </LinkContainer>
                                    </NavDropdown>
                                    </Nav>
                                </Nav>
                            </Navbar.Header>
                        </div>

                        <ReactCSSTransitionGroup component='div'
                                                 transitionName='ng'
                                                 transitionEnterTimeout={500}
                                                 transitionLeaveTimeout={300}
                        >
                            {React.cloneElement(<div
                                className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main ng-scope ui-view'>
                                    {pathname.indexOf('calendar') === 2 &&
                                    <CalendarComponent/>
                                    }
                                    {pathname.indexOf('edit') === 6 &&
                                    <Edit params={pathname}/>
                                    }
                                    {pathname.indexOf('new') === 2 &&
                                    <New />
                                    }
                                    {pathname.indexOf('tags') === 2 &&
                                    <TagView params={pathname}/>
                                    }
                                    {showHome &&
                                    <Home/>
                                    }
                                    {pathname.indexOf('settings') === 2 &&
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
