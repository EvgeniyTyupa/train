import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

import logo from '../../Assets/Images/logo192.png';
import user_icon from '../../Assets/Images/user_icon.svg';

const Navbar = (props) => {
    useEffect(() => {

    })
    return(
        <div className={classes.main}>
            <div className={classes.plenka}>
                <div className={classes.header}>
                    <img src={logo}/>
                    <h1>FIT TRAINER</h1>
                </div>
                <div className={classes.menu}>
                    {localStorage.token ?                        
                        <div className={classes.links}>
                            <div className={classes.item}>
                                <NavLink to="/dashboard" activeClassName={classes.active}>
                                    <img src={user_icon}/>
                                    Dashboard
                                </NavLink>
                            </div>
                            <div className={classes.item}>
                                <NavLink to="/excercise/add" activeClassName={classes.active}>
                                    <img src={user_icon}/>
                                    New Excercise
                                </NavLink>
                            </div>
                            <div className={classes.item}>
                                <NavLink to="/excercise/edit" activeClassName={classes.active}>
                                    <img src={user_icon}/>
                                    Edit Excercise
                                </NavLink>
                            </div>
                            <div className={classes.item}>
                                <NavLink to="/workout/add" activeClassName={classes.active}>
                                    <img src={user_icon}/>
                                    New Workout
                                </NavLink>
                            </div>
                            <div className={classes.item}>
                                <NavLink to="/workout/edit" activeClassName={classes.active}>
                                    <img src={user_icon}/>
                                    Edit Workout
                                </NavLink>
                            </div>
                        </div>
                        :
                        <div className={classes.links}>
                            <div className={classes.item}>
                                <NavLink to="/login" activeClassName={classes.active}>
                                    <img src={user_icon}/>
                                    Sign In
                                </NavLink>
                            </div>
                            <div className={classes.item}>
                                <NavLink to="/register" activeClassName={classes.active}>
                                    <img src={user_icon}/>
                                    Sign Up
                                </NavLink>
                            </div>
                            
                        </div>
                        
                    }
                    
                </div>
                
            </div>
            <div className={classes.foot}></div>
        </div>
    );
}

export default Navbar;
