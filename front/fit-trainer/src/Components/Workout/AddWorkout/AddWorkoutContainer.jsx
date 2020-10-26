import React, { useEffect, useState }  from 'react';
import { connect } from 'react-redux';
import { getExercises } from '../../../Redux/exerciseReducer';
import { Redirect, withRouter } from 'react-router-dom';
import AddWorkout from './AddWorkout';
import Preloader from '../../Common/Preloader/Preloader';
import { addWorkout } from '../../../Redux/workoutReducer';
import ModalSuccess from '../../Common/Modals/ModalSuccess';

const AddWorkoutContainer = (props) => {
    const [workout, setWorkout] = useState(() => {
        if(props.exercises.length > 0) {
            return [{
                exercise: props.exercises[0],
                repeats: 0,
                measurement: 0
            }]
        } else return []
    });
    const [date, setDate] = useState();
    useEffect(()=>{
        props.getExercises(props.userId);
        let date = props.selectedDate;
        setDate(date);
    },[props.isRedirectAfterSubmit]);
    const addExercise = (e) => {
        e.preventDefault();
        setWorkout([...workout, 
            {
                exercise: props.exercises[0],
                repeats: 0,
                measurement: 0
            }]);
        console.log(workout);
    }

    const onChangeExercise = ({target}) => { 
        let index = target.selectedIndex;
        let optionElement = target.childNodes[index];
        let workoutIndex = optionElement.getAttribute('index');
        let id = target.value;

        const newWorkout = [...workout];
        props.exercises.map(ex => {
            if(ex._id === id){
                newWorkout[workoutIndex].exercise = ex;
                console.log(ex);
            }
        })
        setWorkout(newWorkout);
    }
    const onChangeRepeats = (event) => {
        let workoutIndex = event.target.getAttribute('index');
        let repeats = event.target.value;

        let rep = /[-\.`$#@!%^&*()=;":'a-zA-Zа-яА-Я]/; 
        if (rep.test(repeats)) { 
            repeats = repeats.replace(rep, ''); 
        } 

        const newWorkout = [...workout];
        newWorkout[workoutIndex].repeats = repeats;
        setWorkout(newWorkout);
    }
    const onChangeMeasurement = (event) => {
        let workoutIndex = event.target.getAttribute('index');
        let measurement = event.target.value;

        let rep = /[-\.`$#@!%^&*()=;":'a-zA-Zа-яА-Я]/; 
        if (rep.test(measurement)) { 
            measurement = measurement.replace(rep, ''); 
        }

        const newWorkout = [...workout];
        newWorkout[workoutIndex].measurement = measurement;
        setWorkout(newWorkout);
    }

    const deleteExercise = (event, workoutIndex) => {
        event.preventDefault();
        
        let newWorkout = [...workout];
        newWorkout.splice(workoutIndex, 1);

        setWorkout(newWorkout);
    }
    const moveUpExercise = (event, workoutIndex) => {
        event.preventDefault();

        const newWorkout = [...workout];
        
        if(newWorkout.indexOf(newWorkout[workoutIndex]) > 0){
            let tmp_item = newWorkout[workoutIndex - 1];
            newWorkout[workoutIndex - 1] = newWorkout[workoutIndex];
            newWorkout[workoutIndex] = tmp_item;
        }
        setWorkout(newWorkout);
    }
    const moveDownExercise = (event, workoutIndex) => {
        event.preventDefault();

        const newWorkout = [...workout];
        if(newWorkout.indexOf(newWorkout[workoutIndex]) < newWorkout.length - 1){
            let tmp_item = newWorkout[workoutIndex + 1];
            newWorkout[workoutIndex + 1] = newWorkout[workoutIndex];
            newWorkout[workoutIndex] = tmp_item;
        }
        setWorkout(newWorkout);
    }

    let addWorkout = (e) => {
        console.log(workout);
        let countError = 0;
        workout.map(ex => {
            if(ex.repeats == "" || ex.measurement == ""){
                countError++;
                alert("You must fill all fields!");
            }
            if(ex.repeats == 0 || ex.measurement == 0){
                countError++;
                alert("Can't set 0 repeats and measurements!");
            }
        });
        console.log(date);
        let dateToSave = new Date(date);
        console.log(dateToSave);
        dateToSave.setHours(12);
        if(countError === 0) props.addWorkout(props.userId, workout, dateToSave); 
    }
    return(
        <>
            {props.isFetching && <Preloader/> }
                <AddWorkout addWorkout={addWorkout}
                moveDownExercise={moveDownExercise}
                moveUpExercise={moveUpExercise}
                deleteExercise={deleteExercise}
                onChangeMeasurement={onChangeMeasurement}
                onChangeExercise={onChangeExercise}
                onChangeRepeats={onChangeRepeats}
                addExercise={addExercise}
                workout={workout}
                exercises={props.exercises}
                date={date}
                isHaveWorkout={props.isHaveWorkout}/> 
        </>
       
    );
}

let WithUrlDataContainerComponent = withRouter(AddWorkoutContainer);

let mapStateToProps = (state) => ({
    exercises: state.exercises.exercises,
    isFetching: state.workouts.isFetching,
    userId: state.user._id,
    isFormSuccess: state.workouts.isFormSuccess,
    selectedDate: state.workouts.selectedDate,
    isHaveWorkout: state.workouts.isHaveWorkout
});

export default connect(mapStateToProps, {
    getExercises,
    addWorkout,
})(WithUrlDataContainerComponent);

