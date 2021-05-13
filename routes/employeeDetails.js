const express=require('express');
const router=express.Router();
let model=require('../modeldb/employeeDetails');
let Auth = require("../middleware/auth")
const app = express();
let Joi=require('@hapi/joi');
 


router.get("/fetchAllEmployeeDetails",Auth, async(req,res)=>{


    let employeeRecord = await model.employeeRecord.find();
    res.send({list:employeeRecord,msg:"done"});
})

router.post("/addEmployeeDetails",Auth, async(req,res)=>{
    //validation on request Object
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

    let {error} =schema.validate(req.body);
    if(error){return res.send(error.details[0].message)};

    let newRecord  =new model.employeeRecord({
        name: req.body.name,
        dob: req.body.dob,
        
        contactNo: req.body.mobileNo,
        doj: req.body.doj,
       
        experienceYear: req.body.experienceYear,
        emailId: req.body.email,
        projectName: req.body.projectName,
        businessUnit: req.body.businessUnit,
        projectManger: req.body.projectManger,
        location:req.body.location,
    })
    let data = await  newRecord.save();
    res.send({message:"New record Added",list:data})
            
})


router.get("/findBusinessUnit/:businessUnit",Auth, async (req,res)=>{

    let employeeRecord=await model.employeeRecord.find({"businessUnit":req.params.businessUnit});
    if (!employeeRecord){return res.status(404).send({ message: "Invalid user id" })}
    res.send({list:employeeRecord});
})

router.get("/PieChart",Auth, async(req,res)=>{
    let pieChart=  await model.employeeRecord.aggregate([
        {"$group":{_id:"$businessUnit",y:{$sum:1} }
        },
        {
            "$project": { // for the final structure
                name: "$_id",
                y:1,
                _id:false
            }
        }    
    ])
     if(!pieChart){
         return res.status(403).send("data not found")
     }
     res.send(pieChart)
 })

 router.get("/BarChart",Auth, async(req,res)=>{
    let barChart=  await model.employeeRecord.aggregate([
        {"$group":{_id:"$location",count:{$sum:1} }
        } 
    ])
     if(!barChart){
         return res.status(403).send("data not found")
     }
     res.send(barChart)
 })
module.exports = router;