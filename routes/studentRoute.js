// Import required modules using ES6 syntax
import express from 'express';
import passport from 'passport';
import {
  createStudentPage,
  deleteStudent,
  createStudent,
} from '../controllers/studentController.js';

const router = express.Router();

// ------------------ Get requests ------------
// Render the page to create a new student
router.get('/create', passport.checkAuthentication, createStudentPage);

// Delete a student by ID
router.get('/delete/:id', passport.checkAuthentication, deleteStudent);

// ------------------- Post requests ----------
// Create a new student
router.post('/create-student', passport.checkAuthentication, createStudent);

export default router;
