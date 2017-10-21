// grab the things we need
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const userSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  userName: String,
  userImg: String,
  userToken: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;