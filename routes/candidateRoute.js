/*Get*/
// const Job = require('../models/jobModel');
const appliedJOBcontroller = require("../controller/appliedJOBcontroller")
const job =require('../models/jobModel')
const candidate = require("../models/candidateModel")
const tokenverify =require("../middleware/verifyCan")

const router = require("express").Router();
const candidatecontroller = require("../controller/candidatecontroller")


router.get('/view_jobs', tokenverify, candidatecontroller.viewallJobs);
// router.get('/view_job', tokenverify, candidatecontroller.viewjob);
router.get('/view_job/:id',tokenverify,  candidatecontroller.viewjobs );
router.get('/getcandidate',tokenverify,candidatecontroller.GetCandidate);
router.get('/view_candidate/:id',tokenverify,candidatecontroller.viewCandidate);
router.get('/view_AllAppliedJOB', tokenverify,appliedJOBcontroller.ViewAllAppliedJobs)

// router.get('/view_appliedJOB/:id', async function(req, res, next) {
//     const id = req.params.id;
//     try{
//         const appliedJOBS = await appliedJOB.findById(id);
//         res.json(appliedJOB);
//     }catch(err){
//         res.send("Error: " + err);
//     }
   
//   });

/*post*/
router.post('/login_candidate',candidatecontroller.logincandidate);

router.post('/reg_candidate',candidatecontroller.registerCandidate );

router.post('/apply_jobs',tokenverify, candidatecontroller.applyJobs);




/*put*/

router.put('/update_candidate/:id', tokenverify, candidatecontroller.updateCandidate)
 
  

// router.put('/update_appliedJOB/:id', async function(req, res, next) {

//   const id=req.params.id;
//   console.log(req.params.id)
  
//   try {
//   let data = await job.findOneAndUpdate(req.params.id, req.body);
//   res.send("Job updated successfully" +data);
//   }catch(err) {
//   res.send("error during update the job" +err);
//   }
  
//   });

/*delete*/
router.post('/bulkupload', tokenverify, candidatecontroller.bulkupload);

router.delete('/delete_candidate/:id',candidatecontroller.deletecandidate);

// router.delete('/delete_appliedJOB/:id',async function(req, res, next) {

// let id=req.params.id;

// try{
// let err=await Admin.findByIdAndDelete(id);
// res.send("Deleted successfully")
// }catch(err){
// res.send("Couldn't delete" + err)

// }
    
//   });

module.exports = router;
  
  
  
  
  
  
  