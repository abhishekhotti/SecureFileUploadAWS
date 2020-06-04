import React, { Component } from 'react'
import classes from "./LandingPage.module.css";
import axios from "../../hoc/axios";
import Aux from '../../hoc/Aux';
import path from "path";
import DisplayFile from "../../components/DisplayFile/DisplayFile";
import Modal from "../../components/Modal/Modal";

class LandingPage extends Component{
    state = {
        files: [],
        onServer: {},
        user: "abhi",
        showModal: false
    }

    fileToUpload = (event) => {
        let data = new FormData();
        data.append('file', event.target.files[0])
        data.append('user', this.state.user)
        axios.post('/uploadFilesForReact', data).then(response => {
            this.getFiles()
        });
    }

    removeModal = () => {
        this.setState({showModal: false})
    }

    componentDidMount() {
        this.getFiles()
    }

    getFiles() {
        axios.get('/filepathForReact/'+this.state.user).then(response => {
            console.log(response.data)
            this.setState({onServer: response.data})
        }).catch(err => console.log(err))
    }

    openFile = (val) => {
        this.setState({showModal: true, fileInModal: val})
    }

    render() {
        const filesToShow = Object.keys(this.state.onServer).map(nameOfFile => {
            if(path.extname(this.state.onServer[nameOfFile]) === ".png"){
                return (
                    <DisplayFile 
                        key = {nameOfFile}
                        clicked = {() => this.openFile(this.state.onServer[nameOfFile])}
                        sourceFile = {"http://127.0.0.1:5000/displayRandom/"+this.state.onServer[nameOfFile]}
                        type = {"img"}
                        fileName = {nameOfFile}
                    />
                );
            }
            else{
                return (
                    <DisplayFile 
                        key = {nameOfFile}
                        clicked = {() => this.openFile(this.state.onServer[nameOfFile])}
                        sourceFile = {"http://127.0.0.1:5000/displayRandom/"+this.state.onServer[nameOfFile]}
                        type = {"iframe"}
                        fileName = {nameOfFile}
                    />
                );
            }
        })
        let modalDisplay = null;
        if (this.state.showModal){
            // Display the transparent modal
            modalDisplay = <Modal 
            clicked = {this.removeModal}> 
                <DisplayFile 
                key = {this.state.fileInModal}
                sourceFile = {"http://127.0.0.1:5000/displayRandom/"+this.state.fileInModal}
                type = {"img"}
                fileName = {this.state.fileInModal}/> 
            </Modal>
        }
        return(
            <Aux>
                {modalDisplay}
                <div className={classes.Card}>
                    <div className={classes.uploadBtnWrapper}>
                        <button className={classes.btn} >Upload a file</button>
                        <input type="file" name="myfile" onChange={this.fileToUpload} />
                    </div>
                </div>
                <div className={classes.BoxDiv}>
                    {filesToShow}
                </div>
            </Aux>
        )
    }
}

export default LandingPage;