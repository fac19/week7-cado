const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const modelRuns = require("../model/runs");

dotenv.config();
const SECRET = process.env.JWT_SECRET;


function getAllMyRuns(req, res, next){
  const userId =  3;
  modelRuns
  .getAllMyRuns(userId)
  .then(runs => {
    // console.log("getAllMyRuns -> runs", runs)
    res.send(runs);
  })
  .catch(next);
}

function getRunsInDates(req, res, next) {
  const userId = 1
  const date1 = req.params.date1
  const date2 = req.params.date2
  modelRuns
  .getRunsInDates(userId, date1,date2)
  .then(runs => {
    res.send(runs);
  })
  .catch(next);
}

function getSpecificRun(req, res, next) {
  const runId = req.params.runId 
  modelRuns
  .getSpecificRun(runId)
  .then(run => {
  console.log("getSpecificRun -> run", run)
  res.send(run)  
  })
  .catch(next);
}

function createRun(req, res, next) {

}

function editRun(req, res, next) {

}

function deleteRun(req, res, next) {

}

module.exports = { 
  getAllMyRuns, 
  getRunsInDates, 
  getSpecificRun, 
  createRun, 
  editRun, 
  deleteRun 
}