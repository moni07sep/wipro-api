let mongoose =require("mongoose");
let Joi=require('@hapi/joi');
 
let employeeDetailSchema=new mongoose.Schema({
    name:{type:String},
    dob:{type:String},
    contactNo:{type:Number},
    doj:{type:String},
    experienceYear:{type:Number},
    emailId:{type:String},
    projectName:{type:String},
    businessUnit:{type:String},
    location:{type:String},
    projectManger:{type:String}
});

function employeeRecordValidation(error){
    let schema=Joi.object({
        name:Joi.string().required(),
        dob:Joi.string().required(),
        mobileNo:Joi.number().required(),
        doj:Joi.string().required(),
        experienceYear:Joi.number().required(),
        email:Joi.string().required(),
        projectName:Joi.required(),
        businessUnit:Joi.required(),
        projectManger:Joi.required(),
        location:Joi.required()
    })
    return schema.validate(error)
}
let employeeRecord=mongoose.model("Model", employeeDetailSchema, "employeedetails");
module.exports={employeeRecord, employeeRecordValidation }