// Import required models using ES6 syntax
import Student from '../models/studentSchema.js';
import Company from '../models/companySchema.js';

// Render company page
export const companyPage = async (req, res) => {
  try {
    const students = await Student.find({});
    return res.render('company', { students });
  } catch (error) {
    console.error(`Error in rendering page: ${error}`);
    return res.redirect('back');
  }
};

// Allocate interview
export const allocateInterview = async (req, res) => {
  try {
    const students = await Student.find({});
    let batches = [...new Set(students.map(student => student.batch))]; // Extract unique batches

    return res.render('allocateInterview', { students, batches });
  } catch (error) {
    console.error(`Error in allocating interview: ${error}`);
    return res.redirect('back');
  }
};

// Schedule interview
// export const scheduleInterview = async (req, res) => {
//   const { id, company, date } = req.body;
//   try {
//     const existingCompany = await Company.findOne({ name: company });
//     const interviewObject = { student: id, date, result: 'Pending' };

//     if (!existingCompany) {
//       const newCompany = await Company.create({ name: company });
//       newCompany.students.push(interviewObject);
//       await newCompany.save();
//     } else {
//       // Check if the student already has an interview scheduled
//       const studentAlreadyScheduled = existingCompany.students.some(student => student.student._id === id);
//       if (studentAlreadyScheduled) {
//         console.log('Interview with this student already scheduled');
//         return res.redirect('back');
//       }
//       existingCompany.students.push(interviewObject);
//       await existingCompany.save();
//     }

//     const student = await Student.findById(id);
//     if (student) {
//       student.interviews.push({ company, date, result: 'Pending' });
//       await student.save();
//     }

//     console.log('Interview Scheduled Successfully');
//     return res.redirect('/company/home');
//   } catch (error) {
//     console.error(`Error in scheduling Interview: ${error}`);
//     return res.redirect('back');
//   }
// };

// Schedule interview
export const scheduleInterview = async (req, res) => {
  const { id, company, date } = req.body;
  try {
    // Log received data
    console.log(`Received ID: ${id}, Company: ${company}, Date: ${date}`);

    const existingCompany = await Company.findOne({ name: company });
    const interviewObject = { student: id, date, result: 'Pending' };

    if (!existingCompany) {
      const newCompany = await Company.create({ name: company });
      newCompany.students.push(interviewObject);
      await newCompany.save();
    } else {
      // Check if the student already has an interview scheduled
      const studentAlreadyScheduled = existingCompany.students.some(student => student.student && student.student._id.toString() === id.toString());
      if (studentAlreadyScheduled) {
        console.log('Interview with this student already scheduled');
        return res.redirect('back');
      } 
      existingCompany.students.push(interviewObject);
      await existingCompany.save();
    }

    const student = await Student.findById(id);
    if (student) {
      student.interviews.push({ company, date, result: 'Pending' });
      await student.save();
    } else {
      console.log('Student not found');
    }

    console.log('Interview Scheduled Successfully');
    return res.redirect('/company/home');
  } catch (error) {
    console.error(`Error in scheduling Interview: ${error}`);
    return res.redirect('back');
  }
};


// Update status of interview
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { companyName, companyResult } = req.body;
  try {
    const student = await Student.findById(id);
    if (student && student.interviews.length > 0) {
      for (let company of student.interviews) {
        if (company.company === companyName) {
          company.result = companyResult;
          await student.save();
          break;
        }
      }
    }

    const company = await Company.findOne({ name: companyName });
    if (company) {
      for (let std of company.students) {
        if (std.student.toString() === id) {
          std.result = companyResult;
          await company.save();
        }
      }
    }

    console.log('Interview Status Changed Successfully');
    return res.redirect('back');
  } catch (error) {
    console.error(`Error in updating status: ${error}`);
    return res.redirect('back');
  }
};
