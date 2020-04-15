const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const model = require("../model/users");

dotenv.config();
const SECRET = process.env.JWT_SECRET;

function createUser (req, res, next) {

}

function editUser (req, res, next) {

}

function deleteUser (req, res, next) {

}

function logIn (req, res, next) {

}





module.exports = {
    createUser,
    editUser,
    deleteUser,
    logIn
}