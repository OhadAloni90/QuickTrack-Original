import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // More fields later...
});

export const UserModel = mongoose.model('User', userSchema);
