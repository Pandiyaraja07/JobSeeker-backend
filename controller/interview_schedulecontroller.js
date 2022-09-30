const interview_Schedules = require("../models/interview_scheduleModel")


//To add interview 

exports.addInterview = async function (req, res) {
    try{
        let add_interview= new interview_Schedules(req.body)
        let add_interviewsave= await add_interview.save();
        res.json(add_interviewsave).status(201);
      } catch(err) {
        res.send("couldn't add" +err);
        console.log(err);
      }
  
}

//To view all interviewschedule

exports.viewAllSchedule   =async function (req, res) {

    try{

        const Schedule = await interview_Schedules.find();

        res.json(interview_Schedules);

        }
        catch(err)
        {
            res.send("Error: " + err);
        }
      
  
}

//To view interview schedule using id 


exports.viewSchedule = async function (req, res) {

    const id = req.params.id;


    try{

        const Schedule = await interview_Schedules.findById(id);
        res.json(interview_Schedules);
        }catch(err){
            res.send("Error: " + err);
        }
    
    
  
}

//To update interview using id

exports.UpdateInterview = async function(req, res) {

    const id=req.params.id;
    console.log(req.params.id)
    
    try {
    let data = await interview_Schedules.findOneAndUpdate(req.params.id, req.body);
    res.send(" interview_Schedules updated successfully" +data);
    }catch(err) {
    res.send("error during the interview Scheduling" +err);
    }
    
        
      
}

//To delete interview using id

exports.deleteInterview = async function(req, res) {

    let id=req.params.id;

    try{
    let err=await interview_Schedules.findByIdAndDelete(id);
    res.send("interview Deleted successfully")
    }catch(err){
    res.send("error during interview deletion" + err)
    
    }
  
}

