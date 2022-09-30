var express = require('express');
const tokenverify =require("../middleware/verifyCan")
const job=require("../models/jobModel");
const interviews=require("../models/interview_scheduleModel");
var router = express.Router();
const admincontroller = require("../controller/admincontroller");

/* GET  */

router.get('/view_jobs',tokenverify, admincontroller.viewalljobs);

router.get('/view_job/:id',tokenverify, admincontroller.viewjob );

router.get('/view_candidates',tokenverify, admincontroller.viewallCandidate);

router.get('/view_candidate/:id',tokenverify, admincontroller.viewCandidate);

router.get('/view_interviews',tokenverify, admincontroller.viewallInterview);

router.get('/view_interview/:id',tokenverify, admincontroller.viewInterview );

router.get('/view_candidateInterviews/:id',tokenverify,admincontroller.view_candidateInterview);

/*Post*/


router.post('/reg_admin', admincontroller.registerAdmin );

router.post('/login_admin',admincontroller.loginadmin);

router.post('/add_jobs',tokenverify, admincontroller.addingJobs);

router.post('/add_Manyjobs',tokenverify, admincontroller.bulkupload);

router.post('/add_interview',tokenverify, admincontroller.addingInterview );

router.post('/add_candidate',tokenverify, admincontroller.addingcandidate);


/*Put*/

router.put('/update_job/:id',tokenverify, admincontroller.updatingJobs)
  

router.put('/update_interview/:id',tokenverify, admincontroller.updatingInterview )
    
  

/*delete*/

router.delete('/delete_job/:id',tokenverify, admincontroller.deletingJobs  );

router.delete('/delete_candidate/:id',tokenverify, admincontroller.deletingCandidate );

router.delete('/delete_interview/:id',tokenverify,  admincontroller.deletingInterviews );
  
  
module.exports = router;


