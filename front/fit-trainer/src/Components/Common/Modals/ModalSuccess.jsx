import React from 'react';
import { connect } from 'react-redux';
import classes from './Modal.module.css';
import { setIsFormSuccess } from '../../../Redux/exerciseReducer';
import { useEffect } from 'react';

const ModalSuccess = (props) => {
    useEffect(()=>{
        setTimeout(()=>{
            props.setIsFormSuccess(false)
        }, 1500);
    },[]);
    return(
        <>
            {props.isFormSuccess && 
            <div className={classes.main}>
                <label>Success!</label>
            </div>}
        </>
        
        
    );
}

let mapStateToProps = (state) => ({
    isFormSuccess: state.exercises.isFormSuccess
});

export default connect(mapStateToProps, {setIsFormSuccess})(ModalSuccess);