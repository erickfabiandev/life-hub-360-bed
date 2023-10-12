import { Document } from 'mongoose';
import { ITaskList } from '../tasklist/tasklist.types';

// Definición de roles válidos
enum UserRole {
  Normal = 'user',
  Admin = 'admin',
}

// Interfaz para el documento de usuario
interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  status: boolean;
  role: UserRole;
  taskList: ITaskList[]
}

export { IUser, UserRole }