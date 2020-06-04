import React, { Component } from 'react';
import classes from './Picture.module.css';
import Webcam from "react-webcam";
import InputFields from "../../components/InputFields/inputFields";
import Aux from "../../hoc/Aux";
import axios from "../../hoc/axios";
import {connect} from "react-redux";
import { Redirect } from 'react-router-dom';
import * as actions from "../../store/action/index";

class Picture extends Component {
    state = {
        webcamRef: null,
        base64Image: null
    }
    
    componentDidMount() {
        this.setState({webcamRef: React.createRef()})
    }

    onCaptureButtonClick = (event) => {
        if(this.state.webcamRef){
            if(event.target.value === 'Capture')
        {
            const capture = this.state.webcamRef.current.getScreenshot();
            this.setState({base64Image: capture})
        }
        else if(event.target.value === 'Retake')
        {
            this.setState({base64Image: null})
        }
        else{
            let param = {
                base64Image: this.state.base64Image
            }
            axios.post('/login/currentImageOfUser', param).then(response => {
                if (response.data === true){
                    this.props.validateUser(true)
                    this.props.history.push("/")
                }
                else{
                    alert('Face Match Unsuccessful')
                    this.props.validateUser(false)
                    this.props.history.push("/")
                }
            }).catch(error => {
                console.log(error)
            });
        }
        }
    }

    componentWillUnmount() {
        this.setState({webcamRef: null})
    }

    render() {
        let redirect = null;
        let captureScreen = null;
        if(!this.props.username)
        {
            redirect = <Redirect to="/" />
        }else{
            captureScreen = (
                <Aux>
                    <Webcam audio={false} ref = {this.state.webcamRef} screenshotFormat="image/jpeg"/>
                    <InputFields type = "button" value = "Capture" onClick = {this.onCaptureButtonClick}/>
                </Aux>
            )
            if (this.state.base64Image) {
                captureScreen = (
                    <Aux>
                        <img src = {this.state.base64Image} alt="user taken pic"/>
                        <InputFields type = "button" value = "Submit" onClick = {this.onCaptureButtonClick}/>
                        <InputFields type = "button" value = "Retake" onClick = {this.onCaptureButtonClick}/>
                    </Aux>
                )
            }
        }
        return (
            <div className={classes.Picture}> 
            {redirect}
            {captureScreen}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        username: state.username
    }
}

const mapDispatchToProps = dispatch => {
    return{
        validateUser: (bool) => dispatch(actions.validateUserLogin(bool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Picture);