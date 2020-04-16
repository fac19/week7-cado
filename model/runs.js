const db = require('../database/connection')

function getAllMyRuns(id) {
  return db.query("SELECT * FROM runs WHERE id = ($1);",[id]).then(result => result.rows);
}

function getRunsInDates() {

}
function getSpecificRun() {

}
function createRun() {

}
function editRun() {

}
function deleteRun() {

}

module.exports = { 
  getAllMyRuns, 
  getRunsInDates, 
  getSpecificRun, 
  createRun, 
  editRun, 
  deleteRun 
}