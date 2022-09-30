var express = require('express');
var router = express.Router();

const interview_schedulecontroller = require("../controller/interview_schedulecontroller")



router.post('/add_Schedules',interview_schedulecontroller.addInterview );

/* GET users listing. */


router.get('/view_Schedules',interview_schedulecontroller.viewAllSchedule );



router.get('/view_Schedules/:id',interview_schedulecontroller.viewSchedule );

router.put('/update_Schedules/:id',interview_schedulecontroller.UpdateInterview);

router.delete('/delete_Schedules/:id',interview_schedulecontroller.deleteInterview );


module.exports = router;
