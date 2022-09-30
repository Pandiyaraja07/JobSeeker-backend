const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobModel =new Schema({
    company_Name :{
        type : String,
        required : true
    },
    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    experience:{
        type : Number,
        required : true
    },
    salary_detail:{
        type : Number,
        required : true
    },
    job_location:{
        type : String,
        required : true
    },
    
    created_at :{
        type:Date, 
        required:true, 
        default:Date.now
    },
    updated_at :{
        type:Date,
        required:true,
        default:new Date()}
});

module.exports = mongoose.model('job',jobModel);