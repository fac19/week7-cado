const db = require('../database/connection')

function getAllMyRuns(id) {
  return db
    .query('SELECT * FROM runs WHERE id = ($1)', [id])
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

function createRun() {}
function editRun() {}
function deleteRun() {}

module.exports = {
  getAllMyRuns,
  getRunsInDates,
  getSpecificRun,
  createRun,
  editRun,
  deleteRun,
}
