const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const modelRuns = require('../model/runs')

dotenv.config()
const SECRET = process.env.JWT_SECRET

function getAllMyRuns(req, res, next) {
  const user = req.user 
  console.log("getAllMyRuns -> user", user)
    modelRuns
    .getAllMyRuns(user.id)
    .then(runs => {
      res.send(runs)
    })
    .catch(next)
}

function getRunsInDates(req, res, next) {
  const date1 = req.params.date1
  const date2 = req.params.date2
  const user = req.user

  modelRuns
  .getRunsInDates(user.id, date1, date2)
  .then(runs => {
    res.send(runs)
  })
  .catch(next)
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
  const user = req.user;
    modelRuns.createRun(user, runData)
    .then(() =>{
      res.status(201).send({ message: `Run on ${runData.date} @ ${runData.start_time} created` })
    })
}

function editRun(req, res, next) {
  const runId = req.params.id
  modelRuns
  .editRun(runId, req.body)
  .then(() => {
    res.status(200).send({ message: `run ${runId} updated` })
  })
  .catch(next)
}

function deleteRun(req, res, next) {}

module.exports = {
  getAllMyRuns,
  getRunsInDates,
  getSpecificRun,
  createRun,
  editRun,
  deleteRun,
}
