import React from 'react';

var Login = React.createClass({

    render: function () {

        return (
            <div className="login-page ng-scope ui-view">
                <div className="row">
                    <div className="col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4">
                        <img src={'assets/images/user-icon.svg'} className="user-avatar"/>
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