import React, { Component } from 'react';
import classes from './Picture.module.css';
import Webcam from "react-webcam";
import InputFields from "../../components/InputFields/inputFields";
import Aux from "../../hoc/Aux";
import axios from "../../hoc/axios";

class Picture extends Component {
    state = {
        webcamRef: React.createRef(),
        base64Image: null
    }

    onCaptureButtonClick = (event) => {
        console.log(this.props);
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
                    this.props.history.push("/welcome")
                }
                else{
                    this.props.history.push("/")
                }
            }).catch(error => {
                console.log(error)
            });
            console.log("continue")
        }
        
    }

    render() {
        let captureScreen = (
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
        return (
            <div className={classes.Picture}> 
            {captureScreen}
            </div>
        );
    }
}

export default Picture;