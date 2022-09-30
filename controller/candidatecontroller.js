const candidate = require('../models/candidateModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Job = require('../models/jobModel');
const { request } = require('express');
const applyjob = require('../models/appliedJOBModel');
const { mongo, default: mongoose } = require('mongoose');
//To see all the jobs

exports.viewallJobs = async function(req, res) {
    try{
        const jobData = await Job.find();
        res.json(jobData);
    }catch(err){
        res.send("Error: " + err);
    }
}

//To see jobs using id


exports.viewjobs = async function(req, res, next) {
    const id = req.params.id;
    try{
        const jobData = await Job.findById(id);
        res.json(jobData);
    }catch(err){
        res.send("Error: " + err);
    }
}


//To see candidate  using id 

exports.viewCandidate=  async function(req, res,) {
    let id = req.params.id;
    try{
        const candidates = await candidate.findById(id, {password:0});
        res.json(candidates);
    }catch(err){
        res.send("Error: " + err);
    }
    
};

//To see the candidate without using id 

exports.GetCandidate=  async function(req, res,) {
    let id = req.params.id;
    try{
        const candidates = await candidate.findById(req.user);
        res.json(candidates);
    }catch(err){
        res.send("Error: " + err);
    }
    
};

//To register candidate

exports.registerCandidate =  async function(req, res, next) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log("hashed: " + hashedPassword)
  
    const user = new candidate({

        candidate_name:req.body.candidate_name,
        email:req.body.email,
        password:hashedPassword,
        phone:req.body.phone,
        qualification:req.body.qualification,
        experience:req.body.experience,
        expected_salary:req.body.expected_salary,
        current_salary:req.body.current_salary,
        current_company_name:req.body.current_company_name,
        resume:req.body.resume,
        
        
    });
    console.log("user: " + user)
  
    try{
        console.log(req.body)
        const savedUser = await user.save();
        console.log(savedUser);
        res.send(savedUser);
        res.end();
    }catch(err){
        res.status(400).send(err);
    }
    

  }

exports.applyJobs = async(req,res)=>{
    if((mongoose.Types.ObjectId.isValid(req.body.jobId))){ 
    let add_jobs= new applyjob({
        candidateId : req.user,
        jobId: req.body.jobId
    })
    // console.log(add_jobs)
    try{
        await add_jobs.save();
        let a = await applyjob.findOne({candidateId: req.user, jobId: req.body.jobId}).populate("candidateId", {password:0}).populate("jobId").exec();;
        console.log(a);
        res.status(201).send(a);
    } catch( err) {
        res.status(400).end("Error During Apply");
        console.log(err)
    }
    }else{
        res.send("Invalid ID");
    }
}



exports.bulkupload = async(req,res) => {
    console.log(req.role);

    
    console.log(req.body);
    if(Array.isArray(req.body)) {
    req.body.forEach(async (element) => {
    const applyJobs = applyjob ({
        candidateId : req.user,
        jobId: element.jobId 
    });
    
    try {
    const savejobs = await applyJobs.save();
    res.end("Bulk Upload successfully completed");
    } catch(err) {
     console.log (err);
     res.end();
    }
    });
    }

    };

 //To update candiate using id

 exports.updateCandidate = async function(req, res, next) {

    const id=req.params.id;
    console.log(req.params.id)
    
    try {
    let data = await candidate.findOneAndUpdate(req.params.id, req.body);
    res.send("candidate updated successfully" +data);
    }catch(err) {
    res.send("error during the candidate update" +err);
    }
};

//To delete candidate using id 

exports.deletecandidate = async function(req, res, next) {
    let id=req.params.id;
    try{
    let err=await candidate.findByIdAndDelete(id);
    res.send("candidate Deleted successfully")
    }catch(err){
    res.send("error during candidate deletion " + err)
    }
};

//To login candidate

exports.logincandidate = async (req, res) => {
        // try{
        //     const user = await candidate.find({email: req.body.email});
        //     // console.log(req.body)
        //     console.log(user.password)
        //     if(!user) return res.status(400).send('Email doesn\'t exist');
        //     const salt = await bcrypt.genSalt(10);
        //     const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        //     const validPass = await bcrypt.compare(req.body.password, user.password);
        //     console.log(hashedPassword+" \n"+ validPass)
        //     // if(hashedPassword ==user.password) {
        //         if(validPass) {
        //         console.log(user);
        //         const token=jwt.sign({_id: user._id}, 'haithisispandi'); 
        //         res.json(token).status(200);            
        //     }
        //     else{
        //         return res.status(400).send('Invalid password');
        //     } 
        // }catch(err)
        // {
        //     console.log("Error login: " + err)
        //     res.status(400).send("invalid credential")
        // } 
        try{
            const user = await candidate.findOne({email: req.body.email});
            console.log("user: " + user);
            if(!user) return res.status(400).send('Email doesn\'t exist');
            console.log("body.pwd: " + req.body.password);
            console.log("user.pwd: " + user.password);
        
            const validPass = await bcrypt.compare(req.body.password, user.password);
            console.log(validPass);

            if(!validPass) return res.status(400).send('Invalid password');

            else{
                const token=jwt.sign({_id: user._id}, 'secretkey'); 
                // res.json(token);
                res.json({email :user.email,accesstoken:token})
            } 
        }catch(err)
        {
            console.log("Error login: " + err)
            res.status(400).send("invalid credential")
        } 
    }
    