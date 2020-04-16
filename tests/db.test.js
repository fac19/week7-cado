const test = require("tape");
const build = require("../database/build");
const modelRuns = require("../model/runs");
const modelTeams = require("../model/teams");
const modelUsers = require("../model/users");

const db = require('../database/connection')


// test getTools()
test("Can get all user runs", t => {
    build().then(() => {
        modelRuns
        .getAllMyRuns(3)
        .then(result => {
            const distance = result[0].distance;
            t.equal(distance, '700', `distance ${distance} should equal 700`);
            t.end(); 
        })
        .catch(error => {
            t.error(error);
            t.end();
        })
    });
});



//   test("test name", t => {
//     build().then(() => {
//         testModel(input)
//         .then(result => {
//             t.equal();
//             t.end();
//         })
//         .catch(error => {
//             t.error(error);
//             t.end();
//         })
//     });
//   });


// See if tape is working 
test('Test to see if this runs', t => {
    t.equal(1, 1, '1 should equal 1')
    t.end()
    db.end();
  })