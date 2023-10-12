import EventModel from "./event.model";
import { IEvent } from "./event.types";

export async function createEvent(event: IEvent) {
  try {
    return await EventModel.create(event)
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getEventByUser(userId: string) {
  try {
    const eventByID = await EventModel.find({ user: userId });
    return eventByID
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function deteleEvent(id: string) {
  try {
    return await EventModel.deleteOne({ id })
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function getLatestEventsForUser(userId: string) {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  try {
    const events = await EventModel.find(
      {
        user: userId,
        start: {
          $gte: firstDayOfMonth,
          $lte: lastDayOfMonth
        },
      })
      .sort({ start: -1 })
      .limit(4)
      .exec();

    return events;
  } catch (error) {
    throw error
  }
}
