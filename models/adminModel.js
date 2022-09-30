const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminModel = new Schema({
    user_name :{
        type: String,
        required : true
    },

    password:{
        type : String,
        required: true
    },
    created_at :{
        type:Date, 
        required:true, 
        default:Date.now
    },
    updated_at :{
        type:Date,
        required:true,
        default:new Date()},
    

    
    
});

module.exports = mongoose.model('admin',adminModel);