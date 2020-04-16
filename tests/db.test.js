const test = require("tape");
const build = require("../database/build");
const modelRuns = require("../model/runs");
const modelTeams = require("../model/teams");
const modelUsers = require("../model/users");

const db = require("../database/connection");

// test getTools()
test("Can get all user runs", (t) => {
  build().then(() => {
    modelRuns
      .getAllMyRuns(3)
      .then((result) => {
        const distance = result[0].distance;
        t.equal(distance, "700", `distance ${distance} should equal 700`);
        t.end();
      })
      .catch((error) => {
        t.error(error);
        t.end();
      });
  });
});

test("Want to get run by the run_id ", (t) => {
  build().then(() => {
    modelRuns
      .getSpecificRun(8)
      .then((result) => {
        const lengthArr = Object.keys(result).length;
        const distance = result.distance;
        t.equal(
          lengthArr,
          6,
          `length of object should be 6 and is ${lengthArr}`
        );
        t.equal(
          distance,
          "1200",
          `Distance should equal "1200" and is ${distance}`
        );
        t.end();
      })
      .catch((error) => {
        t.error(error);
        t.end();
      });
  });
});

test("Want to get run between 2 dates ", (t) => {
  const userID = 1;
  build().then(() => {
    modelRuns
      .getRunsInDates(userID, "2020-01-01", "2020-03-08")
      .then((result) => {
        const firstRes = result[0];
        const lastRes = result[result.length - 1];
        t.equal(
          firstRes.distance,
          "500",
          `distance of the first run for user ${userID} should be 500`
        );
        t.equal(
          lastRes.distance,
          "800",
          `distance of the last run for user ${userID} should be 700`
        );

        t.end();
      })
      .catch((error) => {
        t.error(error);
        t.end();
      });
  });
});

test("Want to get the id of the team by the teamName ", (t) => {
  const teamName = "Tigers";
  build().then(() => {
    modelTeams
      .getAllFromTeamName(teamName)
      .then((results) => {
        const teamId = results.id;
        const teamCaptain = results.captain;
        const teamGoal = results.goal_distance;
        t.equal(teamId, 3, `${teamName} id should be 3 and is ${teamId}`);
        t.equal(
          teamCaptain,
          1,
          `${teamName} captain should be 1 and is ${teamCaptain}`
        );
        t.equal(
          teamGoal,
          900,
          `${teamName} distance should be 900 and is ${teamGoal}`
        );
        t.end();
      })
      .catch((error) => {
        t.error(error);
        t.end();
      });
  });
});

test("Want to get all of the members of a specific team by the teamName ", (t) => {
  const teamId = 2;
  build().then(() => {
    modelTeams
      .getAllUsersFromTeam(2)
      .then((result) => {
        const firstResult = result[0];
        const lastResult = result[result.length - 1];
        t.equal(
          firstResult.user_id,
          4,
          `First user should be 4 and is ${firstResult.user_id}`
        );
        t.equal(
          lastResult.user_id,
          9,
          `First user should be 9 and is ${lastResult.user_id}`
        );
        t.end();
      })
      .catch((error) => {
        t.error(error);
        t.end();
      });
  });
});

test("Want to get users from the userId", (t) => {
  const userId = 3;
  build().then(() => {
    modelUsers
      .getUserById(userId)
      .then((result) => {
        t.equal(
          result.username,
          "userC1",
          `Third user should be "userC1" and is ${result.username}`
        );
        t.end();
      })
      .catch((error) => {
        t.error(error);
        t.end();
      });
  });
});

test("I want to get all userNames from a teamName", (t) => {
  build()
    .then(() => {
    modelTeams
    .getAllFromTeamName("Tigers") // We are using the team name to get all the data for that team
    .then((result) => {
        const teamId = result.id;
        modelTeams
        .getAllUsersFromTeam(teamId) // We are using the team id to get all of the users in that team
        .then((results) => {
            let usersDataPromiseArray = results.map((users) => {
            // We now have the users from the team we want. We now want to create an array with each of thei
            return modelUsers.getUserById(users.user_id).then((result) => {
                return result;
            });
            });
            Promise.all(usersDataPromiseArray).then((usersDataArray) => {
            t.equal(usersDataArray.length, 3, `team should have 3 members" and has ${usersDataArray.length} members`);
            t.equal(usersDataArray[0].username, "userE23", `First user should be "userE23" and is ${usersDataArray[0].username}`);
            t.equal(usersDataArray[1].username, "userG3", `First user should be "userG3" and is ${usersDataArray[1].username}`);
            t.equal(usersDataArray[2].username, "userH3", `First user should be "userH3" and is ${usersDataArray[2].username}`);
            t.end();
            });
        });
    });
  })  
    .catch((error) => {
      t.error(error);
      t.end();
    });
});

test("Get can all teams", (t) => {
  build().then(() => {
    modelTeams
      .getAllTeams()
      .then((result) => {
        const firstResult = result[0];
        const lastResult = result[result.length - 1];
        t.equal(firstResult.team_name, 'Monkeys', `First team name should be "Monkeys" and is ${firstResult.team_name}`);
        t.equal(lastResult.team_name, 'Trees', `Last team name should be "Trees" and is ${lastResult.team_name}`);
        t.end();
      })
      .catch((error) => {
        t.error(error);
        t.end();
      });
  });
});

test("Create a new run", (t) => {
  const runData = {
    user_id: 1,
    distance : 1700,
    start_time: "00:00:00",
    end_time : "00:00:40",
    date: "2020-02-03"
 }
 
  build().then(() => {
    modelRuns
      .createRun(runData)
      .then(() => {
        modelRuns.getAllRuns()
        .then(runs => {
        t.equal(runs.length, 11, `Number of runs should be 11 and is ${runs.length}`);
        t.end();          
        })
      })
      .catch((error) => {
        t.error(error);
        t.end();
      });
  });
});

// See if tape is working
test("Test to see if this runs", (t) => {
  t.equal(1, 1, "1 should equal 1");
  t.end();
  db.end();
});
