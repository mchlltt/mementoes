import React from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar} from 'react-bootstrap';
import $ from 'jQuery';
import classNames from 'classnames';

var HomePage = React.createClass({
    
  componentWillMount: function() {
    this.setState({Height: $(window).height()});
  },

  componentDidMount: function() {

  },

  componentWillUnmount: function(){
    $(window).unbind('resize',this.adjustResize);

  },

  getInitialState: function(){
    
    return {
      uiElementsCollapsed: true,
      chartsElementsCollapsed: true,
      multiLevelDropdownCollapsed: true,
      thirdLevelDropdownCollapsed: true,
      samplePagesCollapsed: true
    };

  },

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {

    //console.log(this.context);

    // var name = this.context.router.getCurrentPath();

    const { pathname } = this.props.location;
      
    return (
        <div className='dashboard-page ui-view'> 
          <div className='container-fluid'> 
            <div className='row'> 
              <div className='col-sm-3 col-md-2 sidebar'> 
                <div className='text-center'> 
                  <h2 className='brand'> Mementos </h2>
                  <img src={require('../../../common/images/user-icon.svg')} className='user-avatar' />
                  <br /> 
                  <Link to='/login' className='btn btn-white btn-outline btn-rounded btn-sm'>Logout</Link> 
                </div> 

                <ul className='nav nav-sidebar'> 
                  <li>
                    <Link to='/dashboard/calendar'>Calendar</Link>
                  </li>
                  <li>
                    <Link to='/dashboard/new'>New Entry</Link>
                  </li>
                  <li>
                    <Link to='/dashboard/charts'>Charts</Link>
                  </li>
                  <li>
                    <Link to='/dashboard/settings'>Settings</Link>
                  </li>
                </ul> 
              </div>

               <ReactCSSTransitionGroup component='div'
                                 transitionName='ng'
                                 transitionEnterTimeout={500}
                                 transitionLeaveTimeout={300}
                >
                  {React.cloneElement(<div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main ng-scope ui-view'>{this.props.children}</div> || <div />, { key: pathname })}
                </ReactCSSTransitionGroup>

                
            </div> 
          </div> 
        </div>
    );
  },

  statics: {
    fetchData: function(params) {
      }
  }
  
});

export default HomePage;
