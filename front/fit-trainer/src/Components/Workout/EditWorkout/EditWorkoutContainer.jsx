import React, { useEffect, useState }  from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import EditWorkout from './EditWorkout';
import Preloader from '../../Common/Preloader/Preloader';
import { updateWorkout } from '../../../Redux/workoutReducer';
import ModalSuccess from '../../Common/Modals/ModalSuccess';
import { getExercises } from '../../../Redux/exerciseReducer';
import { getWorkouts, setWorkoutsData } from '../../../Redux/workoutReducer';

const EditWorkoutContainer = (props) => {
    const [workout, setWorkout] = useState([]);
    let workoutId = "";
    useEffect(()=>{
        workoutId = props.match.params.workoutId;
        if(!props.workouts && props.userId){
            props.getWorkouts(props.userId);
        }
        props.workouts.map(work => {
            if(work._id == workoutId){
                work.exercises.forEach(ex => {
                    props.exercises.forEach(exercise => {
                        if(exercise._id == ex.exercise){
                            console.log(exercise);
                            ex.exercise = exercise;
                        }
                    })
                })
                setWorkout(work.exercises);    
            }
        });
        
    },[]);
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

        const newWorkout = [...workout];
        newWorkout[workoutIndex].repeats = repeats;
        setWorkout(newWorkout);
    }
    const onChangeMeasurement = (event) => {
        let workoutIndex = event.target.getAttribute('index');
        let measurement = event.target.value;

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
    const updateWorkout = (e) => {
        console.log(workout);
    }

    return(
        <>
            {props.isFetching && <Preloader/> }
                <EditWorkout updateWorkout={updateWorkout}
                moveDownExercise={moveDownExercise}
                moveUpExercise={moveUpExercise}
                deleteExercise={deleteExercise}
                onChangeMeasurement={onChangeMeasurement}
                onChangeExercise={onChangeExercise}
                onChangeRepeats={onChangeRepeats}
                addExercise={addExercise}
                workout={workout}
                exercises={props.exercises}/> 
        </>
    );
}

let WithUrlDataContainerComponent = withRouter(EditWorkoutContainer);

let mapStateToProps = (state) => ({
    exercises: state.exercises.exercises,
    isFetching: state.workouts.isFetching,
    userId: state.user._id,
    isFormSuccess: state.workouts.isFormSuccess,
    workouts: state.workouts.workouts
});

export default connect(mapStateToProps, {
    getExercises,
    getWorkouts,
    updateWorkout
})(WithUrlDataContainerComponent);