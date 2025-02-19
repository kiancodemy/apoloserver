import bcrypt from "bcrypt";
import { validate } from "graphql";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          // Regular expression for basic email validation
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          return emailRegex.test(value); // Check if the email matches the regex
        },
        message: "Please enter a valid email address", // Custom error message if validation fails
      },
    },

    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    user.password = await bcrypt.hash(user.password, salt); // Hash the password
    next();
  } catch (err) {
    next(err); // Pass any error to the next middleware
  }
});

// Add a method to compare password
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password); // Compare provided password with the stored hashed password
};

// Create and export the User model
export const User = mongoose.model("User", userSchema);
