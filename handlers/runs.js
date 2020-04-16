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
    console.log("getAllMyRuns -> runs", runs)
    res.send(runs);
  })
  .catch(next);
}

function getRunsInDates(req, res, next) {

}

function getSpecificRun(req, res, next) {

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