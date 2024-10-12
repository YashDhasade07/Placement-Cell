// Import dependencies using ES6 syntax
import express from 'express';
import userRoutes from './userRoutes.js';
import studentRoutes from './studentRoute.js';
import homePage from '../controllers/homeController.js'; // Change import to homePage
import companyRoutes from './companyRoute.js';
import passport from 'passport';

// Create an instance of the Express router
const appRouter = express.Router();

// Define routes for different paths
appRouter.get('/', passport.checkAuthentication, homePage); // Use homePage directly
appRouter.use('/users', userRoutes);
appRouter.use('/students', studentRoutes);
appRouter.use('/company', companyRoutes);

// Export the router for use in other parts of the application
export default appRouter;
