const mongoose = require('mongoose');
const appliedJOBModel = mongoose.Schema (
    {
        candidateId : {
            type:mongoose.Schema.Types.ObjectId,
            ref  : "candidate"
        },
    
        jobId:{
            type:mongoose.Schema.Types.ObjectId,
            ref : "job"
        }
    
   
    },
    {
        timestamps: true
    });

    module.exports = mongoose.model('appliedJOB',appliedJOBModel);

