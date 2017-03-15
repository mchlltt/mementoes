import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
import {Jumbotron} from 'react-bootstrap';
import PostForm from './children/PostForm';

var New = React.createClass({
  render: function() {
    return (
      <div className="overview-page" key="New">
          <Link to="/dashboard/calendar" className="pull-right btn btn-primary btn-outline btn-rounded">Back to Calendar</Link>
        <h2>New Post</h2>
        <Jumbotron> 
          <h2>What is something positive that happened today?</h2>
            <PostForm/>
        </Jumbotron> 
      </div>
    );
  }

});

export default New;
