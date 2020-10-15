import React from 'react';
import classes from './FormsControls.module.css';


export const Input = ({ input, meta, ...props }) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
            <input {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    );
}