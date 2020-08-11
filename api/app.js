
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/dev.json');

const userAuthRoutes = require('./routes/userAuth');
const questionRoute = require('./routes/questions');
const leaderRoute = require('./routes/leaderBoard');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database Connection
mongoose.connect(config.db.connString, { useNewUrlParser: true })
.then(() => {
  console.log('Database Connection Successful');
})
.catch((err) => {
  console.log('Database Connection Failed');
});


// User Authentication Route
app.use('/api/auth', userAuthRoutes);

// Questions Route
app.use('/api/question', questionRoute);

// Leaderboard Route
app.use('/api/leaderboard', leaderRoute);

const server = app.listen(process.env.PORT || 8000);