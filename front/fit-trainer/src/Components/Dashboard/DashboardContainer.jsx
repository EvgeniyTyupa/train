import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';
import { getWorkouts } from '../../Redux/workoutReducer';
import { useState } from 'react';

const DashboardContainer = (props) => {
    const [isAvailableNewWorkout, setIsAvailableNewWorkout] = useState(false);
    const [isAvailableEditWorkout, setIsAvailableEditWorkout] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [workoutId, setWorkoutId] = useState('');
    useEffect(()=>{
        props.getWorkouts(props.userId);
        parseDatesFromWorkouts(props.workouts);
    },[]);
    const parseDatesFromWorkouts = (workouts) => {
        let dates = [];
        workouts.map(workout => {
            dates.push(new Date(workout.date));
        });
        return dates;  
    }
    const parseDate = (date) => {
        let YearMonthDay = [];
        YearMonthDay.push(date.getFullYear());
        YearMonthDay.push(date.getMonth()+1);
        YearMonthDay.push(date.getDate());
        return YearMonthDay;
    }
    const checkDate = (date) => {
        setSelectedDate(date);
        let today = new Date();
        let todayData = parseDate(today);
        let todayToCompare = new Date(todayData[0], todayData[1], todayData[2]);

        let selectedDate = new Date(date);
        let dateData = parseDate(selectedDate);
        let selectedDayToCompare = new Date(dateData[0], dateData[1], dateData[2]);
        
        let isEqualsDates = false;

        props.workouts.map(workout => {
            let workoutDate = new Date(workout.date);
            let workoutDateData = parseDate(workoutDate);
            let workoutDateToCompare = new Date(workoutDateData[0], workoutDateData[1], workoutDateData[2]);
            
            if(workoutDateToCompare.getTime() === selectedDayToCompare.getTime()){
                setIsAvailableEditWorkout(true);
                setIsAvailableNewWorkout(false);
                setWorkoutId(workout._id);
                isEqualsDates = true;
            }
        })

        if(!isEqualsDates)setIsAvailableEditWorkout(false);
        if(selectedDayToCompare.getTime() >= todayToCompare.getTime() && !isEqualsDates){
            setIsAvailableNewWorkout(true);
        }
        if(selectedDayToCompare.getTime() < todayToCompare.getTime()){
            setIsAvailableNewWorkout(false);
            setIsAvailableEditWorkout(false);
        }
    }
    return(
        <>
            <Dashboard workouts={props.workouts} 
            checkDate={checkDate}
            isAvailableEditWorkout={isAvailableEditWorkout}
            isAvailableNewWorkout={isAvailableNewWorkout}
            workoutId={workoutId}
            selectedDate={selectedDate}/>
        </>
    );
}

let mapStateToProps = (state) => ({
    userId: state.user._id,
    workouts: state.workouts.workouts
});

export default connect(mapStateToProps, {
    getWorkouts
})(DashboardContainer);