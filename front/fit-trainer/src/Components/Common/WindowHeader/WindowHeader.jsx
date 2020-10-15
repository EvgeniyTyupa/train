import React from 'react';
import classes from './WindowHeader.module.css';

const WindowHeader = (props) => {
    return(
        <div className={classes.header}>
            {props.headerText && <h2>{props.headerText}</h2>}
            {props.text && <span>{props.text}</span>} 
        </div>
    );
}

export default WindowHeader;