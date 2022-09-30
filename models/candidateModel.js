const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    candidate_name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:
    {
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    expected_salary:{
        type:Number,
        required:true
    },
    current_salary:
    {
        type:Number,
        required:true
    },
    current_company_name:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    }
    },{timestamps:true});

    module.exports = mongoose.model('candidate',candidateSchema);