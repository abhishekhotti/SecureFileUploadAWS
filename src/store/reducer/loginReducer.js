import * as actionTypes from "../action/actionTypes";
const initialState = {
    username: null, 
    loggedIn: false
}

const loginReducer = (state = initialState, action) =>
{
    switch(action.type) {
        case actionTypes.VALIDATEUSRENAME:
            return {
                ...state, username: action.username
            }
        case actionTypes.VALIDATEIMAGE:
            return{
                ...state, loggedIn: action.loggedIn
            }
        default:
            return state;
    }
}

export default loginReducer