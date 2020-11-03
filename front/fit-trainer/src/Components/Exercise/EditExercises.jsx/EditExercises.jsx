import React from 'react';
import WindowHeader from '../../Common/WindowHeader/WindowHeader';
import classes from './Exercises.module.css';
import ExerciseItemEdit from './Exercise_item_edit/ExerciseItemEdit';
import shortid from 'shortid';

const EditExercises = (props) => {
    let headerText = "Edit Exericses";
    let exercises = [];
    if(props.exercises){
        exercises = props.exercises.map((ex, index) => {
            return <ExerciseItemEdit currentEx={ex} 
                        measurements={props.measurements}
                        moveDownExercise={props.moveDownExercise}
                        moveUpExercise={props.moveUpExercise}
                        deleteExercise={props.deleteExercise}
                        onChangeMeasurementType={props.onChangeMeasurementType}
                        onChangeTitleExercise={props.onChangeTitleExercise}
                        key={ex.title + index}
                        index={index}/>
        });
    }
    
    return(
       <div className={classes.main}>
           <h1>Edit Exercises</h1>
           <div className={classes.window}>
                <WindowHeader headerText={headerText}/>
                <form>
                    <div className={classes.content}>
                        {exercises.length > 0 ? exercises : <span>You have no exercises.</span>}
                    </div>
                </form>
                <button className={classes.submitBut} onClick={props.updateExercises} disabled={exercises.length <= 0 && true} >UPDATE EXERCISES</button>
           </div>
       </div>
    );
}

export default EditExercises;