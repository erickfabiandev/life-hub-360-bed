import mongoose, { Schema } from "mongoose";
import { IEvent } from "./event.types";

const EventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [4, 'Name must be at least 4 characters long'],
    maxlength: [100, 'Name must be at most 100 characters long'],
  },
  end: {
    type: Date,
    required: [true, 'End date is required'],
  },
  start: {
    type: Date,
    required: [true, 'Start date  is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }

}, {
  timestamps: true,
  versionKey: false,
})

const EventModel = mongoose.model<IEvent>('Event', EventSchema);

export default EventModel;