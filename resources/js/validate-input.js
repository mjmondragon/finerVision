class ValidateInput{

    constructor(value = "", isValid=true){
        this.value = value;
        this.isValid = isValid;
    }
    validate(validator){
        this.isValid = validator(this.value);
        return this.isValid;
    }
}
export default ValidateInput;