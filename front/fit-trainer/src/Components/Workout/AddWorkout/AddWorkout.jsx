import React from 'react';
import { Redirect } from 'react-router-dom';
import WindowHeader from '../../Common/WindowHeader/WindowHeader';
import Exercise_Item from '../Exercise_Item/Exercise_Item';
import classes from '../Workout.module.css';


const AddWorkout = (props) => {
    let headerText = "New workout";
    let year, month, date;
    if(props.date){
        year = props.date.getFullYear();
        month = props.date.getMonth()+1;
        date = props.date.getDate();
    }
    
    return(
        <div className={classes.main}>
            <h1>New Workout</h1>
            <div className={classes.window}>
                <WindowHeader headerText={headerText}/>
                {props.date ? 
                <>
                    {!props.isHaveWorkout ?
                    <>
                        <form>
                            <h3>Create workout on {date + "/" + month + "/" + year}</h3>
                            <button onClick={props.addExercise} disabled={props.exercises.length <= 0 && true} className={classes.windowBut}>ADD EXERCISE</button>
                            <div className={classes.content}>
                                {props.exercises.length > 0 ? props.workout.map((ex, index)=>{
                                    return <Exercise_Item index={index} 
                                    onChangeExercise={props.onChangeExercise}
                                    onChangeRepeats={props.onChangeRepeats}
                                    onChangeMeasurement={props.onChangeMeasurement}
                                    deleteExercise={props.deleteExercise}
                                    moveUpExercise={props.moveUpExercise}
                                    moveDownExercise={props.moveDownExercise}
                                    exercises={props.exercises} 
                                    key={ex.exercise.title + index}
                                    currentEx={ex}/>
                                }) :
                                    <span>You have no exercises.</span>
                                }
                            </div>
                        </form>
                        <button className={classes.submitBut} onClick={props.addWorkout}>ADD WORKOUT</button>
                    </> : <span>You already have workout on this date!</span>}
                </> : <span>You don't select the date to create workout!</span>}
            </div>
        </div>
    );
}

export default AddWorkout;

