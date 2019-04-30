class ValidateForm{
    name(name){
         return /^([A-Za-z]+ ?)+$/.test(name);
    }
    email(email){
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return filter.test(email);
    }
    phone(phone){
        var filter = /[0-9]{11}$/;
        return filter.test(phone);
    }
    gender(value){
        return value && value != "Select gender";
    }
    date(date){
        console.log(date);
        var filter = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
        return filter.test(date);
    }
}


export default ValidateForm;