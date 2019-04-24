import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            goHome: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        fetch('/users/login',
        {
            method: 'POST',
            // Accept tells the server what kind of data the client is expecting.
            // Content-Type tells the server which kind of data the client is sending in the body
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            // Creates a collection for username and password. Because a request can't send a collection, you have to make it a JSON string first
            // e.target is the information being sent from the form input fields by their names give in the input attributes. The value is what was typed.
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        })
    // data on the left side is the raw response data the server sent (res.send)
    // On the right side, use that data parameter with the .json function to change data to a readable JSON collection.
        .then(rawData => rawData.json())
        // response on the left side is the readable JSON collection.
        // on the right side we're running a function. The first line is console logging
        .then(userAndEmail => {
            console.log(userAndEmail);
            // If the server (res.send) has a collection with a username in it, run the function below
            if (userAndEmail.username)
            // This is changing the parent component state to the returned username, returned email and isLoggedIn to true
                return this.props.loggedInUserInfo(userAndEmail.username, userAndEmail.email, true);
            // If the server (res.send) DOES NOT have username in it, run the function below
            else
            // This is changing the parent component state to have the username and password to be null (empty) and isLoggedIn to false
                return this.props.loggedInUserInfo(null, null, false)
        });
        console.log('The form was submitted with the following data:');

        console.log(this.state);
    };


    render() {
        return (
            <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="username">User Name</label>
                        <input type="text" id="username" className="FormField__Input" placeholder="Enter your user name"
                               name="username" value={this.state.username} onChange={this.handleChange}/>
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="FormField__Input"
                               placeholder="Enter your password" name="password" value={this.state.password}
                               onChange={this.handleChange}/>
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20">Sign In</button>
                        <Link to="/" className="FormField__Link">Create an account</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignInForm;
