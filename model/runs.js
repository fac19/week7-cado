const db = require('../database/connection')

function getAllRuns() {
  return db
    .query('SELECT * FROM runs')
    .then(result => result.rows)
    .catch(error => console.error(error))
}

function getAllMyRuns(id) {
  return db
    .query('SELECT * FROM runs WHERE user_id = ($1)', [id])
    .then(result => result.rows)
    .catch(error => console.error(error))
}

function getRunsInDates(userID, date1, date2) {
  return db
    .query(
      'SELECT * FROM runs WHERE user_id=($1) AND date BETWEEN ($2) AND ($3)',
      [userID, date1, date2],
    )
    .then(results => results.rows)
    .catch(error => console.error(error))
}
function getSpecificRun(runId) {
  return db
    .query('SELECT * FROM runs WHERE id = ($1);', [runId])
    .then(result => result.rows[0])
    .catch(error => console.error(error))
}

function createRun(user, runData) {
  console.log("createRun -> runData", runData)
  console.log("createRun -> user", user)
  return db
    .query(
      'INSERT INTO runs (user_id, distance, start_time, end_time, date) VALUES ($1, $2, $3, $4, $5)', // @James Error was typo! 'INTO runs' was 'INTO run'
      [user.id, runData.distance, runData.start_time, runData.end_time, runData.date],
    )
    .catch(err => err)
}

function editRun() {}
function deleteRun() {}

module.exports = {
  getAllRuns, // New query 
  getAllMyRuns,
  getRunsInDates,
  getSpecificRun,
  createRun,
  editRun,
  deleteRun,
}
