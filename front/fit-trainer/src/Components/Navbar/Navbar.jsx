import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Navbar.module.css';

import logo from '../../Assets/Images/logo192.png';
import user_icon from '../../Assets/Images/user_icon.svg';

const Navbar = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.userMenu}>
                {props.email && <span>{props.email}</span>}
                <img src={user_icon}/>

                {props.isAuth &&
                <div className={classes.dropdown}>
                    <NavLink to={"/login"} onClick={()=>{props.logout()}}>Logout</NavLink>
                </div>}

            </div>
            <div className={classes.plenka}>
                <div className={classes.header}>
                    <img src={logo}/>
                    <h1>FIT TRAINER</h1>
                </div>
                <div className={classes.menu}>
                    {props.isAuth ?                        
                        <div className={classes.links}>
                            <div className={classes.item}>
                                <NavLink to="/dashboard" activeClassName={classes.active}>
                                    <img src={user_icon}/>
                                    Dashboard
                                </NavLink>
                            </div>
                            <div className={classes.item}>
                                <NavLink to="/addex" activeClassName={classes.active}>
                                    <img src={user_icon}/>
                                    New Excercise
                                </NavLink>
                            </div>
                            <div className={classes.item}>
                                <NavLink to="/editex" activeClassName={classes.active}>
                                    <img src={user_icon}/>
                                    Edit Excercise
                                </NavLink>
                            </div>
                            <div className={classes.item}>
                                <NavLink to="/addworkout" activeClassName={classes.active}>
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
        </div>
    );
}

export default Navbar;
