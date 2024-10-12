// Importing dependencies using ES6 syntax
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import database from './config/mongoose.js';
import localStrategy from './config/passport-local-startegy.js';
import routes from './routes/index.js';

// Initialize the environment variables
dotenv.config({ path: 'config/.env' });

const app = express();
const serverPort = process.env.PORT || 3100;

// Set 'ejs' as the templating engine and define the views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Configure session management for user sessions
app.use(
  session({
    // Change the secret before deployment in production mode
    secret: "mySecretKey", // Use environment variable for better security
    // Avoid resaving session data if not modified
    resave: false,
    // Avoid creating a session for non-authenticated users
    saveUninitialized: false,
    // Session cookie settings
    cookie: { maxAge: 1000 * 60 * 100 }, // Expiration time of the session cookie
  })
);

// Enable extraction of styles and scripts from sub-views into the main layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Middleware for parsing URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files like CSS, JavaScript, images, etc.
app.use(express.static('./assets'));

// Initialize Passport for authentication and manage session data
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Route all incoming requests through the router
app.use('/', routes);

// Start the server and listen on the specified port
app.listen(serverPort, (err) => {
  if (err) {
    console.error(`Server failed to start: ${err}`); 
    return;
  }
  console.log(`Server is up and running on port ${serverPort}`); 
});
 