const { response } = require("express");
const express=require("express");
const mongoose=require("mongoose");
const Admin=require("./models/adminModel");
const admin = require("./routes/adminRoute")
const candidateRoute = require("./routes/candidateRoute")
const job = require("./models/jobModel");
const jobRoute =require("./routes/jobRoute");
const cors = require('cors');
const app=express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4200'
}))

mongoose.connect("mongodb+srv://Pandiyaraja:Rajaraja@cluster0.8u3hw1k.mongodb.net/job_Seekers?retryWrites=true&w=majority",{
useNewUrlParser:true,
useUnifiedTopology:true,
},
(err)=>{
if(!err)
{
console.log("Database connected successfully");
}
else

console.log("Error occured" + err);
}
)

app.use("/admin", admin);
app.use("/candidate",candidateRoute);
app.use("/job",jobRoute);



app.listen(3000,()=> {

console.log("Server is running on port no. 3000")
})