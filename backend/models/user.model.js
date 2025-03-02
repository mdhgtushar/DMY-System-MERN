const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const financeSchema = new mongoose.Schema({
  title : { type: String, required: true },
  description : { type: String, required: true },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    vision_bord: { type: String, required: false }, // Stores as binary data
    finance: [financeSchema]
  },
  { timestamps: true }
);

// Password Hashing Before Saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare Password Method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
