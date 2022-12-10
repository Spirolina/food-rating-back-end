import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({

  googleId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: { type: mongoose.SchemaTypes.String, unique: true, required: true },
  email: { type: mongoose.SchemaTypes.String, required: true },
  name: { type: mongoose.SchemaTypes.String },
  birthdate: { type: mongoose.SchemaTypes.Date },
  surname: { type: mongoose.SchemaTypes.String },
  hash: { type: mongoose.SchemaTypes.String },
  salt: { type: mongoose.SchemaTypes.String },
});

const User = new mongoose.model('User', UserSchema);

export default User;