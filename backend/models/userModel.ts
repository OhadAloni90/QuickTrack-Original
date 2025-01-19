import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  theme: String,
  items: [{
    name: String,
    price: Number,
    description: String
  }]
});

export const UserModel = mongoose.model('User', userSchema);