import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from "../../consts/routes";
import { RootState } from "../../redux/reducers/rootReducer";
import { AppDispatch } from "../../redux/store";
import { logout } from "../../redux/actions/authActions";
import styles from "./Header.module.css";
import { SearchBar } from "../SearchBar/SearchBar";

export const Header = () => {
  const user = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate(HOME_ROUTE);
  }, [dispatch, navigate]);

  return (
    <div className={styles.headerContainer}>
      <Link to={HOME_ROUTE} className={styles.headerLogo}>
        ChatApp
      </Link>
      <div className={styles.headerButtons}>
        <SearchBar />
        {user.isAuth ? (
          <>
            <button className={styles.headerButton} onClick={handleLogout}>
              Logout
            </button>
            {user.user?.confirmation && (
              <Link to={PROFILE_ROUTE} className={styles.headerButton}>
                Profile
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to={REGISTRATION_ROUTE} className={styles.headerButton}>
              Registration
            </Link>
            <Link to={LOGIN_ROUTE} className={styles.headerButton}>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
