# QuizApp

A simple MEAN stack-based Quiz App. Definitions made to run the app on localhost.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Also, to ensure app works right, you have to start the API server by going to the 'api' folder and running 'node app.js' from within. Also, ensure that database connection string is accordingly updated in the config files.

## Features
- Login(Users need to be added fron the backend, using some application like POSTMAN, or through direct HTTP request to the API server). Route guards placed on all routes except LeaderBoard.
- Timed quiz, answer options are disabled on time out. Countdown displayed at top of page
- Questions also need to be added through HTTP request to appropriate route of the API server
- Leaderboard page displaying unsorted list of users and their marks

## Project Updates
- Sign Up
- Elaborate Admin side
- Sorting and filtering in the Leaderboard

### In case of queries or bugs, contact the developer
