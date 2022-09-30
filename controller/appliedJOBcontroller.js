const appliedJOB=require("../models/appliedJOBModel");

exports.ViewAllAppliedJobs =  async function(req, res, next) {
  console.log("Entered View All Applied Job");
  try{
      const appliedAllJOBS = await appliedJOB.find({ candidateId: req.user}).populate("candidateId").populate("jobId").exec();
      res.json(appliedAllJOBS);
  }catch(err){
      res.send("Error: " + err);
  }
 
};

exports.ViewAppliedJob =  async function(req, res, next) {
    const id = req.params.id;
    try{
        const appliedJOBS = await appliedJOB.findById(id);
        res.json(appliedJOB);
    }catch(err){
        res.send("Error: " + err);
    }
   
  };

  

exports.DeleteAppliedJOB = async function(req, res, next) {

let id=req.params.id;

try{
let err=await Admin.findByIdAndDelete(id);
res.send("Deleted successfully")
}catch(err){
res.send("Couldn't delete" + err)

}
};  