import { AxiosError } from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import { UNKNOWN_ERROR } from "../../consts/http";
import {
  CREATE_EVENT,
  createEventFailure,
  createEventSuccess,
  DELETE_EVENT,
  deleteEventFailure,
  deleteEventSuccess,
  EDIT_EVENT,
  editEventFailure,
  editEventSuccess,
  FETCH_EVENTS,
  FETCH_USER_EVENTS,
  fetchEventsFailure,
  fetchEventsSuccess,
  fetchUserEventsFailure,
  fetchUserEventsSuccess,
  SEARCH_EVENTS,
  searchEventsFailure,
  searchEventsSuccess,
  SIGNUP_FOR_EVENT,
  signUpForEventFailure,
  signUpForEventSuccess,
  UNSUBSCRIBE_FROM_EVENT,
  unsubscribeFromEventFailure,
  unsubscribeFromEventSuccess,
} from "../actions/eventsActions";
import { Event } from "../../types";
import {
  fetchCreateEvent,
  fetchDeleteEvent,
  fetchEditEvent,
  fetchSearchEvents,
  fetchSignUpForEvent,
  fetchUnsubscribeFromEvent,
  getAllEvents,
  getEventsForUser,
} from "../../http/events";
import {
  CreateEvent,
  DeleteEvent,
  EditEvent,
  FetchUserEvents,
  SearchEvents,
  SignUpForEvent,
  UnsubscribeFromEvent,
} from "../../types/redux/eventsTypes";

function* fetchEvents() {
  try {
    const res: { data: Event[] } = yield call(getAllEvents);

    yield put(fetchEventsSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(fetchEventsFailure(payload));
  }
}

function* fetchUserEvents(action: FetchUserEvents) {
  try {
    const { userId } = action.payload;
    const res: { data: Event[] } = yield call(getEventsForUser, userId);

    yield put(fetchUserEventsSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(fetchUserEventsFailure(payload));
  }
}

function* unsubscribeFromEvent(action: UnsubscribeFromEvent) {
  try {
    const { userId, eventId } = action.payload;

    yield call(fetchUnsubscribeFromEvent, userId, eventId);
    yield put(unsubscribeFromEventSuccess(userId, eventId));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(unsubscribeFromEventFailure(payload));
  }
}

function* signUpForEvent(action: SignUpForEvent) {
  try {
    const { userId, eventId } = action.payload;
    const res: { data: Event } = yield call(
      fetchSignUpForEvent,
      userId,
      eventId
    );

    yield put(signUpForEventSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(signUpForEventFailure(payload));
  }
}

function* deleteEvent(action: DeleteEvent) {
  try {
    const { eventId } = action.payload;

    yield call(fetchDeleteEvent, eventId);
    yield put(deleteEventSuccess(eventId));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(deleteEventFailure(payload));
  }
}

function* editEvent(action: EditEvent) {
  try {
    const { eventId, name, description, date, categoryNames, publication } =
      action.payload;

    const res: { data: Event } = yield call(
      fetchEditEvent,
      eventId,
      name,
      description,
      publication,
      categoryNames,
      date
    );

    yield put(editEventSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(editEventFailure(payload));
  }
}

function* createEvent(action: CreateEvent) {
  try {
    const { name, description, date } = action.payload;

    const res: { data: Event } = yield call(
      fetchCreateEvent,
      name,
      description,
      date
    );

    yield put(createEventSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(createEventFailure(payload));
  }
}

function* searchEvents(action: SearchEvents) {
  try {
    const { query } = action.payload;

    const res: { data: Event[] } = yield call(fetchSearchEvents, query);

    yield put(searchEventsSuccess(res.data));
  } catch (error) {
    const payload = error instanceof AxiosError ? error.message : UNKNOWN_ERROR;
    yield put(searchEventsFailure(payload));
  }
}

export function* watchEventsSaga() {
  yield all([
    fork(function* () {
      yield takeLatest(FETCH_EVENTS, fetchEvents);
    }),
    fork(function* () {
      yield takeLatest(FETCH_USER_EVENTS, fetchUserEvents);
    }),
    fork(function* () {
      yield takeLatest(UNSUBSCRIBE_FROM_EVENT, unsubscribeFromEvent);
    }),
    fork(function* () {
      yield takeLatest(SIGNUP_FOR_EVENT, signUpForEvent);
    }),
    fork(function* () {
      yield takeLatest(DELETE_EVENT, deleteEvent);
    }),
    fork(function* () {
      yield takeLatest(EDIT_EVENT, editEvent);
    }),
    fork(function* () {
      yield takeLatest(CREATE_EVENT, createEvent);
    }),
    fork(function* () {
      yield takeLatest(SEARCH_EVENTS, searchEvents);
    }),
  ]);
}
