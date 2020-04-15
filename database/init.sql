BEGIN; 

DROP TABLE IF EXISTS users, teams, runs, users_teams; 

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL
); 

CREATE TABLE teams(
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL UNIQUE, 
    goal_distance INTEGER,
    captain INTEGER REFERENCES users(id)
); 

CREATE TABLE runs(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id), 
    distance DECIMAL NOT NULL, 
    start_time TIME NOT NULL, 
    end_time TIME NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE users_teams(
    user_id INTEGER REFERENCES users(id),
    team_id INTEGER REFERENCES teams(id)
);

INSERT INTO users (username, email, password) VALUES
('Monkey','monkeyemial.com','123'),
('jimmyface123','123email.com','321'),
('tomkitten','tomemail.com','kitten');

INSERT INTO teams (team_name, goal_distance, captain) VALUES
('MonkeyTeam', 1000, 1),
('redTeam', 2000, 3);


INSERT INTO runs (user_id, distance, start_time, end_time, date) VALUES
(1, 1000, '00:00:00', '00:10:00', '2020-04-01');


INSERT INTO users_teams (user_id, team_id) VALUES 
(1,1),
(2,1),
(3,2);

COMMIT;

