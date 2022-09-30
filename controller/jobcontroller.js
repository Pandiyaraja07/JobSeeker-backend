const job=require("../models/jobModel");

//to add jobs



//To see the job in page wise

exports.view_jobs = (req, res) => {
    res.json(res.paginatedResult);
  };
  
  exports.page = function paginatedData(models) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      const results = {};
  
   
  
      try {
        results.result = await models.find().limit(limit).skip(startIndex).exec();
        res.paginatedResult = results;
        next();
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };
  };

//To see the job using id

exports.viewjob = async (req, res)=> {

    const id = req.params.id;
    try{
        const jobs = await Job.findById(id);
        res.json(job);
    }catch(err){
        res.send("Error: " + err);
    }
}

//To update the job using id

exports.updateJob = async function(req, res) {

    const id=req.params.id;
    console.log(req.params.id)
    
    try {
    let data = await job.findOneAndUpdate(req.params.id, req.body);
    res.send(" Job updated successfully" +data);
    }catch(err) {
    res.send("error during job upload" +err);
    }
      
}

//To delete the job using id

exports.deleteJobs = async  function(req, res) {

    let id=req.params.id;

    try{
    let err=await job.findByIdAndDelete(id);
    res.send("job Deleted successfully")
    }catch(err){
    res.send("error during the job deletion" + err)
    
    }
  
}