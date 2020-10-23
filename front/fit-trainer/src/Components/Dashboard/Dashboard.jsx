import React, { useEffect } from 'react';
import classes from './Dashboard.module.css';
import InfiniteCalendar, { 
    Calendar, 
    withDateSelection } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { withProps } from 'recompose';
import { NavLink } from 'react-router-dom';

let today = new Date();
let lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDay());
console.log(lastDay);


const enhanceDay = highlighted => withProps(props => ({
    isHighlighted: highlighted.indexOf(props.date) !== -1,}
));

const withHighlightedDates = withProps(({highlighted, DayComponent}) => ({
    DayComponent: enhanceDay(highlighted)(DayComponent),
}));

const Dashboard = (props) => {
    let dates = [];
    props.workouts.map(workout => {
        dates.push(workout.date.split('T')[0]);
    })

    useEffect(()=>{
        let today = new Date();
        props.checkDate(today);
    },[props.workouts]);

    return(
        <div className={classes.main}>
             <h1>Dashboard</h1>
             
             <div className={classes.calendar}>
                {props.isAvailableNewWorkout && 
                    <div className={classes.buttons}>
                        <NavLink to="/addex">ADD NEW EXERCISE</NavLink>
                        <NavLink to={`/addwork`}>ADD NEW WORKOUT</NavLink>
                    </div>}
                {props.isAvailableEditWorkout && 
                    <div className={classes.buttons}>
                        <NavLink to="/addex">ADD NEW EXERCISE</NavLink>
                        <NavLink to={`/editwork/${props.workoutId}`}>EDIT WORKOUT</NavLink>
                    </div>}
                <InfiniteCalendar 
                    width={"40%"}
                    height={450}
                    selected={today}
                    onSelect={date => props.checkDate(date)}
                    Component={withDateSelection(withHighlightedDates(Calendar))}
                    highlighted={dates}/>
             </div>
             
        </div>
       
    );
}

export default Dashboard;