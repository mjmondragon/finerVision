import ValidateInput from "./validate-input";

class ValidateInputDate extends ValidateInput{
    constructor(day = '', month ='', year =''){
        super();
        this.day = day;
        this.month = month;
        this.year = year;
    }
    validate(validator){
        this.isValid = validator(this.getDate());
        return this.isValid;
    }
    getDate(){
        return this.day + "/" + this.month + "/" + this.year;
    }
}

export default ValidateInputDate;