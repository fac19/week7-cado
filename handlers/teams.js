const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const modelTeams = require('../model/teams')
const modelUsers = require('../model/users')

dotenv.config()
const SECRET = process.env.JWT_SECRET

function getTeamMembersFromTeamName(req, res, next) {
  const teamName = req.params.teamName
  modelTeams.getAllFromTeamName(teamName).then(result => {
    const teamId = result.id
    modelTeams
      .getAllUsersFromTeam(teamId)
      .then(results => {
        let usersDataPromiseArray = results.map(users => {
          return modelUsers.getUserById(users.user_id).then(result => {
            return result
          })
        })
        Promise.all(usersDataPromiseArray).then(usersDataArray => {
          res.send(usersDataArray)
        })
      })
      .catch(next)
  })
}

function getTeam(req, res, next) {}

function createTeam(req, res, next) {
  const name = req.params.team
  const distance = req.params.distance
  const user = req.user
  modelTeams
    .createTeam({ name, distance, user })
    .then(() => {
      res.status(201).send({ message: `thanks ${user_id} team ${name} created` })
    })
    .catch(next)
}

function editTeam(req, res, next) {
  const name = req.params.team
  modelTeams
    .editTeam(name, req.body)
    .then(newTeam => {
      res.status(200).send({ message: `${name} updated` })
    })
    .catch(next)
}


function getAllTeams(req, res, next) {
  modelTeams.getAllTeams()
  .then(teams => {
    res.send(teams)
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

function deleteTeam(req, res, next) {}

module.exports = {
  getTeamMembersFromTeamName,
  getTeam,
  createTeam,
  editTeam,
  getAllTeams,
  deleteTeam,
}
