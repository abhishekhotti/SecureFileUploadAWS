import * as actionTypes from "../action/actionTypes";
// import axios from "../../hoc/axios";

export const validateUsername = (username) => {
    return {
        type: actionTypes.VALIDATEUSRENAME,
        username: username
    }
}

export const validateUserLogin = (boolean) => {
    return {
        type: actionTypes.VALIDATEIMAGE,
        loggedIn: boolean 
    }
}