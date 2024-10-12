# Placement Cell Management System

A web-based application to manage student placements, track interview schedules, and record the interview results. Built with Node.js, Express, MongoDB, and Passport.js for authentication.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Demo

A live demo of this project (if hosted) can be found at: [Demo Link](#)

## Features

- Add, edit, and delete student information.
- Schedule and manage interview slots with companies.
- Track interview results for students.
- Export student data and interview results as CSV.
- User authentication and authorization using Passport.js.
- Responsive design with Bootstrap.

## Technologies

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: Passport.js
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Bootstrap 5, Custom CSS
- **Others**: dotenv for environment variables

## Installation

### Prerequisites

- Node.js (version 14 or above)
- MongoDB (local instance or MongoDB Atlas)

### Clone the repository

```bash
git clone https://github.com/your-username/placement-cell.git
cd placement-cell
Install Dependencies
bash
Copy code
npm install
Environment Variables
Create a .env file in the config folder and add the following:

env
Copy code
PORT=3100
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db-name
SESSION_SECRET=yourSecretKey
Replace <username>, <password>, and your-db-name with your MongoDB Atlas credentials or local MongoDB details.

Running the Application
bash

npm start
The server will start on http://localhost:3100 by default.

Usage
Sign In: Log in using your credentials.
Dashboard: View and manage students and interview schedules.
Add Student: Add a new student to the database.
Schedule Interviews: Allocate interviews to students with specific companies.
Update Interview Status: Update the status of an interview as "Pending," "Pass," or "Fail."
Download Report: Export all student data and interview results in CSV format.
Folder Structure
bash

placement-cell/
│
├── assets/                   # Static files like CSS, JS, images
├── config/                   # Environment configurations and Passport strategy
│   ├── mongoose.js           # MongoDB connection setup
│   ├── passport-local-strategy.js
│   └── .env                  # Environment variables
│
├── controllers/              # Request handlers
│   ├── companyController.js
│   └── studentController.js
│
├── models/                   # Mongoose schemas
│   ├── studentSchema.js
│   └── companySchema.js
│
├── routes/                   # Express routes
│   ├── index.js
│   ├── studentRoutes.js
│   └── companyRoutes.js
│
├── views/                    # EJS templates for rendering HTML
│   ├── partials/             # Header, footer, etc.
│   ├── company.ejs
│   ├── add_student.ejs
│   └── home.ejs
│
├── .gitignore
├── index.js                  # Entry point for the server
├── package.json
└── README.md                 # Project documentation