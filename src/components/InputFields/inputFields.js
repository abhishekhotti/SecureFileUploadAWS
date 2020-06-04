import React from 'react';
import classes from "./inputFields.module.css"

const inputFields = props => {
    switch(props.type){
        case ("text"):
            return <input type = "text" {...props} className={classes.TextBox} />
        case ("button"):
            return <input type = "button" {...props} className={classes.Button} />
        case ("file"):
            return <input type = "file" {...props} className={classes.Input} />
        default:
            return null;
    }
}

export default inputFields;