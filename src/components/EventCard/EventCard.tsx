import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { Event, Roles, User } from "../../types";
import { transformDate } from "../../utils/transformDate";
import { AppDispatch } from "../../redux/store";
import {
  deleteEvent,
  editEvent,
  signUpForEvent,
  unsubscribeFromEvent,
} from "../../redux/actions/eventsActions";
import { Error } from "../../components/Error/Error";
import styles from "./EventCard.module.css";

export const EventCard = ({
  event,
  user,
  isConfirmation,
  isProfile,
}: {
  event: Event;
  user: (User & { token: string }) | null;
  isConfirmation?: boolean;
  isProfile: boolean;
}) => {
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date);
  const [description, setDescription] = useState(event.description);
  const [categories, setCategories] = useState(
    event.categories
      ? event.categories.map((category) => category.name).join(", ")
      : ""
  );
  const [publication, setPublication] = useState(event.publication || false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const isAdmin = user?.role === Roles.admin;

  const handleUnsubscribe = useCallback(async () => {
    if (user?.id) {
      dispatch(unsubscribeFromEvent(user?.id, event.id));
    }
  }, [dispatch, user?.id, event.id]);

  const handleSubscribe = useCallback(async () => {
    if (user?.id) {
      dispatch(signUpForEvent(user?.id, event.id));
    }
  }, [dispatch, user?.id, event.id]);

  const handleDelete = useCallback(async () => {
    if (isAdmin) {
      dispatch(deleteEvent(event.id));
    }
  }, [dispatch, isAdmin, event.id]);

  const handleDoubleClick = (field: string) => {
    if (isAdmin) {
      setIsEditing(true);
      if (field === "name") {
        setName(event.name);
      } else if (field === "date") {
        setDate(event.date);
      } else if (field === "description") {
        setDescription(event.description);
      } else if (field === "categories") {
        setCategories(
          event.categories.map((category) => category.name).join(", ")
        );
      }
    }
  };

  const handleCategoriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategories(e.target.value);
  };

  const handlePublishedChange = () => {
    setPublication((prevState) => !prevState);
  };

  const handleUpdateEvent = () => {
    const updatedCategories = categories
      .split(",")
      .map((category) => category.trim());

    const updatedDate = new Date(date).toISOString();

    if (
      name !== event.name ||
      description !== event.description ||
      updatedDate !== new Date(event.date).toISOString() ||
      publication !== event.publication ||
      JSON.stringify(updatedCategories) !==
        JSON.stringify(event.categories.map((cat) => cat.name))
    ) {
      dispatch(
        editEvent(
          event.id,
          name,
          description,
          publication,
          updatedCategories,
          updatedDate
        )
      );
    }

    setIsEditing(false);
  };

  return (
    <div className={styles.eventCard}>
      <div className={styles.metaContainer}>
        <div
          className={styles.categoriesContainer}
          onDoubleClick={() => handleDoubleClick("categories")}
        >
          {isEditing ? (
            <input
              type="text"
              value={categories}
              onChange={handleCategoriesChange}
            />
          ) : (
            event.categories?.map((category) => (
              <span key={category.id} className={styles.spanCategory}>
                #{category.name}
              </span>
            ))
          )}
        </div>
        <span
          className={styles.spanDate}
          onDoubleClick={() => handleDoubleClick("date")}
        >
          {isEditing ? (
            <input
              type="date"
              value={transformDate(date)}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          ) : (
            transformDate(date)
          )}
        </span>
      </div>
      <h1
        className={styles.eventTitle}
        onDoubleClick={() => handleDoubleClick("name")}
      >
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          name
        )}
      </h1>
      <span
        className={styles.description}
        onDoubleClick={() => handleDoubleClick("description")}
      >
        {isEditing ? (
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          description
        )}
      </span>

      {isEditing && isAdmin && (
        <div className={styles.checkboxContainer}>
          <label>
            <input
              type="checkbox"
              checked={publication}
              onChange={handlePublishedChange}
            />
            Опубликовано
          </label>
        </div>
      )}

      {user && isConfirmation && !isAdmin && (
        <Error message="You are already registered" severity="info" />
      )}
      {user && !isConfirmation && !isAdmin && (
        <button
          className={styles.button}
          onClick={isProfile ? handleUnsubscribe : handleSubscribe}
        >
          {isProfile ? "I won't go" : "Sign up for an event"}
        </button>
      )}
      {user && isProfile && isAdmin && (
        <>
          {isEditing ? (
            <button className={styles.button} onClick={handleUpdateEvent}>
              Save changes
            </button>
          ) : (
            <button
              className={styles.button}
              onClick={() => setIsEditing(true)}
            >
              Change event
            </button>
          )}
          <button className={styles.button} onClick={handleDelete}>
            Delete event
          </button>
        </>
      )}
    </div>
  );
};
