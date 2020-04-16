BEGIN; 

DROP TABLE IF EXISTS users, teams, runs, users_teams CASCADE; 

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
('userA1','A@emial.com','password'),
('userB1','B@email.com','password'),
('userC1','C@email.com','password'),
('userD2','D@email.com','password'),
('userE23','E@email.com','password'),
('userF2','F@email.com','password'),
('userG3','G@email.com','password'),
('userH3','H@email.com','password'),
('userI42','I@email.com','password'),
('userJ4','J@email.com','password');

INSERT INTO teams (team_name, goal_distance, captain) VALUES
('Monkeys', 700, 1),
('Jimmyes', 800, 1),
('Tigers', 900, 1),
('Trees', 1000, 3);


INSERT INTO runs (user_id, distance, start_time, end_time, date) VALUES
(1, 500, '00:00:00', '00:10:00', '2020-01-01'),
(1, 600, '00:00:00', '00:20:00', '2020-01-05'),
(1, 700, '00:00:00', '00:30:00', '2020-02-03'),
(1, 800, '00:00:00', '00:40:00', '2020-02-15'),
(2, 900, '00:00:00', '00:50:00', '2020-03-05'),
(2, 1000, '00:00:00', '01:00:00', '2020-03-07'),
(2, 1100, '00:00:00', '01:00:00', '2020-03-10'),
(2, 1200, '00:00:00', '01:10:00', '2020-04-01'),
(3, 26000, '00:00:00', '01:20:00', '2019-04-01'),
(3, 44000, '00:00:00', '01:30:00', '2019-08-01');


INSERT INTO users_teams (user_id, team_id) VALUES 
(1, 1),
(2, 1),
(3, 1),
(4, 2),
(5, 2),
(5, 3),
(6, 2),
(7, 3),
(8, 3),
(9, 4),
(9, 2),
(10, 4);

COMMIT;