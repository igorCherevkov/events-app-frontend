import { Event } from "../";
import {
  CREATE_EVENT,
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_SUCCESS,
  DELETE_EVENT,
  DELETE_EVENT_FAILURE,
  DELETE_EVENT_SUCCESS,
  EDIT_EVENT,
  EDIT_EVENT_FAILURE,
  EDIT_EVENT_SUCCESS,
  FETCH_EVENTS,
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_SUCCESS,
  FETCH_USER_EVENTS,
  FETCH_USER_EVENTS_FAILURE,
  FETCH_USER_EVENTS_SUCCESS,
  RESET_SEARCHED_EVENTS,
  SEARCH_EVENTS,
  SEARCH_EVENTS_FAILURE,
  SEARCH_EVENTS_SUCCESS,
  SIGNUP_FOR_EVENT,
  SIGNUP_FOR_EVENT_FAILURE,
  SIGNUP_FOR_EVENT_SUCCESS,
  UNSUBSCRIBE_FROM_EVENT,
  UNSUBSCRIBE_FROM_EVENT_FAILURE,
  UNSUBSCRIBE_FROM_EVENT_SUCCESS,
} from "../../redux/actions/eventsActions";

export type EventsState = {
  isLoading: boolean;
  events: Event[];
  userEvents: Event[];
  searchedEvents: Event[];
  error: string | null;
};

export type FetchEvents = {
  type: typeof FETCH_EVENTS;
};

export type FetchEventsSuccess = {
  type: typeof FETCH_EVENTS_SUCCESS;
  payload: Event[];
};

export type FetchEventsFailure = {
  type: typeof FETCH_EVENTS_FAILURE;
  payload: string;
};

export type FetchUserEvents = {
  type: typeof FETCH_USER_EVENTS;
  payload: {
    userId: number;
  };
};

export type FetchUserEventsSuccess = {
  type: typeof FETCH_USER_EVENTS_SUCCESS;
  payload: Event[];
};

export type FetchUserEventsFailure = {
  type: typeof FETCH_USER_EVENTS_FAILURE;
  payload: string;
};

export type UnsubscribeFromEvent = {
  type: typeof UNSUBSCRIBE_FROM_EVENT;
  payload: { userId: number; eventId: number };
};

export type UnsubscribeFromEventSuccess = {
  type: typeof UNSUBSCRIBE_FROM_EVENT_SUCCESS;
  payload: { userId: number; eventId: number };
};

export type UnsubscribeFromEventFailure = {
  type: typeof UNSUBSCRIBE_FROM_EVENT_FAILURE;
  payload: string;
};

export type SignUpForEvent = {
  type: typeof SIGNUP_FOR_EVENT;
  payload: { userId: number; eventId: number };
};

export type SignUpForEventSuccess = {
  type: typeof SIGNUP_FOR_EVENT_SUCCESS;
  payload: Event;
};

export type SignUpForEventFailure = {
  type: typeof SIGNUP_FOR_EVENT_FAILURE;
  payload: string;
};

export type DeleteEvent = {
  type: typeof DELETE_EVENT;
  payload: { eventId: number };
};

export type DeleteEventSuccess = {
  type: typeof DELETE_EVENT_SUCCESS;
  payload: { eventId: number };
};

export type DeleteEventFailure = {
  type: typeof DELETE_EVENT_FAILURE;
  payload: string;
};

export type EditEvent = {
  type: typeof EDIT_EVENT;
  payload: {
    eventId: number;
    name?: string;
    description?: string;
    publication?: boolean;
    categoryNames?: string[];
    date?: string;
  };
};

export type EditEventSuccess = {
  type: typeof EDIT_EVENT_SUCCESS;
  payload: Event;
};

export type EditEventFailure = {
  type: typeof EDIT_EVENT_FAILURE;
  payload: string;
};

export type CreateEvent = {
  type: typeof CREATE_EVENT;
  payload: { name: string; description: string; date: string };
};

export type CreateEventSuccess = {
  type: typeof CREATE_EVENT_SUCCESS;
  payload: Event;
};

export type CreateEventFailure = {
  type: typeof CREATE_EVENT_FAILURE;
  payload: string;
};

export type SearchEvents = {
  type: typeof SEARCH_EVENTS;
  payload: { query: string };
};

export type SearchEventsSuccess = {
  type: typeof SEARCH_EVENTS_SUCCESS;
  payload: Event[];
};

export type SearchEventsFailure = {
  type: typeof SEARCH_EVENTS_FAILURE;
  payload: string;
};

export type ResetSearchedEvents = {
  type: typeof RESET_SEARCHED_EVENTS;
};

export type EventsActions =
  | FetchEvents
  | FetchEventsSuccess
  | FetchEventsFailure
  | FetchUserEvents
  | FetchUserEventsSuccess
  | FetchUserEventsFailure
  | UnsubscribeFromEvent
  | UnsubscribeFromEventSuccess
  | UnsubscribeFromEventFailure
  | SignUpForEvent
  | SignUpForEventSuccess
  | SignUpForEventFailure
  | DeleteEvent
  | DeleteEventSuccess
  | DeleteEventFailure
  | EditEvent
  | EditEventSuccess
  | EditEventFailure
  | CreateEvent
  | CreateEventSuccess
  | CreateEventFailure
  | SearchEvents
  | SearchEventsSuccess
  | SearchEventsFailure
  | ResetSearchedEvents;
