import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';
import passportLocalMongoose from 'passport-local-mongoose';

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: { type: String, required: false },
  password: { type: String, required: false },
  googleId: { type: String, required: false },
  facebookId: { type: String, required: false },
  savedSearches: [{ type: Schema.Types.ObjectId, ref: 'Search' }],
});

userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('SkillsUser', userSchema);

export { User };
