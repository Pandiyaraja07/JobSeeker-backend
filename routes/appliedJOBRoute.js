
const router = require("express").Router();
const appliedJOBcontroller = require("../controller/appliedJOBcontroller")
const verifyCand = require("../middleware/verifyCan");

router.get('/view_appliedJOB/:id',appliedJOBcontroller.ViewAppliedJob);
router.get('/view_AllAppliedJOB',verifyCand,appliedJOBcontroller.ViewAllAppliedJobs)

router.delete('/delete_appliedJOB/:id',appliedJOBcontroller.DeleteAppliedJOB);