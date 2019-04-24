import React, {Component} from 'react';
import {HashRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';

import './App.css';

class App extends Component {
    // constructor to save state (component variables) like isLoggedIn, username, and email
    constructor(props) {
        super(props);
        this.state = {
            // isLoggedIn is false because a user is not logged in and there is no username or email so they're null
            isLoggedIn: false,
            username: null,
            email: null,
        };
    }

    // Changes the state (components variables). It's usually called in child components to change the state in this parent component
    // The parameters in here will be replaced with a username, email, or true/false if a person is going to be logged in
    loggedInUserInfo = (username, email, loggedIn) => {
        console.log("Clear");
        this.setState({
            username: username,
            email: email,
            isLoggedIn: loggedIn,
        });
    };

    render() {
        if (this.state.isLoggedIn) {
            return (
                <Router basename="/react-auth-ui/">
                    <div className="App">
                        <div className="App__Aside">Tweeter</div>
                        <div className="PageSwitcher">
                            <NavLink to="/sign-out" activeClassName="PageSwitcher__Item--Active"
                                     className="PageSwitcher__Item">Sign Out</NavLink>

                        </div>

                    </div>
                </Router>
            )
        } else {
            return (
                <Router basename="/react-auth-ui/">
                    <div className="App">
                        <div className="App__Aside"></div>
                        <div className="App__Form">
                            <div className="PageSwitcher">
                                <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active"
                                         className="PageSwitcher__Item">Sign In</NavLink>
                                <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active"
                                         className="PageSwitcher__Item">Sign Up</NavLink>
                            </div>

                            <div className="FormTitle">
                                <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active"
                                         className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/"
                                                                                                   activeClassName="FormTitle__Link--Active"
                                                                                                   className="FormTitle__Link">Sign
                                Up</NavLink>
                            </div>

                            <Route exact path="/" component={SignUpForm}>
                            </Route>
                            <Route exact path={"/sign-in"}
                                   component={() => <SignInForm isLoggedIn={this.state.isLoggedIn}
                                                                username={this.state.username} email={this.state.email}
                                                                loggedInUserInfo={this.loggedInUserInfo}/>}/>
                        </div>

                    </div>
                </Router>
            )
        }


    }
}

export default App;
