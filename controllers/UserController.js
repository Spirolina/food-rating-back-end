import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
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