# Angular Node Mongo

A full-stack web application built with Angular for the frontend, Node.js for the backend, and MongoDB as the database. This project serves as a modern example of building scalable and maintainable applications using popular technologies.

(a) Angular7/8 test

1. Design a small Single Page Application(in Angular 7/8 ) to manage a list of people.

Create at least 3 views:

>list all people

>edit a person

>delete a person

(b) Node/Mongo Test :

Create a RESTful Web Service Using Nodejs and MongoDB(to store Data).

GET /person: Displays a table with a list of people

POST /person: Displays a form to create a single person

PUT /person/{id}: Displays a form through which a person with a specified id parameter can be edited and updated

DELETE /person/{id}: Displays a page through which a person with a specified id can be deleted

**Person collection fields: Name, Age, Gender, Mobile number

## Features

- **Frontend**: Responsive and dynamic user interface built with Angular.
- **Backend**: RESTful API development using Node.js and Express.js.
- **Database**: MongoDB for document-based storage.

## Tech Stack

- **Frontend**: Angular, TypeScript, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Angular CLI](https://angular.io/cli)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/abhinavparupati/angular-node-mongo.git
   cd angular-node-mongo
2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
3. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
### Running the Application:

1. Start the backend server:
   ```bash
   cd backend
   node server.js
2. Start the frontend server(in another terminal):
   ```bash
   cd frontend
   ng serve
3. Open the application in your browser:
   ```bash
   http://localhost:4200

   
