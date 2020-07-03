# Open4Tech-RestfulAPIs

This project represents a solution to the homework proposed by Open4Tech trainer **Cristi Minica** @ [https://github.com/minicacristi/restful-apis](https://github.com/minicacristi/restful-apis)

**To run this project you must have NodeJS and NPM installed**

## Steps to run this project

1. Run **npm install**
2. At **root folder create a .env file** which must contain the following variables:

- API_KEY (your api key for [OpenWeatherMap API](https://openweathermap.org/api)) \_this is
  necessary for homework 3 to work\*
- MONGODB_URI (link to your database host) \_Database
  used in this project is MongoDB\*
- PORT (specifies the port for the app to listen on)

3. Run **npm run start** and everything should run.

## Info about routes

### Questions

Questions are being saved in the **questions.json** file

- **GET - /questions**
  Retrieves all the questions and answers.

- **GET - /question/:id**
  Retrieves one question based on the passed id

- **POST - /questions**
  Requires the body to hold two JSON properties:

  1. question
  2. answer

- **DELETE - /questions/:id**
  Deletes one question based on the passed id

- **PUT - /questions/:id**
  Updates one question based on the id and requires the body to hold two JSON properties:

  1. question
  2. answer

- **POST - /questions/save-to-db**
  Takes all the questions saved in the memory and stores them in the database.

### Reviews

Reviews are being saved in the **reviews.json** file

- **GET - /reviews**
  Retrieves all the reviews.

- **GET - /reviews/:id**
  Retrieves one review based on the passed id

- **POST - /reviews**
  Requires the body to hold two JSON properties:

  1. subject
  2. review

- **DELETE - /reviews/:id**
  Deletes one review based on the passed id

- **PUT - /reviews/:id**
  Updates one review based on the id and requires the body to hold two JSON properties:

  1. subject
  2. review

- **POST - /reviews/save-to-db**
  Takes all the questions saved in the memory and stores them in the database.

### Weather API Proxy

**To use this, an API key from [OpenWeatherMap API](https://openweathermap.org/api) is required**

- **GET - /weather**
  - Requires a query parameter (city) and returns weather for it
