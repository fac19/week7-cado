
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

```
$ psql -c "CREATE USER myuser WITH PASSWORD 'mypassword'"
$ psql -c "ALTER USER myuser WITH SUPERUSER"
$ psql -c "CREATE DATABASE week7cado_db WITH OWNER myuser"
$ psql -c "CREATE DATABASE week7cado_db WITH OWNER myuser"
```

1. Run `psql` to enter Postgres CLI
2. Connect to database `# \c week7cado_db`
3. Initialise database `# \i database/init.sql`
4. then grant priviliges:
* `GRANT ALL PRIVILEGES ON DATABASE week7cado_db TO your-username;`
* `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your-username;`


## Database Schema
