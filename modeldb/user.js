let mongoose = require("mongoose");
let Joi = require("@hapi/joi");

let userSchema = new mongoose.Schema({
    userLogin: {
        emailId: { type: String, required: true, unique: true },
        password: { type: String, required: true, min: 4, max: 150 }
    }
});

function userValidationError(error){
    let schema=Joi.object({
         userLogin: {
            emailId:Joi.string().required().email() ,
            password: Joi.any().required()
         },
    })
    return schema.validate(error);
}

//let userModel=mongoose.model("users", userSchema);

let userModel=mongoose.model("ModelUser", userSchema, "user");
module.exports={userModel,   userValidationError};