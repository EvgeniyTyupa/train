import React from 'react';
import shortid from 'shortid'
import classes from './Exercise.module.css';
import delete_icon from '../../../Assets/Images/delete.png';

const Exercise_Item = (props) => {
    let options = props.exercises.map((ex, idx) => {
        return <option value={ex._id} index={props.index} key={shortid.generate()} selected={ex._id === props.currentEx.exercise._id}>{ex.title}</option>
    });
    console.log(props.currentEx);
    return(
        <div className={classes.main}>
            <div className={classes.field}>
                <label>Exercise name</label>
                <select onChange={props.onChangeExercise}>
                    {options}
                </select>
            </div>
            <div className={classes.field}>
                <label>Repeats</label>
                <input value={props.currentEx.repeats} index={props.index} onChange={props.onChangeRepeats}/>
            </div>
            <div className={classes.field}>
                <label>Measurement</label>
                <input value={props.currentEx.measurement} index={props.index} onChange={props.onChangeMeasurement}/>
            </div>
            
            <span>{props.currentEx.exercise.measurement}</span>
            
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

export default Exercise_Item;