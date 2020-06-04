import React, { Component } from 'react';
import InputFields from "../../components/InputFields/inputFields";
import classes from "./LoginPage.module.css";
import {connect} from 'react-redux';
import * as actions from "../../store/action/index"

class LoginPage extends Component {
    state = {
        username: ''
    }
    onButtonClickHandler = () => {
        this.props.validateUserName(this.state.username)
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
                    value={this.state.username}
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

const mapDispatchToProps = dispatch => {
    return {
        validateUserName: (user) => dispatch(actions.validateUsername(user))
    }
}

const mapStateToProps = state => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);