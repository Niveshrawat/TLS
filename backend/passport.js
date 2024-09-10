import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from './models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id).exec();
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });

// Configure Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://api.thelearnskills.com/api/v1/auth/google/callback',
    scope: ['profile', 'email'] // Ensure this is included
  },
async (token, tokenSecret, profile, done) => {
  try {
    let user = await userModel.findOne({ googleId: profile.id });
    if (!user) {
      user = await new userModel({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      }).save();
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}
));

export default passport;
