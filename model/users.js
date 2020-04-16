const db = require("../database/connection");

function createUser(user) {

}

function editUser(user) {

}

function deleteUser(user) {

}

function getUser(email) {
  return db.query("SELECT * FROM users WHERE email=($1)", [email])
        .then(user => user.rows[0])
        .catch(error => console.error(error))
}

function getUserById(id) {
  return db.query("SELECT * FROM users WHERE id=($1)", [id])
        .then(user => user.rows[0])
        .catch(error => console.error(error))
}

module.exports = {
    createUser,
    editUser,
    deleteUser,
    getUser,
    getUserById
}