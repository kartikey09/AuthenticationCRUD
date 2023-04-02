const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require('passport');
const crypto = require('crypto');
const routes = require('./routes');
require('dotenv').config();
require('./config/passport');
const mongoStore = require("connect-mongo");


// const sessionStore = new mongoStore({
//   mongoUrl: uri,
//   collection: "sessions",
// });
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(
//   session({
//     store: sessionStore,
//     secret: "some secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   })
// );

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


/**
 * -------------- SESSION SETUP ----------------
 */

// TODO

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);


/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);
