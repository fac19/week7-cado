
# CODA
Week 7

## Project description
We Created and API that does this and that

## Set up instructions

1. Clone this repo
2. Run `npm i` on your terminal to install dependencies
3. Run `npm run dev` to start development server
4. Run `npm test` to run tests
5. Create a `.env` file in the root folder with the following inside
6. Run these commands in your terminal to set up user, app database and test database

```
PGDATABASE=week7cado_db
PGUSER=myuser
PGPASSWORD=mypassword
```

1. Run `psql` to enter Postgres CLI

```
CREATE USER myuser WITH PASSWORD 'mypassword';
ALTER USER myuser WITH SUPERUSER";
CREATE DATABASE week7cado_db WITH OWNER myuser";
CREATE DATABASE week7cado_test_db WITH OWNER myuser";
```

2. Connect to database `# \c week7cado_db`
3. Initialise database `# \i database/init.sql`
4. then grant privileges:
   * `GRANT ALL PRIVILEGES ON DATABASE week7cado_db TO your-username;`
   * `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your-username;`


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

---

## API routes you can access to
### GET 

`GET` - `https://week7-cado.herokuapp.com/users/runs/`

> Once signed in, you can request your runs
```json
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

### POST

`POST` - `https://week7-cado.herokuapp.com/create/user`

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


`POST` - `https://week7-cado.herokuapp.com//create/team/:team/:distance`

> you can create a team with providing two parameters in the url. `:team` is a place holder for the name of your team and `:distance` is a placeholder for goal distance your team wants to have. This url doesn't take a request body.

```json
// example route
// https://week7-cado.herokuapp.com/create/team/monkey/5000


// response
{
   "message": "monkey team has been created"
}
```

---

`PUT` - `https://week7-cado.herokuapp.com/update/team/:team`

> you can update team's name with providing one parameter in the url. `:team` is a place holder for the name of your team. This url takes request body.

```json
// example route that update monkey team
// https://week7-cado.herokuapp.com/update/team/monkey

// request body
{
   "team_name": "blue Velvet",
   "goal_distance": "20"
}

// response
{
}
```

---

`DELETE` - `https://week7-cado.herokuapp.com/delete/teams/:team`
> you can delete team's name with providing one parameter in the url. `:team` is a place holder for the name of your team. This url doesn't take request body.

```json
// example route that update monkey team
// https://week7-cado.herokuapp.com/delete/team/monkey


// response
{
   "message": "monkey team has been deleted"
}
```