import { Response } from "express";
import { AuthRequest } from "../auth/auth.types";
import { createEvent, deteleEvent, getEventByUser, getLatestEventsForUser } from "./event.service";

export async function createEventHandler(req: AuthRequest, res: Response) {
  const data = req.body
  const user = req.user
  try {
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const event = await createEvent({ ...data, 'user': user?.id })
    res.status(201).json({ message: "Event created successfully", data: event })
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating Event', error: error.message })
  }
}

export async function getEventByUserHandler(req: AuthRequest, res: Response) {
  const user = req.user
  try {
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const events = await getEventByUser(user.id)
    res.status(201).json(events)
  } catch (error: any) {
    res.status(400).json({ message: 'Error Get Event', error: error.message })
  }
}

export async function deteleEventHandler(req: AuthRequest, res: Response) {
  const data = req.body
  try {
    const event = await deteleEvent(data.id)
    res.status(201).json({ message: 'Event delete successfully' })
  } catch (error: any) {
    res.status(400).json({ message: 'Error Delete', error: error.message })
  }
}

export async function getLatestEventsForUserHandler(req: AuthRequest, res: Response) {
  const user = req.user
  try {
    const events = await getLatestEventsForUser(user?.id)
    res.status(200).json(events)

  } catch (error: any) {
    res.status(400).json({ message: 'Error Get Event', error: error.message })

  }
}
