# User API

This is a simple REST API for managing users. It allows creating, updating, retrieving, and deleting user objects.
## Content 
1. [Tech stack](#tech-stack)
2. [Steps to run locally](#running-on-your-local-machine)
3. [Endpoints](#endpoints)
4. [Testing](#testing)

### Tech stack 
* Node.js
* ExpressJS
* Database
  * Redis
* Testing
  * Jest
  * Supertest
  
## Running on your local machine
1. Clone this repo  
```git clone https://github.com/rahulsm20/CRUD-api ```
2. Enter into the folder  
   ```cd CRUD-api```
3. Install packages  
   ```npm i``` or ```npm install```
4. Define environment variables
   * Redis instance connection URL as REDIS_URL 
   * Port on which you want to run your server as PORT
5. There are multiple modes you can run the server in 
   * Run in production mode  
      ```npm run start:prod```
   * Run in development mode  
      ```npm run start:dev```
   * Run multiple instances  
      ```npm run start:multi``` 
## Endpoints

### `GET /api/users`

Retrieves all the user objects stored in the database.

#### Response

- Status Code: 200 OK
- Body: an array of user objects

### `POST /api/users`

Creates a new user object with the provided properties.

#### Request Body

- `username` (string): The user's name.
- `age` (number): The user's age.
- `hobbies` (array of strings): An array of the user's hobbies.

#### Response

- Status Code: 201 Created
- Body: an object containing the created user's ID

### `GET /api/users/:id`

Retrieves a user object with the specified ID.

#### Response

- Status Code: 200 OK
- Body: an object containing the user's properties

### `PUT /api/users/:id`

Updates a user object with the specified ID.

#### Request Body

- `username` (string): The user's name.
- `age` (number): The user's age.
- `hobbies` (array of strings): An array of the user's hobbies.

#### Response

- Status Code: 200 OK
- Body: an object containing the updated user's properties

### `DELETE /api/users/:id`

Deletes a user object with the specified ID.

#### Response

- Status Code: 204 No Content

## Testing

The API's functionality is tested using [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest) libraries. The tests cover the following scenarios:

- Retrieving all users
- Creating a new user
- Retrieving a user by ID
- Updating a user by ID
- Deleting a user by ID
- Retrieving a deleted user by ID (which should return a 404 error)

To run the tests, run the following command:

```
npm test
```

Sample result

![sample-test](https://github.com/rahulsm20/CRUD-api/assets/77540672/e122fe2d-c903-4b73-89ea-e29f68677813)
