import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var Main = React.createClass({

  componentWillMount: function(){
    // this.props.history.pushState(null, '/dashboard/overview');
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
            {React.cloneElement(<div className='ui-view'>{this.props.children}</div> || <div />, { key: change })}
          </ReactCSSTransitionGroup>}
        </div>
      </div>
    );
  }

});

module.exports = Main;