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
    const email = req.body.email
    const password = req.body.password
    model.getUser(email)
        .then(user => {
            if(password != user.password) {
                const error = new Error("Unauthorized")
                error.status = 401
                next(error)
            } else {
                const token = jwt.sign({user: user.id}, SECRET, {expiresIn: "1h"})
                res.status(201).send({access_token: token})
            }
        })
}

function logOut (req, res, next) {

}





module.exports = {
    createUser,
    editUser,
    deleteUser,
    logIn
}