const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: false },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  facebookId: { type: String, required: false },
  savedSearches: { type: Array, required: false }
});

userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', userSchema);

module.exports = { User };
