const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */ 


const uri = process.env.DB_URI
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

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});


const User = connection.model('User', UserSchema);

// Expose the connection
module.exports = connection;