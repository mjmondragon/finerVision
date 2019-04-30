import React, { Component } from 'react';
import CollapseOption from './CollapseOption';
import ValidateForm from '../validate-form';
import ValidateInput from '../validate-input';
import ValidateInputDate from '../validate-input-date';

class CollapsePanel extends Component{

    constructor(props){
        super(props);
        this.state = {
            currentStep: 1,
            firstName: new ValidateInput(),
            lastName: new ValidateInput(),
            email: new ValidateInput(),
            phone: new ValidateInput(),
            gender: new ValidateInput(),
            dateBirth: new ValidateInputDate(),
            comments: "",
            isComplete: false,
            hasValidationError: false,
        }
        this.handleToggleCollapse = this.handleToggleCollapse.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeStep = this.handleChangeStep.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.resetInputs = this.resetInputs.bind(this);
        this._renderValidationError = this._renderValidationError.bind(this);
        this._renderComplete = this._renderComplete.bind(this);
    }
    handleToggleCollapse(step, isActive){
        if(!isActive){
            let currentStep = step;
            this.setState({currentStep});
        }
    }
    handleChange(event){
        const id = event.target.id;
        const value = event.target.value;
        let dateBirth = this.state.dateBirth;
        switch (id) {
            case 'first_name':
                let firstName = this.state.firstName;
                firstName.value = value;
                this.setState({firstName});
                break;
            case 'surname':
                let lastName = this.state.lastName;
                lastName.value = value;
                this.setState({lastName});
                break;
            case 'email':
                let email = this.state.email;
                email.value = value;
                this.setState({email});
                break;
            case 'phone_number':
                let phone = this.state.phone;
                phone.value = value;
                this.setState({phone});
                break;
            case 'gender':
                let gender = this.state.gender;
                gender.value = value;
                this.setState({gender});
                break;
            case 'day':
                dateBirth.day = value;
                this.setState({dateBirth});
                break;
            case 'month':
                dateBirth.month = value;
                this.setState({dateBirth});
                break;
            case 'year':
                dateBirth.year = value;
                this.setState({dateBirth});
                break;
        }
    }
    handleChangeStep(){
        let currentStep = this.state.currentStep;
        let isValid;
        if(currentStep < 3){
            currentStep += 1;
            this.setState({currentStep});
        }else if(isValid = this.validateForm()){
            this.sendForm();
        }else{
            this.setState({hasValidationError: !isValid});
        }
    }
    validateForm(){
        const validateForm = new ValidateForm();
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let email = this.state.email;
        let phone = this.state.phone;
        let gender = this.state.gender;
        let dateBirth = this.state.dateBirth;
        let isValid = firstName.validate(validateForm.name) 
                        && lastName.validate(validateForm.name)
                        && email.validate(validateForm.email)
                        && phone.validate(validateForm.phone)
                        && gender.validate(validateForm.gender)
                        && dateBirth.validate(validateForm.date);
        this.setState({firstName, lastName, email});
        return isValid;
    }
    sendForm(){
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let email = this.state.email;
        let phone = this.state.phone;
        let gender = this.state.gender;
        let dateBirth = this.state.dateBirth;
        let comments = this.state.comments;
        let params = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            phone_number: phone.value,
            gender: gender.value,
            birthday: dateBirth.getDate(),
            comments: comments
        }
        let self = this;
        axios.post('/client', params)
            .then(function (response) {
                let isComplete = true;
                self.setState({isComplete});
                self.resetInputs();
                console.log(response);
            })
            .catch(function (error) {
                console.log(error.response);
                if(error.response.status == 422){
                    self.setState({hasValidationError: true});
                }
            });
    }
    resetInputs(){
        let firstName = new ValidateInput();
        let lastName = new ValidateInput();
        let email = new ValidateInput();
        let phone = new ValidateInput();
        let gender = new ValidateInput();
        let dateBirth = new ValidateInputDate();
        let comments = "";
        this.setState({firstName, lastName, email, phone, gender, dateBirth, comments});
    }
    _renderComplete(){
        const isComplete = this.state.isComplete;
        if(isComplete){
            return (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <span>Your details and comments have been added sucessfully!.</span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        }
        return null;
    }
    _renderValidationError(){
        const hasValidationError = this.state.hasValidationError;
        if(hasValidationError){
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <span>Some details are not valid</span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )
        }
        return null;
    }
    render(){ 
        const currentStep = this.state.currentStep;
        const firstName = this.state.firstName;
        const email = this.state.email;
        const lastName = this.state.lastName;
        const phone = this.state.phone;
        const gender = this.state.gender
        const dateBirth = this.state.dateBirth;
        const comments = this.state.comments;
        return(
            <div>
                {this._renderValidationError()}
                {this._renderComplete()}
                <div className="panel bg-white">
                    <div className="panel-header">
                        <CollapseOption title="Your details" step={1} isActive={ currentStep == 1} className="mb-1" onToggleCollapse={this.handleToggleCollapse}>
                            <div className="row">
                                <div className="col-12 col-sm-4">
                                    <div className={`form-group ${!firstName.isValid ? 'input-validation-error' : ''}`}>
                                        <label htmlFor="first_name">First Name</label>
                                        <input type="text" id="first_name" className="form-control" value={firstName.value} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <div className={`form-group ${!lastName.isValid ? 'input-validation-error' : ''}`}>
                                        <label htmlFor="surname">Surname</label>
                                        <input type="text" id="surname" className="form-control" value={lastName.value} onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-4">
                                    <div className={`form-group ${!email.isValid ? 'input-validation-error' : ''}`}>
                                        <label htmlFor="email">Email Address</label>
                                        <input type="email" id="email" className="form-control" value={email.value} onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-right">
                                    <button className="btn btn-secondary" onClick={this.handleChangeStep}> Next ></button>
                                </div>
                            </div>
                        </CollapseOption>
                        <CollapseOption title="More comments" step={2} isActive={currentStep == 2} className="mb-1" onToggleCollapse={this.handleToggleCollapse}>
                            <div className="row">
                                <div className="col-12 col-sm-4">
                                    <div className={`form-group ${!phone.isValid ? 'input-validation-error' : ''}`}>
                                        <label htmlFor="phone_number">Phone number</label>
                                        <input type="text" id="phone_number" className="form-control" value={phone.value} onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <div className={`form-group ${!gender.isValid ? 'input-validation-error' : ''}`}>
                                        <label htmlFor="gender">Gender</label>
                                        <select id="gender" className="form-control" value={gender.value} onChange={this.handleChange}>
                                            <option>Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-sm-4">
                                    <div className={`form-group ${!dateBirth.isValid ? 'input-validation-error' : ''}`}>
                                        <label htmlFor="date_birth">Date of birth</label>
                                        <div className="display-flex">
                                            <input type="text" id="day" maxLength={2} className="form-control mr-2" value={dateBirth.day} onChange={this.handleChange}/>
                                            <input type="text" id="month" maxLength={2} className="form-control mr-2" value={dateBirth.month} onChange={this.handleChange}/>
                                            <input type="text" id="year" maxLength={4} className="form-control" value={dateBirth.year} onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-right">
                                    <button className="btn btn-secondary" onClick={this.handleChangeStep}> Next ></button>
                                </div>
                            </div>
                        </CollapseOption>
                        <CollapseOption title="Final comments" step={3} isActive={currentStep == 3} onToggleCollapse={this.handleToggleCollapse}>
                            <div className="row">
                                <div className="col-12 col-sm-7">
                                    <div className="form-group mb-0">
                                        <label htmlFor="comments">Comments</label>
                                        <textarea id="comments" className="form-control" rows="5" value={comments} onChange={this.handleChange}></textarea>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-5 text-right display-flex flex-direction-column">
                                    <div className="mt-auto">
                                        <button className="btn btn-secondary" onClick={this.handleChangeStep}> Next ></button>
                                    </div>
                                </div>
                            </div>
                        </CollapseOption>
                    </div>
                </div>
            </div>
        )
        
    }
}

export default CollapsePanel;