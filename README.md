
# Running With Friends
Week 7
[initial Miro design](https://miro.com/welcomeonboard/b0542lDJjZSaQGsh7tgFvD6QeRYynEkgBlNKPbeW3k6dXzTASAV1N0NR3TZbXVdE)

## Project description
We Created and API where you can store and access data regarding your runs and running teams you are part of. Please read the API routes section for info on how to access the data.

To access most of the routes you will need to create a user in the POST section to get the jwt token.

## Set up instructions

**NB wherever we refer to '`myuser`' and '`mypassword`', this needs to be set to your preferred local superuser if you have one, otherwise it can be set up in the following way in SQL (executing `$ psql` in your terminal)**

```sql
CREATE USER myuser WITH PASSWORD 'mypassword';
ALTER USER myuser WITH SUPERUSER;
```

1. Clone this repo
2. Run `npm i` on your terminal to install dependencies
3. Create a `.env` file in the root folder with the following inside:

```
PGDATABASE=week7cado_db
PGUSER=myuser
PGPASSWORD=mypassword
JWT_SECRET=mysecret
```

4. Initialise the dev and test databases:

```
CREATE DATABASE week7cado_db WITH OWNER myuser;
CREATE DATABASE week7cado_test_db WITH OWNER myuser;
\c week7cado_db;
\i database/init.sql;
\c week7cado_test_db;
\i database/init.sql;
```

5. Ensure the test script in package.json refers to your local test database, i.e. 

```json
"scripts": {
    "test": "tape PGDATABASE=week7cado_test_db | tap-spec",
    ...
    }
```

6. Run `npm test` to run tests
7. Run `npm run dev` to start development server
8. If you are having issues with anything related to accessing the databases you have created, you may need to grant privileges:
   * `GRANT ALL PRIVILEGES ON DATABASE week7cado_db TO myuser;`
   * `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myuser;`



## API routes you can access
### GET 

`GET` - `https://week7-cado.herokuapp.com/users/runs/`

> Once signed in, you can request your runs. [Example URL](https://week7-cado.herokuapp.com/users/runs/) NOTE: This may only work on POSTMAN
```json
// Response
{
  "id": 3,
  "user_id": 1,
  "distance": "700",
  "start_time": "00:00:00",
  "end_time": "00:30:00",
  "date": "2020-02-03T00:00:00.000Z"
}
```

---

`GET` - `https://week7-cado.herokuapp.com/users/runs/:date1/:date2`

> Once signed in, you can request your runs between certain dates. [Example URL](https://week7-cado.herokuapp.com/users/runs/2020-01-01/2020-04-15) NOTE: This may only work on POSTMAN
```json 
// Response
{
  "id": 3,
  "user_id": 1,
  "distance": "700",
  "start_time": "00:00:00",
  "end_time": "00:30:00",
  "date": "2020-02-03T00:00:00.000Z"
}
```

---

`GET` - `https://week7-cado.herokuapp.com/users/runs/:runId`

> You can request a specific run by its id. [Example URL](https://week7-cado.herokuapp.com/users/runs/2)
```json 
// Response
{
  "id": 3,
  "user_id": 1,
  "distance": "700",
  "start_time": "00:00:00",
  "end_time": "00:30:00",
  "date": "2020-02-03T00:00:00.000Z"
}
```
---

`GET` - `https://week7-cado.herokuapp.com/teams`

> You can request all of the teams [Example URL](https://week7-cado.herokuapp.com/teams)

```json 
// Response
{
   "id": 1,
   "team_name": "team1",
   "goal_distance": 700,
   "captain": 1
}
```
---

`GET` - `https://week7-cado.herokuapp.com/users/teams/:team`

> You can request all of the members of a team by giving the team name [Example URL](https://week7-cado.herokuapp.com/teams/team1)

```json 
// Response
{
    "id": 1,
    "username": "userA1"
},
{
    "id": 2,
    "username": "userB1"
}...
```
---

### POST

`POST` - `https://week7-cado.herokuapp.com/user`

> You can create your user with the following request body to our API and get an access token in response:

```json
//request
{
   "username": "example",
   "email" : "example@email.com",
   "password": "examplePassword"
}

// response
{
   "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxMSwiaWF0IjoxNTg3MDU2NzU2LCJleHAiOjE1ODcwNjAzNTZ9._R4R91V0KnIuTbaipRf6PZ7zZceL5EZb7zANZLCoF54"
}
```

---

`POST` - `https://week7-cado.herokuapp.com/login`
> You can log in with the following request body to our API:



```json
// request
{
   "email" : "example@email.com",
   "password" : "example123"
}

// response
{
   "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxMSwiaWF0IjoxNTg3MDU2NzU2LCJleHAiOjE1ODcwNjAzNTZ9._R4R91V0KnIuTbaipRf6PZ7zZceL5EZb7zANZLCoF54"
}
```

---


`POST` - `https://week7-cado.herokuapp.com/team/:team/:distance`

> you can create a team with providing two parameters in the url. `:team` is a place holder for the name of your team and `:distance` is a placeholder for goal distance your team wants to have. This url doesn't take a request body.

```json
// example route
// https://week7-cado.herokuapp.com/team/monkey/5000


// response
{
   "message": "monkey team has been created"
}
```

---

`POST` - `https://week7-cado.herokuapp.com/run`

> you can create a run by providing the following request body to our API:


```json 
//request body
{
    "user_id": 1,
    "distance" : 1700,
    "start_time": "00:00:00",
    "end_time" : "00:00:40",
    "date": "2020-02-03"
 }
 
 //response
 {
 "message": "Run on 2020-02-03 @ 00:00:00 created"
 }
```

---
### PUT / UPDATE

`PUT` - `https://week7-cado.herokuapp.com/team/:team`

> you can update a team by providing its current name in the url. `:team` is a place holder for the name of your team. This url takes request body.

```json
// example route that update monkey team
// https://week7-cado.herokuapp.com/team/monkey

// request body
{
   "team_name": "blue Velvet",
   "goal_distance": "20"
}

// response
{
  "message": "monkey updated"
}
```

---
### DELETE

`DELETE` - `https://week7-cado.herokuapp.com/teams/:team`
> you can delete teamby including it in the url. `:team` is a place holder for the name of your team. This url doesn't take request body.

```json
// example route that update monkey team
// https://week7-cado.herokuapp.com/team/monkey


// response
{
   "message": "monkey team has been deleted"
}
```

## Database Schema
![](https://i.imgur.com/wc1uZ0t.png)

```sql=
users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL
); 

teams(
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL UNIQUE, 
    goal_distance INTEGER,
    captain INTEGER REFERENCES users(id)
); 

runs(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id), 
    distance DECIMAL NOT NULL, 
    start_time TIME NOT NULL, 
    end_time TIME NOT NULL,
    date DATE NOT NULL
);

users_teams(
    user_id INTEGER REFERENCES users(id),
    team_id INTEGER REFERENCES teams(id)
);
```

