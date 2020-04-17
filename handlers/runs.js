const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const modelRuns = require('../model/runs')

dotenv.config()
const SECRET = process.env.JWT_SECRET

function getAllMyRuns(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new Error("Authorization header required");
    error.status = 400;
    next(error);
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const data = jwt.verify(token, SECRET);
    modelRuns
    .getAllMyRuns(data.user)
    .then(runs => {
      res.send(runs)
    })
    .catch(next)
  } catch (_error) {
    const error = new Error("Invalid token");
    error.status = 401;
    next(error);
  }
}

function getRunsInDates(req, res, next) {
  const authHeader = req.headers.authorization;
  const date1 = req.params.date1
  const date2 = req.params.date2

  if (!authHeader) {
    const error = new Error("Authorization header required");
    error.status = 400;
    next(error);
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const data = jwt.verify(token, SECRET);
     modelRuns
    .getRunsInDates(data.user, date1, date2)
    .then(runs => {
      res.send(runs)
    })
    .catch(next)
  } catch (_error) {
    const error = new Error("Invalid token");
    error.status = 401;
    next(error);
  }
}

function getSpecificRun(req, res, next) {
  const runId = req.params.runId
  modelRuns
    .getSpecificRun(runId)
    .then(run => {
      res.send(run)
    })
    .catch(next)
}

function createRun(req, res, next) {
  const runData = req.body;
    modelRuns.createRun(runData)
    .then(() =>{
      res.status(201).send({ message: `Run on ${runData.date} @ ${runData.start_time} created` })
    })
}

function editRun(req, res, next) {}

function deleteRun(req, res, next) {}

module.exports = {
  getAllMyRuns,
  getRunsInDates,
  getSpecificRun,
  createRun,
  editRun,
  deleteRun,
}
