const jwt = require('jsonwebtoken');
const candidateModel = require('../models/candidateModel');
const Admin = require('../models/adminModel');

module.exports = async function (req, res, next) {
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('Access Denied UnAuthorized Access Request');
    try{
        const verified = jwt.verify(token, 'secretkey');
        const admin = await Admin.findById(verified._id);
        if (admin) {
            req.role = "admin";
            console.log("Logged in As Admin...")
        } 
            
        else{
            const candidate = await candidateModel.findById(verified._id);
            if(candidate){
                req.role= "candidate";
                console.log("Logged in As Candidate...");
            }
        }
        // console.log(verified)
        req.user= verified._id;
        
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

