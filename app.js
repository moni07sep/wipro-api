let  express = require("express");
let mongoose =require("mongoose");
let cors = require("cors");
var bodyParser = require('body-parser');
let port = process.env.PORT || 4600;
let app=express();
let empDetails= require("./routes/employeeDetails.js")
let auth =require("./routes/auth/auth.js")


app.use(cors());  

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost/wipro",
{ useNewUrlParser: true,useUnifiedTopology: true, useFindAndModify: false})
.then(()=>console.log("connected to db"))
.catch(err=>console.log(`somthing went wrong ${err.message}`))

app.use("/api",empDetails);
app.use("/api",auth);

app.listen(port,()=>console.log(`port is working on ${port}`))