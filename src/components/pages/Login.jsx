import React from 'react';
import Router from 'react-router';
import {Panel, Input, Button} from 'react-bootstrap';
import {History} from 'history';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import $ from "jQuery";

var LoginPage = React.createClass({

    mixins: [History],

    render: function () {

        return (
            <div className="login-page ng-scope ui-view">
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                        <img src={require("../../common/images/user-icon.svg")} className="user-avatar"/>
                        <h1>Mementos</h1>
                        <a type="button"
                           className="btn btn-white btn-outline btn-lg btn-rounded"
                           href="/auth/google">Sign Up/In with Google</a>
                    </div>
                </div>
            </div>

        );


    }

});

export default LoginPage;