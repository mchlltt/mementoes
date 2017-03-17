import React from 'react';
import './children/styles/login.css';

var Login = React.createClass({

    render: function () {
        return (
            <div className="login-page ng-scope ui-view">
                <div className="row">
                    <div className="col-xs-12">
                        <img src={'assets/images/user-icon.svg'} className="user-avatar center-block"/>
                        <h1>Mementoes</h1>
                        <a type="button"
                           className="btn btn-white btn-outline btn-lg btn-rounded"
                           href="/auth/google">Sign Up/In with Google</a>
                    </div>
                </div>
            </div>

        );
    }
});

module.exports = Login;