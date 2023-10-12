import mongoose, { Schema } from 'mongoose'
import { IUser, UserRole } from './user.types'
import { TaskListSchema } from '../tasklist/tasklist.model';

const emailRegex = new RegExp('[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}');

const UserSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name must be at most 50 characters long'],
  },
  email: {
    type: String,
    required: true,
    match: [emailRegex, 'Email is not valid'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  avatar: {
    type: String,
    required: [true, 'Avatar is required']
  },
  status: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.Normal,
  },
  taskList: {
    type: [TaskListSchema],
    default: []
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
