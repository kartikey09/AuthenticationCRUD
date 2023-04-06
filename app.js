const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const crypto = require("crypto");
const routes = require("./routes");
require("dotenv").config();
require("./config/passport");
const mongoStore = require("connect-mongo");

const sessionStore = new mongoStore({
  mongoUrl: process.env.DB_URI,
  collection: "sessions",
});

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/**
 * -------------- SESSION SETUP ----------------
 */

// TODO:

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize()); //! re-initializes the passport middleware every time we access a route so that if the session expires we can re initialize it
app.use(passport.session()); //! to use serialize and deserialize user we have to use this middleware so that passport can alter req object.
//!                              passport.session() acts as a middleware to alter the req object and change the 'user' value that is currently the session id
//!                              (from the client cookie) into the true deserialized user object. Another way to understand this is that if we allow passport 
//!                              to use session storage, it can automatically authenticate the user between several api calls using the req.session object. 

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
