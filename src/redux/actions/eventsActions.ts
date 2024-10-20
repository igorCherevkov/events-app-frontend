import { Event } from "../../types";

export const FETCH_EVENTS = "FETCH_EVENTS";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_FAILURE = "FETCH_EVENTS_FAILURE";
export const FETCH_USER_EVENTS = "FETCH_USER_EVENTS";
export const FETCH_USER_EVENTS_SUCCESS = "FETCH_USER_EVENTS_SUCCESS";
export const FETCH_USER_EVENTS_FAILURE = "FETCH_USER_EVENTS_FAILURE";
export const UNSUBSCRIBE_FROM_EVENT = "UNSUBSCRIBE_FROM_EVENT";
export const UNSUBSCRIBE_FROM_EVENT_SUCCESS = "UNSUBSCRIBE_FROM_EVENT_SUCCESS";
export const UNSUBSCRIBE_FROM_EVENT_FAILURE = "UNSUBSCRIBE_FROM_EVENT_FAILURE";
export const SIGNUP_FOR_EVENT = "SIGNUP_FOR_EVENT";
export const SIGNUP_FOR_EVENT_SUCCESS = "SIGNUP_FOR_EVENT_SUCCESS";
export const SIGNUP_FOR_EVENT_FAILURE = "SIGNUP_FOR_EVENT_FAILURE";
export const DELETE_EVENT = "DELETE_EVENT";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_FAILURE = "DELETE_EVENT_FAILURE";
export const EDIT_EVENT = "EDIT_EVENT";
export const EDIT_EVENT_SUCCESS = "EDIT_EVENT_SUCCESS";
export const EDIT_EVENT_FAILURE = "EDIT_EVENT_FAILURE";
export const CREATE_EVENT = "CREATE_EVENT";
export const CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
export const CREATE_EVENT_FAILURE = "CREATE_EVENT_FAILURE";
export const SEARCH_EVENTS = "SEARCH_EVENTS";
export const SEARCH_EVENTS_SUCCESS = "SEARCH_EVENTS_SUCCESS";
export const SEARCH_EVENTS_FAILURE = "SEARCH_EVENTS_FAILURE";
export const RESET_SEARCHED_EVENTS = "RESET_SEARCHED_EVENTS";

export const fetchEvents = () => ({
  type: FETCH_EVENTS,
});

export const fetchEventsSuccess = (payload: Event[]) => ({
  type: FETCH_EVENTS_SUCCESS,
  payload,
});

export const fetchEventsFailure = (payload: string) => ({
  type: FETCH_EVENTS_FAILURE,
  payload,
});

export const fetchUserEvents = (userId: number) => ({
  type: FETCH_USER_EVENTS,
  payload: {
    userId,
  },
});

export const fetchUserEventsSuccess = (payload: Event[]) => ({
  type: FETCH_USER_EVENTS_SUCCESS,
  payload,
});

export const fetchUserEventsFailure = (payload: string) => ({
  type: FETCH_USER_EVENTS_FAILURE,
  payload,
});

export const unsubscribeFromEvent = (userId: number, eventId: number) => ({
  type: UNSUBSCRIBE_FROM_EVENT,
  payload: { userId, eventId },
});

export const unsubscribeFromEventSuccess = (
  userId: number,
  eventId: number
) => ({
  type: UNSUBSCRIBE_FROM_EVENT_SUCCESS,
  payload: { userId, eventId },
});

export const unsubscribeFromEventFailure = (payload: string) => ({
  type: UNSUBSCRIBE_FROM_EVENT_FAILURE,
  payload,
});

export const signUpForEvent = (userId: number, eventId: number) => ({
  type: SIGNUP_FOR_EVENT,
  payload: { userId, eventId },
});

export const signUpForEventSuccess = (payload: Event) => ({
  type: SIGNUP_FOR_EVENT_SUCCESS,
  payload,
});

export const signUpForEventFailure = (payload: string) => ({
  type: SIGNUP_FOR_EVENT_FAILURE,
  payload,
});

export const deleteEvent = (eventId: number) => ({
  type: DELETE_EVENT,
  payload: { eventId },
});

export const deleteEventSuccess = (eventId: number) => ({
  type: DELETE_EVENT_SUCCESS,
  payload: { eventId },
});

export const deleteEventFailure = (payload: string) => ({
  type: DELETE_EVENT_FAILURE,
  payload,
});

export const editEvent = (
  eventId: number,
  name?: string,
  description?: string,
  publication?: boolean,
  categoryNames?: string[],
  date?: string
) => ({
  type: EDIT_EVENT,
  payload: { eventId, name, description, publication, categoryNames, date },
});

export const editEventSuccess = (payload: Event) => ({
  type: EDIT_EVENT_SUCCESS,
  payload,
});

export const editEventFailure = (payload: string) => ({
  type: EDIT_EVENT_FAILURE,
  payload,
});

export const createEvent = (
  name: string,
  description: string,
  date: string
) => ({
  type: CREATE_EVENT,
  payload: { name, description, date },
});

export const createEventSuccess = (payload: Event) => ({
  type: CREATE_EVENT_SUCCESS,
  payload,
});

export const createEventFailure = (payload: string) => ({
  type: CREATE_EVENT_FAILURE,
  payload,
});

export const searchEvents = (query: string) => ({
  type: SEARCH_EVENTS,
  payload: { query },
});

export const searchEventsSuccess = (payload: Event[]) => ({
  type: SEARCH_EVENTS_SUCCESS,
  payload,
});

export const searchEventsFailure = (payload: string) => ({
  type: SEARCH_EVENTS_FAILURE,
  payload,
});

export const resetSearchedEvents = () => ({
  type: RESET_SEARCHED_EVENTS,
});
