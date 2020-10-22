import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import EditExercises from './EditExercises';
import { getExercises, setExercisesData, deleteExercise, updateExercises } from '../../../Redux/exerciseReducer';
import ModalSuccess from '../../Common/Modals/ModalSuccess';
import Preloader from '../../Common/Preloader/Preloader';

const EditExercisesContainer = (props) => {
    useEffect(()=>{
        if(props.userId) props.getExercises(props.userId);
        
        console.log(props.exercises);
    },[]);    
    const onChangeTitleExercise = (event, exerciseIndex) => {
        let title = event.target.value;

        const newExercises = [...props.exercises];
        newExercises[exerciseIndex].title = title;
        props.setExercisesData(newExercises);
    }
    const onChangeMeasurementType = (event) => {
        let index = event.target.selectedIndex;
        let optionElement = event.target.childNodes[index];
        let exerciseIndex = optionElement.getAttribute('index');
        let measurement = event.target.value;

        const newExercises = [...props.exercises];
        newExercises[exerciseIndex].measurement = measurement;
        props.setExercisesData(newExercises);
    }
    const deleteExercise = (event, exerciseIndex) => {
        event.preventDefault();

        
        let newExercises = [...props.exercises];
        props.deleteExercise(newExercises[exerciseIndex]._id);
        newExercises.splice(exerciseIndex, 1);
        props.setExercisesData(newExercises);
        
    }
    const moveUpExercise = (event, exerciseIndex) => {
        event.preventDefault();

        const newExercises = [...props.exercises];

        if(newExercises.indexOf(newExercises[exerciseIndex]) > 0){
            let tmp_item = newExercises[exerciseIndex - 1];
            newExercises[exerciseIndex - 1] = newExercises[exerciseIndex];
            newExercises[exerciseIndex] = tmp_item;
        }
        props.setExercisesData(newExercises);
    }
    const moveDownExercise = (event, exerciseIndex) => {
        event.preventDefault();

        const newExercises = [...props.exercises];

        if(newExercises.indexOf(newExercises[exerciseIndex]) < newExercises.length - 1){
            let tmp_item = newExercises[exerciseIndex + 1];
            newExercises[exerciseIndex + 1] = newExercises[exerciseIndex];
            newExercises[exerciseIndex] = tmp_item;
        }
        props.setExercisesData(newExercises);
    }
    let updateExercises = () => {
        let countError = 0;
        props.exercises.map(ex => {
            if(ex.title == ""){
                countError++;
                alert("You must fill all fields!");
            }
        });
        if(countError === 0) props.updateExercises(props.exercises);
    } 

    return(
        <>
            {props.isFormSuccess && <ModalSuccess/>}
            {props.isFetching && <Preloader/>}
            <EditExercises exercises={props.exercises}
                    updateExercises={updateExercises}
                    moveDownExercise={moveDownExercise}
                    moveUpExercise={moveUpExercise}
                    deleteExercise={deleteExercise}
                    onChangeMeasurementType={onChangeMeasurementType}
                    onChangeTitleExercise={onChangeTitleExercise}
                    measurements={props.measurements}/>
        </>
    );
}

let mapStateToProps = (state) => ({
    exercises: state.exercises.exercises,
    isFetching: state.exercises.isFetching,
    userId: state.user._id,
    isFormSuccess: state.exercises.isFormSuccess,
    measurements: state.exercises.measurements
});

export default connect(mapStateToProps, {
    getExercises,
    setExercisesData,
    deleteExercise,
    updateExercises
})(EditExercisesContainer);