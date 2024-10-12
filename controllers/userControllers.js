// Import required modules using ES6 syntax
import User from '../models/userSchema.js';
import Student from '../models/studentSchema.js';
import fs from 'fs';
import fastcsv from 'fast-csv';

// ------------------------- Get Requests -----------------------

// Render signup page
export const signup = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('back');
  }
  res.render('signup');
};

export const signin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('back');
  }
  res.render('signin');
};

// ------------------------- Session Management -----------------------

// Create user session after successful login
export const createSession = (req, res) => {
  console.log('Session created successfully');
  return res.redirect('/');
};

// Logout user and destroy session
export const signout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/users/signin');
  });
};

// ------------------------- User Management -----------------------

// Create a new user account
export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return res.redirect('back');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('Email already exists');
      return res.redirect('back');
    }

    const newUser = await User.create({ name, email, password });

    await newUser.save();

    if (!newUser) {
      console.log('Error in creating user');
      return res.redirect('back');
    }

    return res.redirect('/users/signin');
  } catch (error) {
    console.log(`Error in creating user: ${error}`);
    return res.redirect('back');
  }
};

// ------------------------- CSV Download -----------------------

// Download student data as a CSV file
export const downloadCsv = async (req, res) => {
  try {
    const students = await Student.find({});
    let data = '';
    let serialNo = 1;
    let csvData =
      'S.No, Name, Email, College, Placement, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result';

    for (let student of students) {
      data =
        serialNo +
        ',' +
        student.name +
        ',' +
        student.email +
        ',' +
        student.college +
        ',' +
        student.placement +
        ',' +
        student.contactNumber +
        ',' +
        student.batch +
        ',' +
        student.dsa +
        ',' +
        student.webd +
        ',' +
        student.react;

      if (student.interviews.length > 0) {
        for (let interview of student.interviews) {
          data += ',' + interview.company + ',' + interview.date.toString() + ',' + interview.result;
        }
      }
      serialNo++;
      csvData += '\n' + data;
    }

    // Write data to CSV file and send the file for download
    fs.writeFile('report/data.csv', csvData, (error) => {
      if (error) {
        console.log(error);
        return res.redirect('back');
      }
      console.log('Report generated successfully');
      return res.download('report/data.csv');
    });
  } catch (error) {
    console.log(`Error in downloading file: ${error}`);
    return res.redirect('back');
  }
};
