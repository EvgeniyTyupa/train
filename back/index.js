const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const passport = require('passport');
require('dotenv/config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//import Routes
const authRoute = require('./routes/user');
const trainsRoute = require('./routes/trains');

//Routes
app.use('/api/auth', authRoute);
app.use('/api/trains', trainsRoute);


mongoose.connect(keys.mongoURI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    },() => 
    console.log('connected to DB!')
);

app.use(passport.initialize());
require('./middleware/passport')(passport);


app.listen(3001);