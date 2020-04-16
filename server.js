const express = require('express')

// Handler modulles
const runs = require("./handlers/runs")
const users = require("./handlers/users")
const teams = require("./handlers/teams") 

// Middleware
const handleError = require('./middleware/error');
// const getUser = require("./middleware/getUser");
const authorize = require("./middleware/authorize");
const logger = require("./middleware/logger");

const PORT = process.env.PORT || 3000

const server = express()
server.use(express.json());
<<<<<<< HEAD
// server.use(getUser);
server.use(logger);

// Request handling
// GET
server.get("/users/runs/", runs.getAllMyRuns)
// server.get("/users/runs/:date1/:date2", runs.getRunsInDates)
// server.get("/users/runs/:date", runs.getSpecificRun)
=======
server.use(logger)
 
// Request handling
// GET
// server.get("/users/:userid/runs/", runs.getAllMyRuns)
// server.get("/users/:userid/runs/:date1/:date2", runs.getRunsInDates)
// server.get("/users/:userid/runs/:date", runs.getSpecificRun)
>>>>>>> f6c121d3ad80ebaf0bc82de06fc315f3db53f14d
// server.get("/teams", teams.getAllTeams)
// server.get("/teams/:teamid", teams.getTeam)

// POST
<<<<<<< HEAD
// server.post("/login", users.logIn)
=======
server.post("/login", users.logIn)
>>>>>>> f6c121d3ad80ebaf0bc82de06fc315f3db53f14d
// server.post("/create/:user", users.createUser)
// server.post("/create/:team", authorize, teams,createTeam)
// server.post("/create/:run", authorize, runs.createRun)

// PUT
// server.put('/update/runs/:id', authorize, runs.editRun)
// server.put('/update/users/:id', authorize, users.editUser)
// server.put('/update/teams/:id', authorize, teams.editTeam)


<<<<<<< HEAD
// DELETE
=======
// DELETE 
>>>>>>> f6c121d3ad80ebaf0bc82de06fc315f3db53f14d
// server.delete('/delete/runs/:id', authorize, runs.deleteRun)
// server.delete('/delete/users/:id', authorize, users.deleteUser)
// server.delete('/delete/teams/:id', authorize, teams.deleteTeam)


server.use(handleError)

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
