const db = require('../database/connection')

function createTeam(team) {
  return db
    .query(
      'INSERT INTO teams (team_name, goal_distance, captain) VALUES ($1, $2, $3)',
      [team.name, team.distance, team.user.id],
    )
    .catch(err => err)
}

function editTeam(name, newTeam) {
  console.log(name, newTeam)
  return db
    .query(
      'UPDATE teams SET team_name = ($1), goal_distance = ($2) WHERE team_name = ($3)',
      [newTeam.team_name, newTeam.goal_distance, name],
    )
    .catch(err => err)
}

function getAllFromTeamName(teamName) {
  return db
    .query('SELECT * FROM teams WHERE team_name = ($1)', [teamName])
    .then(result => result.rows[0])
    .catch(error => console.error(error))
}

function getAllUsersFromTeam(teamId) {
  return db
    .query('SELECT * from users_teams WHERE team_id = ($1);', [teamId])
    .then(result => result.rows)
    .catch(error => console.error(error))
}

function getAllTeams() {
  return db
    .query('SELECT * from teams')
    .then(result => result.rows)
    .catch(error => console.error(error))
}

module.exports = {
  createTeam,
  editTeam,
  getAllFromTeamName,
  getAllUsersFromTeam,
  getAllTeams
}
