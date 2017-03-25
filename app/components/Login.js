import React from 'react';

var Login = React.createClass({

    render: function () {
        return (
            <div className="login-page ng-scope ui-view">
                <div className="row">
                    <div className="col-xs-12">
                        <img src={'assets/images/logo.png'} className="main-logo center-block"/>
                        <a type="button"
                           className="btn btn-white btn-outline btn-lg btn-rounded login-button"
                           href="/auth/google">Sign Up/In with Google</a>
                    </div>
                </div>
            </div>

        );
    }
});

module.exports = Login;