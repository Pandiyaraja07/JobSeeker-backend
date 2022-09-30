const router = require("express").Router();
const tokenverify =require("../middleware/verifyCan")
const jobcontroller = require("../controller/jobcontroller")
const jobModel=require("../models/jobModel")





router.get('/view_jobs',tokenverify,jobcontroller.page(jobModel), jobcontroller.view_jobs );
    
    
  
router.get('/view_job/:id',tokenverify, jobcontroller.viewjob );

router.put('/update_jobs/:id',tokenverify,  jobcontroller.updateJob );

router.delete('/delete_jobs/:id',tokenverify,  jobcontroller.deleteJobs);

module.exports=router;

