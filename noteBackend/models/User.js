const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Method to check the password on login
userSchema.methods.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Relationship with Notes
userSchema.virtual('notes', {
  ref: 'Note',
  localField: '_id',
  foreignField: 'owner'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
