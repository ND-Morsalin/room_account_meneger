/* eslint-disable comma-dangle */
// external dependency
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const mongoose = require('mongoose');

// internal dependency
const { notFound, errorsHandler } = require('./middleware/errorsHandler');
const homeRoute = require('./route/homeRoute');
const loginRoute = require('./route/loginRoute');
const signupRoute = require('./route/signupRoute');

// express app

const app = express();
dotenv.config();

// connect db
mongoose
    .connect(process.env.MONGO_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('data base connect');
    })
    .catch((err) => {
        console.log(err);
    });

// request paraer
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser(process.env.COOKIE_SECRET));

// public folder
app.use(express.static(path.join(__dirname, 'public')));

// Views folder
app.set('view engine', 'ejs');

// router
app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/signup', signupRoute);

// not found page
app.use(notFound);

// error handler
app.use(errorsHandler);
// server

app.listen(3000, () => {
    console.log('app is runingg on port 3000');
});