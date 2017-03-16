import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from 'jQuery';

var Dashboard = React.createClass({
    
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
                  <h2 className='brand'> Mementoes </h2>
                  <img src={'assets/images/user-icon.svg'} className='user-avatar' />
                  <br /> 
                  <a href='/logout' className='btn btn-white btn-outline btn-rounded btn-sm'>Logout</a>
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

module.exports = Dashboard;
