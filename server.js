const express = require('express')

// Handler modulles
const runs = require('./handlers/runs')
const users = require('./handlers/users')
const teams = require('./handlers/teams')

// Middleware
const handleError = require('./middleware/error')
// const getUser = require("./middleware/getUser");
const authorize = require('./middleware/authorize')
const logger = require('./middleware/logger')

const PORT = process.env.PORT || 3000;

const server = express()
server.use(express.json())
// server.use(getUser);
server.use(logger)

// Request handling
// GET
server.get('/users/runs/', authorize, runs.getAllMyRuns)
server.get('/users/runs/:date1/:date2', authorize, runs.getRunsInDates)
server.get('/users/runs/:runId', runs.getSpecificRun)
server.get("/teams", teams.getAllTeams)
server.get('/teams/:teamName', teams.getTeamMembersFromTeamName)

// POST
server.post('/user', users.createUser)
server.post('/login', users.logIn)
server.post('/team/:team/:distance', authorize, teams.createTeam)
server.post("/run", authorize, runs.createRun)

// PUT
server.put('/runs/:id', authorize, runs.editRun)
// server.put('/update/users/:id', authorize, users.editUser)
server.put('/team/:team', authorize, teams.editTeam)

// DELETE
server.delete('runs/:id', authorize, runs.deleteRun)
// server.delete('/delete/users/:id', authorize, users.deleteUser)
server.delete('/team/:team', authorize, teams.deleteTeam)

server.use(handleError)

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
