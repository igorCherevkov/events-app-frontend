import { AxiosResponse } from "axios";

import { $host } from "./";
import { Booking, Event } from "../types";

export const getAllEvents = async (): Promise<AxiosResponse<Event[]>> => {
  return await $host.get("/events");
};

export const fetchSearchEvents = async (
  query: string
): Promise<AxiosResponse<Event[]>> => {
  return await $host.get(`/events/search?query=${query}`);
};

export const getEventsForUser = async (
  userId: number
): Promise<AxiosResponse<Event[]>> => {
  return await $host.get(`/events/${userId}`);
};

export const fetchUnsubscribeFromEvent = async (
  userId: number,
  eventId: number
): Promise<AxiosResponse<string>> => {
  return await $host.delete(`/events/${userId}/${eventId}`);
};

export const fetchSignUpForEvent = async (
  userId: number,
  eventId: number
): Promise<AxiosResponse<Booking>> => {
  return await $host.post("/events/sign-to-event", { userId, eventId });
};

export const fetchDeleteEvent = async (
  eventId: number
): Promise<AxiosResponse<string>> => {
  return await $host.delete(`/events/${eventId}`);
};

export const fetchEditEvent = async (
  eventId: number,
  name?: string,
  description?: string,
  publication?: boolean,
  categoryNames?: string[],
  date?: string
): Promise<AxiosResponse<Event>> => {
  return await $host.patch(`/events/${eventId}`, {
    name,
    description,
    publication,
    categoryNames,
    date,
  });
};

export const fetchCreateEvent = async (
  name: string,
  description: string,
  date: string
): Promise<AxiosResponse<Event>> => {
  return await $host.post("/events/create-event", { name, description, date });
};
