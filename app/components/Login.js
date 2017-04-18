// Import dependencies.
import React, {Component} from 'react';
import AboutModal from './dashboard/about/AboutModal';

// Create component.
export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);

    }

    showModal() {
        this.setState({modal: true});
    }

    hideModal() {
        this.setState({modal: false});
    }

    render() {
        return (
            <div className="login-page ng-scope ui-view">
                <div>
                    {this.state.modal &&
                    <AboutModal hideModal={this.hideModal} googleId={this.props.googleId}/>
                    }
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <img src={'/assets/images/logo.png'} className="main-logo center-block"/>
                        <a type="button"
                           className="btn btn-white btn-outline btn-lg btn-rounded login-button"
                           href="/auth/google">
                            <h3>Sign up/in with Google</h3>
                        </a>
                        <h4>Mementoes helps you keep track of and stay connected to the positive things in your life. <a type='button' onClick={this.showModal} className="about-link">Read more about Mementoes.</a></h4>

                    </div>
                </div>
            </div>

        );
    }
}