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
  return db
    .query(
      'INSERT INTO runs (user_id, distance, start_time, end_time, date) VALUES ($1, $2, $3, $4, $5)', // @James Error was typo! 'INTO runs' was 'INTO run'
      [user.id, runData.distance, runData.start_time, runData.end_time, runData.date],
    )
    .catch(err => err)
}

function editRun(idRun, runData) {
  return db
    .query(
      'UPDATE runs SET distance = ($1), start_time = ($2), end_time = ($3), date = ($4) WHERE id = ($5)',
      [runData.distance, runData.start_time, runData.end_time, runData.date, idRun],
    )
    .catch(err => err)
}
function deleteRun(runId) {
  return db.query("DELETE FROM runs WHERE id=($1)", [runId])
  .catch(err => err)
}

module.exports = {
  getAllRuns, // New query 
  getAllMyRuns,
  getRunsInDates,
  getSpecificRun,
  createRun,
  editRun,
  deleteRun,
}
