import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/reducers/rootReducer";
import { AppDispatch } from "../../redux/store";
import {
  createEvent,
  fetchUserEvents,
  resetSearchedEvents,
} from "../../redux/actions/eventsActions";
import { Header } from "../../components/Header/Header";
import { Error } from "../../components/Error/Error";
import { Loader } from "../../components/Loader/Loader";
import { EventCard } from "../../components/EventCard/EventCard";
import { deleteUser } from "../../redux/actions/usersActions";
import { Roles } from "../../types";
import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.authReducer);
  const events = useSelector((state: RootState) => state.eventsReducer);
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [showCreateEventForm, setShowCreateEventForm] = useState(false);
  const [showDeleteUserInput, setShowDeleteUserInput] = useState(false);

  const isEmpty = events.userEvents.length === 0;
  const isError = events.error !== null && events.error !== undefined;
  const isLoading = events.isLoading;
  const isAdmin = user.user?.role === Roles.admin;
  const isSearchedEmpty = events.searchedEvents.length === 0;

  useEffect(() => {
    if (user.user?.id) {
      dispatch(fetchUserEvents(user.user?.id));
    }

    return () => {
      dispatch(resetSearchedEvents());
    };
  }, [dispatch, user.user?.id]);

  const handleCreateEvent = useCallback(() => {
    if (name && description && date && isAdmin) {
      dispatch(createEvent(name, description, date));
      setName("");
      setDescription("");
      setDate("");
      setShowCreateEventForm(false);
    }
  }, [date, description, dispatch, name, isAdmin]);

  const handleDeleteUser = useCallback(() => {
    if (userIdToDelete && isAdmin) {
      dispatch(deleteUser(Number(userIdToDelete)));
      setUserIdToDelete("");
      setShowDeleteUserInput(false);
    }
  }, [userIdToDelete, dispatch, isAdmin]);

  return (
    <div className={styles.profilePageContainer}>
      <Header />
      {isError && <Error message={events.error} severity="error" />}
      {!isError && isLoading && <Loader />}
      {!isError && isEmpty && (
        <Error message="You are not registered anywhere yet" severity="info" />
      )}
      {!isEmpty && (
        <main className={styles.mainWrap}>
          {isAdmin && (
            <div className={styles.changeButtons}>
              <button
                className={styles.changeButton}
                onClick={() => {
                  setShowCreateEventForm((prev) => !prev);
                  setShowDeleteUserInput(false);
                  setUserIdToDelete("");
                }}
              >
                Create an event
              </button>
              <button
                className={styles.changeButton}
                onClick={() => {
                  setShowDeleteUserInput((prev) => !prev);
                  setShowCreateEventForm(false);
                  setDescription("");
                  setName("");
                }}
              >
                Delete user
              </button>
            </div>
          )}

          {showCreateEventForm && isAdmin && (
            <div className={styles.eventFormContainer}>
              <div className={styles.createEventForm}>
                <input
                  type="text"
                  placeholder="Название мероприятия"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Описание мероприятия"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Дата мероприятия"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <button
                  className={styles.eventButton}
                  onClick={handleCreateEvent}
                >
                  Create
                </button>
              </div>
            </div>
          )}

          {showDeleteUserInput && isAdmin && (
            <div className={styles.eventFormContainer}>
              <div className={styles.deleteUserInput}>
                <input
                  type="text"
                  placeholder="ID пользователя для удаления"
                  value={userIdToDelete}
                  onChange={(e) => setUserIdToDelete(e.target.value)}
                />
                <button
                  className={styles.eventButton}
                  onClick={handleDeleteUser}
                >
                  Delete user
                </button>
              </div>
            </div>
          )}

          <div className={styles.mainContainer}>
            {isSearchedEmpty
              ? events.userEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    user={user.user}
                    isProfile={true}
                  />
                ))
              : events.searchedEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    user={user.user}
                    isProfile={true}
                  />
                ))}
          </div>
        </main>
      )}
    </div>
  );
};
