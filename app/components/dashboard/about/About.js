// Import dependencies and components.
import React from 'react';
import {Link} from 'react-router';
import {Jumbotron} from 'react-bootstrap';

// Create component.
let About = React.createClass({
    getInitialState: function () {
        return {}
    },
    render: function () {
        return (
            <div key="about">
                <Link to="/dashboard/home" className="pull-right btn btn-primary btn-outline btn-rounded">Home</Link>
                <Link to="/dashboard/new" className="pull-right btn btn-success btn-outline btn-rounded">New
                    Memento</Link>
                <h2>About</h2>
                <Jumbotron>
                    <p><strong>
                        Inspired by the idea of a <a href="https://www.elizabethgilbert.com/lets-talk-about-those-happiness-jars-shall-we-dear-lovelies-about-a-y/">Happiness Jar</a>,
                        Mementoes asks you to make a note of one thing that made you happy each day.
                        This exercise allows you to connect with the good things
                        in your life as they happen and to reflect back upon them over time.
                    </strong></p>

                    <ul>
                    <li><p>To learn more about Mementoes and the technology behind it, you can view its source code on <a href="https://github.com/mchlltt/mementoes">GitHub</a>.
                    </p></li>

                    <li><p>An Android application for Mementoes is also under development, with a <a href="https://github.com/mchlltt/mementoes-mobile/releases">beta release</a> available.
                        Its source code is also hosted on <a href="https://github.com/mchlltt/mementoes-mobile">GitHub</a>.
                    </p></li>

                    <li><p>
                        If you have any feedback or questions about Mementoes, please feel free to raise an issue on GitHub or to <a href="mailto:mchlltt.dev@gmail.com">contact the developer</a> directly.
                    </p></li>
                    </ul>

                    <br/>
                    <p><strong>Thank you for using Mementoes!</strong></p>
                    <p>Mich Elliott, developer</p>
                </Jumbotron>
            </div>
        );
    }

});

module.exports = About;
