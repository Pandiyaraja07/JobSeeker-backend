const Admin = require('../models/adminModel');
const Job = require('../models/jobModel');
const candidate = require('../models/candidateModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const interview = require('../models/interview_scheduleModel');
const interview_scheduleModel = require('../models/interview_scheduleModel');

exports.viewalljobs = async (req, res) => {
  if (req.role === 'admin') {
    try {
      const jobs = await Job.find();
      res.json(jobs);
    } catch (err) {
      res.send('Error: ' + err);
    }
  } else res.send('Access denied');
};

//To see Job using id

exports.viewjob = async (req, res) => {
  if (req.role === 'admin') {
    const id = req.params.id;
    try {
      const jobs = await Job.findById(id);
      res.json(jobs);
    } catch (err) {
      res.send('Error: ' + err);
    }
  } else res.send('Access denied');
};

//To see All the candidate

exports.viewallCandidate = async (req, res) => {
  if (req.role === 'admin') {
    try {
      let candidates = await candidate.find().select('-password');
      console.log(candidates);
      res.json(candidates);
    } catch (err) {
      res.send('Error: ' + err);
      console.log(err);
    }
  } else res.send('Access denied');
};

//To see the candidate using id

exports.viewCandidate = async (req, res) => {
  if (req.role === 'admin') {
    let id = req.params.id;
    try {
      const candidates = await candidate.findById(id);
      res.json(candidates);
    } catch (err) {
      res.send('Error: ' + err);
    }
  } else res.send('Access denied');
};

//To see the all the interviews

exports.viewallInterview = async (req, res) => {
  if (req.role === 'admin') {
    try {
      const view_interview = await interview.find();
      res.json(view_interview);
    } catch (err) {
      res.send('Error: ' + err);
    }
  } else res.send('Access denied');
};

//To see the Interview using id

exports.viewInterview = async (req, res) => {
  if (req.role === 'admin') {
    const id = req.params.id;
    try {
      const view_candidate = await interview.findById(id);
      res.json(view_candidate);
    } catch (err) {
      res.send('Error: ' + err);
    }
  } else res.send('Access denied');
};

//To see the separate candidate interview using candidate_id

exports.view_candidateInterview = async (req, res) => {
  if (req.role === 'admin') {
    const id = req.params.id;
    try {
      const view_candidate = await interview.find({
        candidate_id: req.params.id,
      });
      res.json(view_candidate);
    } catch (err) {
      res.send('Error: ' + err);
    }
  } else res.send('Access denied');
};

//To add the jobs

exports.addingJobs = async (req, res) => {
  if (req.role === 'admin') {
    try {
      let add_jobs = new Job(req.body);
      let add_jobssave = await add_jobs.save();
      res.json(add_jobssave).status(201);
    } catch (err) {
      res.send("couldn't add" + err);
      console.log(err);
    }
  } else res.send('Access denied');
};

//To add candidate

exports.addingcandidate = async (req, res) => {
  if (req.role === 'admin') {
    try {
      let add_candidate = new candidate(req.body);
      let add_candidatesave = await add_candidate.save();
      res.json(add_candidatesave).status(201);
    } catch (err) {
      res.send("couldn't add" + err);
      console.log(err);
    }
  } else res.send('Access denied');
};

//To add Interview

exports.addingInterview = async (req, res) => {
  if (req.role === 'admin') {
    try {
      let add_interview = new interview(req.body);
      let add_interviewsave = await add_interview.save();
      res.json(add_interviewsave).status(201);
    } catch (err) {
      res.send("couldn't add" + err);
      console.log(err);
    }
  } else res.send('Access denied');
};

//To update jobs using id

exports.updatingJobs = async (req, res) => {
  if (req.role === 'admin') {
    const id = req.params.id;
    console.log(req.params.id);

    try {
      let data = await Job.findOneAndUpdate(req.params.id, req.body);
      res.send('Job updated successfully' + data);
    } catch (err) {
      res.send('error during update the job' + err);
    }
  } else res.send('Access denied');
};

//To update interview using id

exports.updatingInterview = async (req, res) => {
  if (req.role === 'admin') {
    const id = req.params.id;
    console.log(id);

    try {
      let data = await interviews.findOneAndUpdate(req.params.id, req.body);
      res.send('Interview updated successfully' + data);
    } catch (err) {
      res.send('Error during update the interview' + err);
    }
  } else res.send('Access denied');
};

//To delete job using id

exports.deletingJobs = async (req, res) => {
  if (req.role === 'admin') {
    let id = req.params.id;

    try {
      let err = await Job.findByIdAndDelete(id);
      res.send('job Deleted successfully');
    } catch (err) {
      res.send('error during job deletion' + err);
    }
  } else res.send('Access denied');
};

//To delete candidate using id

exports.deletingCandidate = async (req, res) => {
  if (req.role === 'admin') {
    let id = req.params.id;

    try {
      let err = await candidate.findByIdAndDelete(id);
      res.send(' candidate Deleted successfully');
    } catch (err) {
      res.send('error during candidate deletion' + err);
    }
  } else res.send('Access denied');
};

//To delete interview using id

exports.deletingInterviews = async (req, res) => {
  if (req.role === 'admin') {
    let id = req.params.id;

    try {
      let err = await interviews.findByIdAndDelete(id);
      res.send('interview Deleted successfully');
    } catch (err) {
      res.send('error during interview deletion' + err);
    }
  } else res.send('Access denied');
};

//To register Admin

exports.registerAdmin = async function (req, res, next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log('hashed: ' + hashedPassword);

  const user = new Admin({
    user_name: req.body.user_name,

    password: hashedPassword,
  });
  console.log('user: ' + user);

  try {
    console.log(req.body);
    const savedUser = await user.save();
    console.log(savedUser);
    res.send(savedUser);
    res.end();
  } catch (err) {
    res.status(400).send(err);
  }
};

//To loginadmin

exports.loginadmin = async (req, res) => {
  try {
    const user = await Admin.findOne({ user_name: req.body.user_name });
    if (!user) return res.status(400).send("User_name doesn't exist");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');
    else {
      const token = jwt.sign({ _id: user._id }, 'secretkey');
      res.json({ user_name: user.user_name, accesstoken: token });
    }
  } catch (err) {
    console.log('Error login: ' + err);
    res.status(400).send('invalid credential');
  }
};

// Bulkupload

exports.bulkupload = async (req, res) => {
  if (req.role === 'admin') {
    console.log(req.body);
    console.log(req.role);
    if (Array.isArray(req.body)) {
      req.body.forEach(async (element) => {
        const newjobs = new Job(element);

        try {
          const savejobs = await newjobs.save();
          res.end('Bulk Upload successfully completed');
        } catch (err) {
          console.log(err);
          res.end();
        }
      });
    }
  } else res.send('Access denied 123');
};
