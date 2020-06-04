import React, { Component } from 'react';
import Aux from "../../hoc/Aux";
import classes from "./DisplayFile.module.css";
import axios from "../../hoc/axios";

export class displayFile extends Component{
    state = {
        iframe: <h3><b>Sorry, this filetype is not yet supported</b></h3>
    }

    componentDidMount(){
        console.log(this.props.sourceFile)
        switch (this.props.type) {
            case "img": 
                let fileShown = <img 
                    className = {classes.DisplayImgFiles} 
                    src={this.props.sourceFile} 
                    alt="Avatar"/>
                this.setState({iframe: fileShown})
                break;
            case "iframe": 
                axios.get(this.props.sourceFile).then(res => {
                    let fileShown = <iframe 
                                src={"data:application/pdf;base64,"+res.data} 
                                title = {this.props.fileName} />
                    this.setState({iframe: fileShown})
                })
                break;
            default:
                break;
        }
    }

    render(){
        return(
        <Aux>
            <div className={classes.FileCard} onClick = {this.props.clicked}>
                {this.state.iframe}
                <div className={classes.container}>
                    <h4><b>{this.props.fileName}</b></h4> 
                </div>
            </div>
        </Aux>
    );
    }
}

export default displayFile;