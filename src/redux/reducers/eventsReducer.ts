import { EventsActions, EventsState } from "../../types/redux/eventsTypes";
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
} from "../actions/eventsActions";

const initialState = {
  isLoading: false,
  events: [],
  userEvents: [],
  searchedEvents: [],
  error: null,
};

export const eventsReducer = (
  state: EventsState = initialState,
  action: EventsActions
) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return { ...state, isLoading: true };
    case FETCH_EVENTS_SUCCESS:
      return { ...state, isLoading: false, events: action.payload };
    case FETCH_EVENTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case FETCH_USER_EVENTS:
      return { ...state, isLoading: true };
    case FETCH_USER_EVENTS_SUCCESS:
      return { ...state, isLoading: false, userEvents: action.payload };
    case FETCH_USER_EVENTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case UNSUBSCRIBE_FROM_EVENT:
      return { ...state, isLoading: true };
    case UNSUBSCRIBE_FROM_EVENT_SUCCESS: {
      const { eventId } = action.payload;
      return {
        ...state,
        isLoading: false,
        userEvents: state.userEvents.filter((event) => event.id !== eventId),
      };
    }
    case UNSUBSCRIBE_FROM_EVENT_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case SIGNUP_FOR_EVENT:
      return { ...state, isLoading: true };
    case SIGNUP_FOR_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SIGNUP_FOR_EVENT_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case DELETE_EVENT:
      return { ...state, isLoading: true };
    case DELETE_EVENT_SUCCESS: {
      const { eventId } = action.payload;
      return {
        ...state,
        isLoading: false,
        events: state.events.filter((event) => event.id !== eventId),
        userEvents: state.userEvents.filter((event) => event.id !== eventId),
      };
    }
    case DELETE_EVENT_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case EDIT_EVENT:
      return { ...state, isLoading: true };
    case EDIT_EVENT_SUCCESS: {
      const updatedEvent = action.payload;
      return {
        ...state,
        isLoading: false,
        events: state.events.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        ),
        userEvents: state.userEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        ),
      };
    }
    case EDIT_EVENT_FAILURE:
      return { ...state, isLoading: false };
    case CREATE_EVENT:
      return { ...state, isLoading: true };
    case CREATE_EVENT_SUCCESS: {
      const newEvent = action.payload;
      return {
        ...state,
        isLoading: false,
        events: [...state.events, newEvent],
        userEvents: [...state.userEvents, newEvent],
      };
    }
    case CREATE_EVENT_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case SEARCH_EVENTS:
      return { ...state, isLoading: true };
    case SEARCH_EVENTS_SUCCESS: {
      const events = action.payload;
      return { ...state, isLoading: false, searchedEvents: [...events] };
    }
    case SEARCH_EVENTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case RESET_SEARCHED_EVENTS:
      return { ...state, searchedEvents: [] };
    default:
      return state;
  }
};
