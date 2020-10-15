import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Footer.module.css';
import { connect } from 'react-redux';

const Footer = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.navside}></div>
            <div className={classes.menu}>
                {props.isAuth ?
                    <>
                        <div className={classes.link}>
                            <NavLink to="/dashboard">DASHBOARD</NavLink>
                        </div>
                        <div className={classes.link}>
                            <NavLink to="/addex">NEW EXERCISE</NavLink>
                        </div>
                        <div className={classes.link}>
                            <NavLink to="/editex">EDIT EXERCISE</NavLink>
                        </div>
                        <div className={classes.link}>
                            <NavLink to="/addwork">NEW WORKOUT</NavLink>
                        </div>
                        <div className={classes.link}>
                            <NavLink to="/editwork">EDIT WORKOUT</NavLink>
                        </div>
                    </>
                :
                <>
                    <div className={classes.link}>
                        <NavLink to="/login">SIGN IN</NavLink>
                    </div>
                    <div className={classes.link}>
                        <NavLink to="/register">SIGN UP</NavLink>
                    </div>
                </>}
            </div>
        </div>
    );
}

let mapStateToProps = (state) => ({
    isAuth: state.user.isAuth
})

export default connect(mapStateToProps, {})(Footer);