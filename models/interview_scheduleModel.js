const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interview_scheduleModel = new Schema({
    
    candidate_id:{
        
        type:mongoose.Schema.Types.ObjectId,
        ref  : "candidate"

    },
    job_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref  : "Job"
    },

    interview_date : {
        type : String,
        required : true
    },

    interview_mode : {
        type : String,
        required : true
    },

    location : {
        type : String,
        required : true
    },

    interviewer : {
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
        default:new Date()
    },
    schedule_status: {
        type : String,
        default: "pending"
    }
});

module.exports = mongoose.model('interview_schedule',interview_scheduleModel);