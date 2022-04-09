CREATE TABLE users (
  id SERIAL PRIMARY KEY, 
  username VARCHAR(50) UNIQUE, 
  first_name VARCHAR(64), 
  last_name VARCHAR(64), 
  password VARCHAR
);