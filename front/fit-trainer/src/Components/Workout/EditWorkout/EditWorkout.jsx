import React from 'react';
import WindowHeader from '../../Common/WindowHeader/WindowHeader';
import Exercise_Item from '../Exercise_Item/Exercise_Item';
import classes from '../Workout.module.css';

const EditWorkout = (props) => {
    let headerText = "Edit workout";
    let workout = [];
    if(props.workout) {
        workout = props.workout;
    }
    return(
        <div className={classes.main}>
            <h1>Edit Workout</h1>
            <div className={classes.window}>
                <WindowHeader headerText={headerText}/>
                <form>
                    <button onClick={props.addExercise} disabled={props.exercises.length <= 0 && true} className={classes.windowBut}>ADD EXERCISE</button>
                    <div className={classes.content}>
                        {props.exercises.length > 0 ? workout.map((ex, index)=>{
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
                <button className={classes.submitBut} onClick={props.updateWorkout}>UPDATE WORKOUT</button>
            </div>
        </div>
    );
}

export default EditWorkout;