// Import required modules using ES6 syntax
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/userSchema.js';

// Create a new instance of LocalStrategy for authentication using email and password
const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      
      if (!user || !user.isPasswordCorrect(password)) {
        console.log('Invalid Username/Password');
        return done(null, false);
      }
      
      return done(null, user);
    } catch (error) {
      console.log(`Error in finding user: ${error}`);
      return done(error);
    }
  }
);

// Use the local strategy for passport
passport.use('local', localStrategy);

// Serialize user information into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user information from the session using user ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); 
    return done(null, user);
  } catch (error) {
    console.log('Error in finding user --> Passport');
    return done(error);
  }
});

// Middleware to check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/users/signin');
};

// Middleware to set authenticated user for views
passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

export default passport;
