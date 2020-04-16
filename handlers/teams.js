const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const modelTeams = require("../model/teams");

dotenv.config();
const SECRET = process.env.JWT_SECRET;


function getAllTeams(req, res, next) {

}
function getTeam(req, res, next) {

}

function createTeam(req, res, next){
    const name = req.params.team;
    const distance = req.params.distance
    const user = req.user
    modelTeams
    .createTeam({name, distance, user})
    .then(() => {
        res.status(201).send({message:`team ${name} created`});
    })
    .catch(next)
}


function editTeam(req, res, next) {
    const name = req.params.team;

    modelTeams
    .editTeam(name, req.body)
    .then(newTeam=>{
        res.status(200).send({"message" : `${name} updated`});
    })
    .catch(next)
}

function deleteTeam(req, res, next) {
  const team_name = req.params.team
  modelTeams.deleteTeam(team_name)
    .then(() => {
      res.status(204).send()
    })
    .catch(next)
}

module.exports = {
  getAllTeams,
  getTeam,
  createTeam,
  editTeam,
  deleteTeam
}