const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const model = require("../model/users");
const bcrypt = require("bcryptjs")

dotenv.config();
const SECRET = process.env.JWT_SECRET;

function createUser (req, res, next) {
    const username = req.body.username
    const email = req.body.email
    const password =req.body.password
    bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt) )
        .then(hash => model.createUser({username, email, password: hash}))
        .then((user) => {
            const token = jwt.sign({ user: user.id }, SECRET, { expiresIn: "1h" });
            res.status(201).send({access_token: token});    
        })
        .catch(next)
}

function editUser (req, res, next) {

}

function deleteUser (req, res, next) {

}


function logIn (req, res, next) {
    const email = req.body.email
    const password = req.body.password

    model
    .getUser(email)
    .then(user => {
        bcrypt.compare(password, user.password)
        .then(match => {
            if(!match) {
                const error = new Error("Unauthorized")
                error.status = 401
                next(error)
            } else {
                const token = jwt.sign({user: user.id}, SECRET, {expiresIn: "1h"})
                res.status(200).send({ access_token: token})
            }

            })
        })
        .catch(next)
}




module.exports = {
    createUser,
    editUser,
    deleteUser,
    logIn
}