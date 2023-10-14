# LifeHub360 - Back End 💻

The backend of the Life Hub 360 is built using Node.js and Express.js, with Mongoose as the database ODM (Object Data Modeling). It handles user authentication, appointment management, product management, and communication with the frontend through RESTful APIs.
Link for more details about the app's functionalities [DETAILED INFORMATION](https://plausible-macaw-78a.notion.site/LIFEHUB360-dbe4df46de784c9b861a4531f9ea556b?pvs=4)

**Technologies Used**
**Node.js:** Node.js is a runtime environment that allows us to run JavaScript on the server-side. It's the foundation of our backend.

**Express.js:** Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's used to create the RESTful API endpoints.

**Bcrypt:** Bcrypt is used for hashing user passwords before storing them in the database. It ensures that user passwords are securely stored.

**JSON Web Tokens (JWT):** JWTs are used for user authentication. When a user logs in, a JWT is generated and sent to the client, which is then included in subsequent requests to authenticate the user.

**Mongoose:** Mongoose is a Node. js-based Object Data Modeling (ODM) library for MongoDB. It is akin to an Object Relational Mapper (ORM) such as SQLAlchemy for traditional SQL databases.

## User Authentication
When a user registers or logs in, their password is hashed using Bcrypt before being stored in the database to ensure security.

Upon successful login, a JWT (JSON Web Token) is generated and sent to the client, which is included in the headers of subsequent requests to authenticate the user.

## RESTful API Endpoints
The backend provides the following RESTful API endpoints:

**Healthcheck**

GET /api/healthcheck : Validate the connection with BD

**Authentication:**

POST /api/auth/login: Log in an existing user and receive a JWT.

**User**

POST /api/users: Register a new user.

PATCH /api/users: Edit s user.


**Events:**

GET /api/event/all: Returns all events of an authenticated user.

GET /api/event/latest: Returns the last 4 events recorded in the month of an authenticated user.

POST /api/event: Create a new event.

DELETE /api/event: Edits an existing event.


**Task:**

POST /api/task: Adds a task to an existing list of an authenticated user.

PATCH /api/task: edits a task from an existing list for an authenticated user.

DELETE /api/task: deletes a task from an existing list for an authenticated user.

**Tasklist:**

GET /api/tasklist/all: Returns all tasklist of an authenticated user.

GET /api/tasklist/latest: Returns the last 4 tasklist recorded in the month of an authenticated user.

POST /api/tasklist: Create a new tasklist.

DELETE /api/tasklist: Edits an existing tasklist.


## Database
The backend uses MongoDB as a database to store user information, events, task lists, document storage and financial data.

Mongoose is used to define the data models and interact with the database.

## Deployment
The backend is deployed on Render, a cloud hosting service, to make it accessible to the frontend and users.

## Prerequisites

- [Git](https://git-scm.com/downloads)
- [Node.js and npm](https://nodejs.org) Node >= 18.15 LTS, npm >= 9.5.x - Install with Volta.sh

## Express Router and Routes

| HTTP Verb   | Route                   | Description                                       |
| ----------- | ------------------------| ------------------------------------------------- |
| GET         | /api/healthcheck        | Validate the connection with the database        |
| POST        | /api/auth/login/        | Log in to the system, receive email and password as parameters, pass validation successfully, and return the profile and token. |
| POST        | /api/user/              | Used for user creation, receives email and password, saves the user in the database without errors. |
| PATCH       | /api/user/my-profile    | Update a user's data                             |
| POST        | /api/event/             | Create an event, saving it in the Event collection |
| DELETE      | /api/event/             | Remove an event from the Event collection        |
| GET         | /api/event/all          | Returns all events of an authenticated user     |
| GET         | /api/event/latest       | Returns the last 4 events created in the month  |
| POST        | /api/task/              | Create a task in a task list                     |
| PATCH       | /api/task/              | Update the data of a given task                  |
| DELETE      | /api/task/              | Delete a task                                    |
| POST        | /api/tasklist/          | Create a list of tasks                           |
| PATCH       | /api/tasklist/          | Update any task list                            |
| DELETE      | /api/tasklist/          | Delete a list of tasks                          |
| GET         | /api/tasklist/all       | Returns all task lists of a specific user        |
| GET         | /api/tasklist/latest    | Returns the last 4 task lists of a specific user |


## Usage

The use of endpoints is very simple, previously you could see a table of endpoints that you can call, if you need to create a note or log in, here we have some examples.

### Authentication **user** `/api/auth/login`

Request Body:

```json
{
  "email": "jd@test.com",
  "password": "1234"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aWFuLm1vcmVub0BtYWtlaXRyZWFsLmNhbXAiLCJpYXQiOjE2NjEyMDgwODJ9.kPdMoVUEnyX36vi606Mc1C66yWLKKAB37GLbF0gzhBo",
  "profile": {
    "fullName": "JHON",
    "email": "jd@test.com",
    "status": "true",
    "role": "USER",
    "avatar": "https://res.cloudinary.com/ds8a1x14x/image/upload/v1697245792/user_default.png",
  }
}
```

### Basic example **Create User** `/api/users`

Request Body:

```json
{
  "fullName": "John Doe",
  "email": "jd@test.com",
  "password": "123456",
  "avatar": "URL_TO_USER_AVATAR_IMAGE"  // This field is optional
}
```

Response:

```json
{
    "_id": "cCI6IkpXVCJ9.eyJlbWFpbCI6ImNyaXN0aWFuLm1vcmVub0BtYW",
    "fullName": "JHON",
    "email": "jd@test.com",
    "status": "true",
    "role": "USER",
    "avatar": "https://res.cloudinary.com/ds8a1x14x/image/upload/v1697245792/user_default.png",
}
```

### Developing

1. Clone the repository

2. Run `npm install` to install server dependencies.

3. Configure the env running `cp .env.example .env`

4. Update `.env` with the required info

5. Run `npm run dev` to start the development server.

## License

[MIT](LICENSE)
