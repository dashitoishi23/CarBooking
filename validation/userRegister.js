const Validator=require('validator');
const isEmpty=require('./isEmpty');

module.exports=function validatorFacultyRegister(data){
let errors={};

data.name= !isEmpty(data.name)? data.name: '';
data.email= isEmpty(data.email)?'':data.email;
data.password= isEmpty(data.password)?'':data.password;


if(Validator.isEmpty(data.name)){
    errors.name="name cannot be empty";
}

if (Validator.isEmpty(data.email)) {
    errors.email = 'email field is required';
  }

if(Validator.isEmpty(data.password)){
    errors.password="password cannot be empty";
}



return {
    errors,
    isValid: isEmpty(errors)
  };

}