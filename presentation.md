# Running API :runner: 

![running](https://media.giphy.com/media/1YI48cB3IHJJu/giphy.gif)

---

## A REST API that returns JSON data :bear:
An API where you can store your run data, join teams and set goals, and find run data between specific dates. 

---

## Warming up
Stretching out like our man Mo:

![mo](https://media1.giphy.com/media/3owyp1bdDJZQ2SWwI8/200.gif?cid=e1bb72ff5be3c4371509c1f56904875e3690fa56b90eb317&rid=200.gif)

---

![](https://i.imgur.com/pMJxGHX.png)

---

![](https://i.imgur.com/lxqxn5D.png)

---

![](https://i.imgur.com/p64ahFP.png)

---

![](https://i.imgur.com/6LWBlKw.png)

---

:monkey_face: 
![](https://i.imgur.com/oHt0RLG.png)


---

## Setting goals :giraffe_face: 
- Decided that we were going to run a half marathon when we'd signed up for the 10km
- "They decided not me" - Ako
- We agreed too many routes would be a better target than too few
- And why just do one to many tables when you can do many to many

---

## Hitting the wall :bear: 

![wall](https://media.giphy.com/media/xT8qBvH1pAhtfSx52U/giphy.gif)

---

- Initial testing: lot's of debugging to get through.
- PGUSERNAME and single '
- merge conflicts likely from the starting pistol

---


## Second wind & finding a good rhythm :monkey_face: 
- testing
- Postman
- queries

---

## Runners High
![runners](https://media1.giphy.com/media/3oFzm0GmYAiJ0F4tws/200.gif?cid=e1bb72ff7d34aabdf7a69e0c19d07a1d3b5b3d7e824a3d97&rid=200.gif)

---

## Hitting PBs 
### Linford Crispy & Jesse Owenisthisgonnaend:giraffe_face: 
How much work do you do for your client?

```javascript=
function getTeamMembersFromTeamName(req, res, next) {
  modelTeams.getAllFromTeamName(teamName) // STEP 1
  .then(result => modelTeams.getAllUsersFromTeam(teamId)) // STEP 2
      .then(userIds => modelUsers.getUserById(userIds)) // STEP 3
      .then('Create an array with all users') // STEP 4
      .catch(next)
  })
}
```

---

### Promises & Nested callbacks :giraffe_face: 
- Promises hate everyone (sometimes)

---

#### Question Time
```javascript=
function getTeamMembersFromTeamName(req, res, next) {
 modelTeams.getAllFromTeamName(teamName).then(result => {
 const teamId = result.id
 modelTeams.getAllUsersFromTeam(teamId)
  .then(results => {
    // We are creating an Array. But each db query is a PROMISE
    let usersDataPromiseArray = results.map(users => {
     return modelUsers.getUserById(users.user_id).then(result => {
        return result
      })
     })
// What method would we use to wait for all of our promises to fulfill?
```

---

```javascript=
// The Promise.all() Method!
Promise.all(usersDataPromiseArray).then(usersDataArray => {
          res.send(nameArray)
        })
      })
      .catch(next)
  })
}
```

---

`Promise.all(usersDataPromiseArray).then(Do something else)`

- Because the above is asyncronous we have to Promise.all() to use the result from our results.map
> The Promise.all() method returns a single Promise that fulfills when all of the promises passed as an iterable have been fulfilled - [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

---

- More complex db queries using dates
```javascript=
function getRunsInDates(userID, date1, date2) {
  return db.query
  ('SELECT * FROM runs WHERE user_id=($1) AND date BETWEEN ($2) AND ($3)',
}
```

---

### Bryan Claytabase :bear:
- making queries work
- focusing on making a helpful README
- potentially understanding what an API is

---

### Mo Farako :monkey:
- you don't need log out / you do need to set expiry
- Authorization :heavy_check_mark: 
- CI/CD 
- other reflections

---

## Post-run stretch :relaxed: :beers: 

![stretch](https://media.giphy.com/media/Up0tbonVHG7UNOQAmu/giphy.gif)

---

- issue with id not always being extracted properly
- server tests
- Join a team post sign up

---

- Update junction table when adding and removing users :giraffe_face: 

```json=
FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (team_id) REFERENCES books(id) ON UPDATE CASCADE ON DELETE CASCADE;
```

---

![](https://i.imgur.com/vxGNVme.png)



![](https://media0.giphy.com/media/1vh1PXneQqN1e/200.gif?cid=e1bb72ff6b1e6043da130dd63c9d752cae781313115c8b4d&rid=200.gif)

# Week 7 SGC
## Stop
- Mapping promises you can't keep

## Go
- Making sure every group is building a running app next week
- COVID19 project
- Finish
- Make sure code reviews issues are done before going back to original plans

## Continue
- Being....... LEGENDARY
	- Scrum Master :handshake: 
- miro and readmes
	- Smooth as silk planning and execution 
	- Focus on flow fom user perspective
- Amazing knowledge sharing
- Great debugging
- Celebrating victories
- working on a project

![Barney](https://media1.giphy.com/media/PjWCuIvrwBL8s/200.gif?cid=e1bb72ff6b1e6043da130dd63c9d752cae781313115c8b4d&rid=200.gif)

---

## Week 7 Minutes

## G
- Jack: yes we will need to ensure that everyone succeeds. We are CADO

- Ako: I want to enforce the same idea that we didn't start building in Week 5. Anyone interested? We are CADO

- Finish stopping or stop finishing? You decide. Double negative city.

- Jack: Great point on doing the code review issues before craking on with what you're interested in.  


## C
- Joe: Jack did really good job of being SM especially in the beginning focusing on how we are meeting the acceptability criteria befire going into granular details.  

- Ako & Jack: Doc driven development for API is really powerful. Really good to use this going forward always. 

- User driven design. As a user what do I want to experience. Powerful starting point 

- Joe: Quite touched when everyone puts what they are doing to one side to share knowledge, summed up by code review and going through authentication stuff together and mobbing 

- Jack: really good to use debugging modules. 
	- Action: Jack to put resource in Slack.

- Jack: Great idea to make a log of breakthrough moments so we don't forget them in future (like with the E.Variables)

- Ako: Would be great to work on projects together after FAC19.
