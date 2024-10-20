import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../redux/store";
import { searchEvents } from "../../redux/actions/eventsActions";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(searchEvents(query));
    },
    [dispatch, query]
  );

  return (
    <form onSubmit={handleSearch} className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search for events"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};
