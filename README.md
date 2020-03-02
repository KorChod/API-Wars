# API-Wars
A small project which was made as my JavaScript practice to get more experience using both internal and external web APIs. All the HTML markup is generated from the scripts to make it more dynamic and work like single-page application.

A list of Star Wars planet is displayed with related information. 

User can browse planets using buttons to move to previous/next records. If no records are available, buttons get disabled.

The list of residents of each planet can be displayed in a modal when button with residents' number is pressed.

Planets can be voted. There is a database on a server side to keep record on how many votes each planet got.

## Screenshots

1. Planet list view:

![planet_list](git_resources/1.png)

2. Residents list view:

![residents_list](git_resources/2.png)


## Tech Stack
- Python
- Flask
- JavaScript
- PostgreSQL

## Setup
- create a database,
- open `sql_commands` file and run the SQL command from its content to create a table `votes`,
- create the following environment variables to establish connection with the database: 
  - `PSQL_USER_NAME`,
  - `PSQL_PASSWORD`,
  - `PSQL_HOST`,
  - `PSQL_DB_NAME`,
 - install packages from `requirements.txt`.
