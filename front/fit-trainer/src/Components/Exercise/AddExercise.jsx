import React from 'react';
import classes from '../Common/Form.module.css';
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { Input, Select } from '../Common/FormsControls/FormsControls';
import { required } from '../../Utils/validators';
import WindowHeader from '../Common/WindowHeader/WindowHeader';
import Preloader from '../Common/Preloader/Preloader';
import { addExercise } from '../../Redux/exerciseReducer';
import ModalSuccess from '../Common/Modals/ModalSuccess';

class AddExForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            headerText: "Create new exercise",
            text: "Please, add a new exercise name and measurement type",
            defaultMeasurement: null
        }
    }
    componentWillMount(){
        this.state.defaultMeasurement = this.props.measurements[0];
        this.props.initialize({measurement: this.state.defaultMeasurement})
    }
    render(){
        return(
            <div className={classes.window}>
                <WindowHeader headerText={this.state.headerText} text={this.state.text}/>
                <form className={classes.form} onSubmit={this.props.handleSubmit}>
                    <div className={classes.field}>
                        <Field component={Input} placeholder="Exercise Name" type="text" name={"title"} 
                            validate={[required]}/>
                    </div>
                    <div className={classes.field}>
                        <label>Measurement type</label>
                        <Field component={Select} name={"measurement"} defaultValue
                            validate={[required]}>
                                {this.props.options}
                        </Field>
                    </div>
                    
                    {this.props.error && 
                        <div className={classes.errorContainer}>
                            <div className={classes.error}>
                                {this.props.error}
                            </div>
                        
                        </div>}
                    <button>CREATE EXERCISE</button>
                </form>
            </div>
        );
    }
    
}

const AddExReduxForm = reduxForm({
    form: 'addEx', 
    keepDirtyOnReinitialize: true, 
    enableReinitialize: true})
(AddExForm);

const AddEx = (props) => {
    const onSubmit = (formData) => {
        props.addExercise(props.userId, formData.title, formData.measurement);
    }
    let options = props.measurements.map(measurement => {
        return(
            <option value={measurement} className={classes.selectOption}>{measurement}</option>
        );
    });
    return(
        <>
            {props.isFetching && <Preloader/>}
            {props.isFormSuccess && <ModalSuccess/>}
            <div className={classes.main}>
                <h1>New Exercise</h1>
                <AddExReduxForm onSubmit={onSubmit} measurements={props.measurements} options={options}/>
            </div>
        </>
    );
}

let mapStateToProps = (state) => ({
    isFetching: state.exercises.isFetching,
    measurements: state.exercises.measurements,
    userId: state.user._id,
    isFormSuccess: state.exercises.isFormSuccess
});

export default connect(mapStateToProps, {
    addExercise
})(AddEx);