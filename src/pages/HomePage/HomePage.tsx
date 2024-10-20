import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/reducers/rootReducer";
import { AppDispatch } from "../../redux/store";
import {
  fetchEvents,
  fetchUserEvents,
  resetSearchedEvents,
} from "../../redux/actions/eventsActions";
import { Header } from "../../components/Header/Header";
import { Error } from "../../components/Error/Error";
import { Loader } from "../../components/Loader/Loader";
import { EventCard } from "../../components/EventCard/EventCard";
import { Roles } from "../../types";
import styles from "./HomePage.module.css";

export const HomePage = () => {
  const events = useSelector((state: RootState) => state.eventsReducer);
  const user = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch<AppDispatch>();

  const isEmpty = events.events.length === 0;
  const isError = events.error !== null && events.error !== undefined;
  const isLoading = events.isLoading;
  const isAuth = user.isAuth;
  const confirmation = user.user?.confirmation;
  const isAdmin = user.user?.role === Roles.admin;
  const isSearchedEmpty = events.searchedEvents.length === 0;

  useEffect(() => {
    if (isAdmin && user.user?.id) {
      dispatch(fetchUserEvents(user.user?.id));
    } else {
      dispatch(fetchEvents());
    }

    return () => {
      dispatch(resetSearchedEvents());
    };
  }, [dispatch, user.user?.id, isAdmin]);

  return (
    <div className={styles.homePageContainer}>
      <Header />
      {isError && <Error message={events.error} severity="error" />}
      {!isError && isLoading && <Loader />}
      {isAuth && !confirmation && (
        <Error message="Confirm your email" severity="info" />
      )}
      {!isError && isEmpty && <Error message="No events" severity="info" />}
      {!isEmpty && (
        <main className={styles.mainWrap}>
          <div className={styles.mainContainer}>
            {isSearchedEmpty
              ? events.events.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    user={user.user}
                    isConfirmation={events.userEvents.some(
                      (userEvent) => userEvent.id === event.id
                    )}
                    isProfile={false}
                  />
                ))
              : events.searchedEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    user={user.user}
                    isConfirmation={events.userEvents.some(
                      (userEvent) => userEvent.id === event.id
                    )}
                    isProfile={false}
                  />
                ))}
          </div>
        </main>
      )}
    </div>
  );
};
