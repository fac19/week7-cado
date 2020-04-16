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
  const userId =  1;
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
  res.send(run)  
  })
  .catch(next);
}

function getTeamMembersFromTeamName(req, res, next){
  const teamName = req.params.teamName
  modelRuns
    .getAllFromTeamName(teamName)
    .then((result) => {
      const teamId = result.id;
      modelRuns
        .getAllUsersFromTeam(teamId)
        .then((results) => {
          let usersDataPromiseArray = results.map((users) => {
            return modelUsers.getUserById(users.user_id).then((result) => {
              return result;
            });
          });
          Promise.all(usersDataPromiseArray).then((usersDataArray) => {
            res.send(userDataArray)
          });
        })

    .catch(next)
    });
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
  getTeamMembersFromTeamName,
  createRun, 
  editRun, 
  deleteRun 
}