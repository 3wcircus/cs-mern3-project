const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  profileImage:{
    type: String
  },
  backgroundImage: {
    type: String
  },
  tweets: [{
    title : String,
    img : String,
    private: Boolean,
    default: false

  }]
});

const User = module.exports = mongoose.model('User', UserSchema);
