const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const User = connection.models.User;
const validatePassword = require('../lib/passwordUtils').validatePassword

// TODO: passport.use();

/**
 * ! when the req object is passed from the "router.post("/login", passport.authenticate('local'), (req, res, next) => {});" defined in the index.js script
 * ! the passport framework looks for 'usename' and 'password' field in the req object, if they are named any different passport wont recognize them
 * ! and will crash, to overcome this issue we have the customFields obejct to higlight passport has to look for req.body.uname and not req.body.username
 * ! similarly for password it is req.body.pw.
 */
const customFields = {
  username: "username", //! if the variable for username is different in the req object then specify it here so that passport can understand which filed to refer to look for username, similarly for password
  password: "password",
};

/**
 *
 * @param {username} username
 * @param {passport} password
 * @param {this is a call back function that has first parameter to specify if there was an error or not
 *         in the operation and the second parameter is to specify if we got what we were looking for} done
 *
 * ! to validate the user credentials we respond using the done function, if the user is validated we return the done(null, user)
 * ! else we return user(null, false) and for this passport will return a 401 unauthorized status
 */

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        console.log('no user found ')
        return done(null, false);
      }
      console.log('user found !')
      const isValid = validatePassword(password, user.hash, user.salt);
      if (isValid) {
        return done(null, user);  //! done function will be called and will return user obj to the router.post method
      } else {
        return done(null, false); //! done function will be called and will return false to the router.post method
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

//! the below function is used to add the userid into the session 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//! the below function is used to remove the userid out of the session 
passport.deserializeUser((userID, done) => {
  User.findById(userID)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
