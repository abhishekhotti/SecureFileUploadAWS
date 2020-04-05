import React, { Component } from 'react';
import InputFields from "../../components/InputFields/inputFields";
import classes from "./LoginPage.module.css";

class LoginPage extends Component {
    state = {
        username: null
    }
    onButtonClickHandler = () => {
        if(this.state.username === null || this.state.username.length === 0)
            alert("Enter Your Username");
        else
            this.props.history.push("/picture")
    }

    changeUsernameHandler = (event) => {
        this.setState({username: event.target.value});
    }

    render() {
        return (
            <div className={classes.LoginPage}>
                <h1>Secure Drive Login</h1>
                <InputFields 
                    type = "text"
                    placeholder = "Username"
                    onChange = {this.changeUsernameHandler}
                />
                <InputFields 
                    type = "button"
                    value = "Submit"
                    onClick = {this.onButtonClickHandler}
                />
            </div>
        );
    }
}

export default LoginPage;