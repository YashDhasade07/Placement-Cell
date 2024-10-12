// Import required models using ES6 syntax
import Company from '../models/companySchema.js';
import Student from '../models/studentSchema.js';

// Render the page for adding a new student
export const createStudentPage = async (req, res) => {
  return res.render('add_student');
};

// Create a new student
export const createStudent = async (req, res) => {
  const {
    name,
    email,
    batch,
    college,
    placement,
    contactNumber,
    dsa,
    webd,
    react,
  } = req.body;

  try {
    // Check if a student with the same email already exists
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      console.log('Email already exists');
      return res.redirect('back');
    }

    // Create a new student
    const newStudent = await Student.create({
      name,
      email,
      college,
      batch,
      placement,
      contactNumber,
      dsa,
      webd,
      react,
    });

    // Save the new student to the database
    await newStudent.save();
    return res.redirect('/');
  } catch (error) {
    console.log(`Error in creating student: ${error}`);
    return res.redirect('back');
  }
};


// Delete a student by ID
export const deleteStudent = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the student using the ID in params
      const student = await Student.findById(id);
  
      // If the student has scheduled interviews, remove the student from the company lists
      if (student && student.interviews.length > 0) {
        for (let interview of student.interviews) {
          const company = await Company.findOne({ name: interview.company });
  
          if (company) {
            // Remove the student from the company's interview list
            console.log('Company Students:', company.students);

            company.students = company.students.filter(entry => {
              // Check if entry.student is defined
              return entry.student && entry.student.toString() !== id.toString();
            });
            await company.save();
          }
        }
      }
  
      // Delete the student from the database
      await Student.findByIdAndDelete(id);
      res.redirect('back');
    } catch (error) {
      console.log('Error in deleting student:', error);
      return res.redirect('back');
    }
  };
  

// Delete a student by ID
// export const deleteStudent = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Find the student using the ID in params
//     const student = await Student.findById(id);

//     // If the student has scheduled interviews, remove the student from the company lists
//     if (student && student.interviews.length > 0) {
//       for (let interview of student.interviews) {
//         const company = await Company.findOne({ name: interview.company });

//         if (company) {
//           // Remove the student from the company's interview list
//           company.students = company.students.filter(
//             (entry) => entry.student.toString() !== id
//           );
//           await company.save();
//         }
//       }
//     }

//     // Delete the student from the database
//     await Student.findByIdAndDelete(id);
//     res.redirect('back');
//   } catch (error) {
//     console.log('Error in deleting student:', error);
//     return res.redirect('back');
//   }
// };
