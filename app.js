const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const mongoStore = require("connect-mongo");

var app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin123@alphatauri1.fblhwlp.mongodb.net/?retryWrites=true&w=majority";
  

const dbOptions = {
  dbName: 'test',
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(uri, dbOptions);
const connection = mongoose.connection;
try {
  connection.once("open", () => {
    console.log("database connected sucessfully");
  });
} catch (err) {
  console.log("connection unsucessful");
}

var sessionStore = new mongoStore({
  mongoUrl: uri,
  collection: "sessions",
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: sessionStore,
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/", (req, res, next) => {
    if(req.session.viewCount){
        req.session.viewCount += 1;
    } else {
        req.session.viewCount = 1;
    }
  res.send(`<h1>You visited this page ${req.session.viewCount} times</h1>`);
});

app.listen(3000);
