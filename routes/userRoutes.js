// userRoutes.js
import express from 'express';
import passport from 'passport';
import * as userController from '../controllers/userControllers.js'; // Use named imports

// Create an instance of the Express router
const userRouter = express.Router();

// ------------------------- Get Requests -----------------------

// Route for user signup page
userRouter.get('/signup', userController.signup);

// Route for user signin page
userRouter.get('/signin', userController.signin);

// Route for user signout, requires authentication
userRouter.get('/signout', passport.checkAuthentication, userController.signout);

// Route to download user data as a CSV, requires authentication
userRouter.get('/download-csv', passport.checkAuthentication, userController.downloadCsv);

// ------------------------- Post Requests -----------------------

// Route for creating a new user
userRouter.post('/create', userController.createUser); 

// Route for creating a user session with local authentication
userRouter.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/users/signin' }), 
  userController.createSession
);

// Export the userRouter for use in other parts of the application
export default userRouter;
