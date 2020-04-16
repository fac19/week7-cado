const db = require("../database/connection");

function createTeam(team){
  return db.query("INSERT INTO teams (team_name, goal_distance, captain) VALUES ($1, $2, $3)", [team.name, team.distance, team.user.id])
  .catch(err => err);
}

function editTeam(name, newTeam){
  console.log(name, newTeam)
  return db.query("UPDATE teams SET team_name = ($1), goal_distance = ($2) WHERE team_name = ($3)", [newTeam.team_name, newTeam.goal_distance, name])
  .catch(err => err);
}

function deleteTeam(team_name) {
  return db.query("DELETE FROM teams WHERE team_name=($1)", [team_name])
  .catch(err => err)
}

module.exports = { createTeam, editTeam, deleteTeam }