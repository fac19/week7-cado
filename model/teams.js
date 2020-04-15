const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const model = require("../model/runs");

dotenv.config();
const SECRET = process.env.JWT_SECRET;


function getAllTeams(req, res, next) {

}
function getTeam(req, res, next) {

}
function createTeam(req, res, next) {

}
function editTeam(req, res, next) {

}
function deleteTeam(req, res, next) {

}

module.exports = {
  getAllTeams,
  getTeam,
  createTeam,
  editTeam,
  deleteTeam
}