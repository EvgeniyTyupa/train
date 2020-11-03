import React from 'react';
import classes from './Modal.module.css';
import { connect } from 'react-redux';
import { setIsShowModal } from '../../../Redux/actions/common';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const ModalAfterSubmit = (props) => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);
    return(
        <div className={classes.main}>
            <div className={classes.window} data-aos="fade-down">
                <div className={classes.header}>
                    <span onClick={()=>{props.setIsShowModal(false)}}>×</span>
                </div>
                <div className={classes.info}>
                    <p>{props.text}</p>
                </div>
            </div> 
        </div>
    );
}

export default connect(null, {setIsShowModal})(ModalAfterSubmit);