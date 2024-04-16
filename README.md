# Posts App
## What was used for building this project?
- Express
- Postgresql
- JWT
- MVC Design
- Javascript
## What was the main porpouse of this project?
Learning about authorization process, acessing an real database, using table relations and understanding why an ORM such as prisma and Typescript would help the development
## But why did i use PG?
PG uses pure sql queries and i see this as an important step to use the relational database with mastery (uderstanding the sql cmds), even if its weak on sqli
## Why not Typescript yet?
When i started the project i decided not to use Typescript, the reason is i wanted to understand why Typescript would make the development faster, decided to face pure Javacript
## Why CSS was not used?
I actually understand a bit of frontend but my ability with frontend is not deep enough yet, at some point i want to dive in frontend to become a fullstack developer, but even when i get a good understanding i will not update older projects, because i want to show the progress on learning each technology
## What i am going to learn now?
- Docker
- Mongo
- Typescript
- Prisma
### Why Mongo?
Although i did not use an ORM for Postgres in this project i already have an base on how it works and i do not want to use only relational dbs, so my next project for sure will use mongo and then Postgres with an ORM
## What did i learn on this project?
- Authorization process with JWT
- Password hashing
- MVC design
- Express
- Importance of Middlewares
- Logging status is important
- Organization helps a lot
- More about making a readable code
- More about table relations
- Cookie is an good practice for storing JWT
- Dates
- More about Asynchronous
- Better thinking on problem solving
- Pg fail in sqli
## How it works
### Tables
There are just two tables: users and posts

users fields:

- id; Stores user's id
- first_name; Stores user's first name
- last_name; Stores user's last name
- username; Stores user's username
- email; Stores user's email
- refresh_token; Stores user's refresh token
- password; Stores user's password

posts fields:

- id; Stores post's id
- post_name; Stores post's name
- post_content; Stores post's content
- owner; Stores the id of the owner (Foreign key)
- post_timestamp; Stores post's timestamp

### Endpoints

- POST /api/login Logs user and stores a JWT on cookie
- POST /api/signup Creates a user on the database
- POST /api/createPost Creates a post

- GET /api/userData/:id Responds with a json containing user's info (accepts id for another user's info)
- GET /api/userPosts/:id Responds with a json containing the posts of the user (accepts id for another user's posts)
- GET /api/feedPosts Responds with a json containing all posts

- PUT /api/logout Updates the user's refresh_token field and redirects

- DELETE /api/deletePost/:id Deletes the target post
- DELETE /api/deleteUser Deletes the current user
