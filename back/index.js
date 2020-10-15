const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const passport = require('passport');
let cors = require('cors');
require('dotenv/config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//import Routes
const authRoute = require('./routes/user');
const exerciseRoute = require('./routes/exercise');
const workoutRoute = require('./routes/workout');

//Routes
app.use('/api/auth', authRoute);
app.use('/api/exercise', exerciseRoute);
app.use('/api/workout', workoutRoute);

//DB
mongoose.connect(keys.mongoURI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },() => 
    console.log('connected to DB!')
);

app.use(passport.initialize());
require('./middleware/passport')(passport);


app.listen(3001);