const jwt = require('jsonwebtoken');
const candidateModel = require('../models/candidateModel');
const Admin = require('../models/adminModel');
const { logger } = require('../helpers/logger');

module.exports = async function (req, res, next) {
  let token = req.header('Authorization');
  token = token?.replace(/^"(.*)"$/, '$1') || null;
  if (!token)
    return res.status(401).send('Access Denied UnAuthorized Access Request');
  try {
    logger.log('Check Authorization');
    const verified = jwt.verify(token, 'secretkey');
    const admin = await Admin.findById(verified._id);
    if (admin) {
      req.role = 'admin';
      console.log('Logged in As Admin...');
    } else {
      const candidate = await candidateModel.findById(verified._id);
      if (candidate) {
        req.role = 'candidate';
        logger.log('Logged in As Candidate...');
      }
    }
    // console.log(verified)
    req.user = verified._id;

    next();
  } catch (err) {
    logger.error(err.message);
    res.status(400).send('Invalid Token');
  }
};
