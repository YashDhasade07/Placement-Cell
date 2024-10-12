// Import required modules using ES6 syntax
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the schema for a user with fields and their properties
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a virtual property to hash the password before saving
userSchema.virtual('password').set(function (value) {
  this.passwordHash = bcrypt.hashSync(value, 12);
});

// Define a method to compare a plain password with the hashed one
userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other files
export default User;
