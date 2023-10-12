import { Date, Document, Schema } from "mongoose";

// Interfaz para el documento de usuario
interface IEvent extends Document {
  title: string;
  end: Date;
  start: Date;
  user: Schema.Types.ObjectId
}

export { IEvent };