import React from 'react';
import classes from '../../../Workout/Exercise_Item/Exercise.module.css';
import shortid from 'shortid';
import delete_icon from '../../../../Assets/Images/delete.png';

const ExerciseItemEdit = (props) => {
    let options = props.measurements.map(measurement => {
        return <option value={measurement} index={props.index} 
                    key={shortid.generate()} 
                    selected={measurement == props.currentEx.measurement}>{measurement}</option>
    });
    return(
        <div className={classes.main}>
            <div className={classes.field}>
                <label>Exercise name</label>
                <input value={props.currentEx.title} index={props.index} onChange={e => props.onChangeTitleExercise(e, props.index)}/>
            </div>
            <div className={classes.field}>
                <label>Measurement type</label>
                <select onChange={props.onChangeMeasurementType}>
                    {options}
                </select>
            </div>
            <div className={classes.buttons}>
                <button className={classes.moveBut} onClick={e => props.moveUpExercise(e, props.index)}>⬆</button>
                <button className={classes.moveBut} onClick={e => props.moveDownExercise(e, props.index)}>⬇</button>
                <button className={classes.removeBut} onClick={e => props.deleteExercise(e, props.index)}>
                    <img src={delete_icon}/>
                </button>
            </div>
        </div>
    );
}

export default ExerciseItemEdit;