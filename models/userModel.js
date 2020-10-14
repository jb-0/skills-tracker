const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  email: { type: String, required: false },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  facebookId: { type: String, required: false },
  active: { type: Boolean, required: false, default: false },
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

module.exports = { User };
