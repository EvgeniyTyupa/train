import React, { useEffect, useState }  from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import EditWorkout from './EditWorkout';
import Preloader from '../../Common/Preloader/Preloader';
import ModalSuccess from '../../Common/Modals/ModalSuccess';
import { getExercises } from '../../../Redux/exerciseReducer';
import { getWorkouts, setWorkoutsData, updateWorkout } from '../../../Redux/workoutReducer';

const EditWorkoutContainer = (props) => {
    const [workout, setWorkout] = useState([]);

    const workoutId = props.selectedWorkoutId;

    useEffect(()=>{
        props.getExercises(props.userId)
        if(!props.workouts && props.userId){
            props.getWorkouts(props.userId);
        }
        props.workouts.map(work => {
            if(work._id === workoutId){
                work.exercises.forEach(ex => {
                    props.exercises.forEach(exercise => {
                        if(exercise._id == ex.exercise){
                            ex.exercise = exercise;
                            
                        }
                    })
                })
                
                setWorkout(work.exercises);
                    
            }
        });
        
    },[props.selectedWorkoutId, props.userId]);
    const addExercise = (event) => {
        event.preventDefault();
        setWorkout([...workout, 
            {
                exercise: props.exercises[0],
                repeats: 0,
                measurement: 0
            }]);
    }
    const onChangeExercise = (event) => {
        let index = event.target.selectedIndex;
        let optionElement = event.target.childNodes[index];
        let workoutIndex = optionElement.getAttribute('index');
        let id = event.target.value;

        const newWorkout = [...workout];
        props.exercises.map(ex => {
            if(ex._id === id){
                newWorkout[workoutIndex].exercise = ex;
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
        if(newWorkout.length > 1){
            newWorkout.splice(workoutIndex, 1);
            setWorkout(newWorkout);
        }else{
            alert("You can't remove all exercises from workout!");
        }
        
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
    const updateWorkout = (e) => {
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
        
        if(countError === 0 ) props.updateWorkout(workoutId, workout);
    }
    return(
        <>
            {props.isFetching ? <Preloader/> :
                <EditWorkout updateWorkout={updateWorkout}
                moveDownExercise={moveDownExercise}
                moveUpExercise={moveUpExercise}
                deleteExercise={deleteExercise}
                onChangeMeasurement={onChangeMeasurement}
                onChangeExercise={onChangeExercise}
                onChangeRepeats={onChangeRepeats}
                addExercise={addExercise}
                workout={workout}
                exercises={props.exercises}
                workoutId={workoutId}
                selectedDate={props.selectedDate}
                isHaveWorkout={props.isHaveWorkout}/> 
            }
        </>
    );
}

let WithUrlDataContainerComponent = withRouter(EditWorkoutContainer);

let mapStateToProps = (state) => ({
    exercises: state.exercises.exercises,
    isFetching: state.workouts.isFetching,
    userId: state.user._id,
    isFormSuccess: state.workouts.isFormSuccess,
    workouts: state.workouts.workouts,
    selectedWorkoutId: state.workouts.selectedWorkoutId,
    selectedDate: state.workouts.selectedDate,
    isHaveWorkout: state.workouts.isHaveWorkout
});

export default connect(mapStateToProps, {
    getExercises,
    getWorkouts,
    updateWorkout
})(WithUrlDataContainerComponent);