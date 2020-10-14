const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: false },
  facebookId: { type: String, required: false },
  active: { type: Boolean, required: false, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
