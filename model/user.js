import bcrypt from "bcrypt";

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
          const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          return emailRegex.test(value);
        },
        message: "Please enter a valid email address",
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
    next(err);
  }
});

userSchema.method("comparePass", async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
});

export const User = mongoose.model("User", userSchema);
