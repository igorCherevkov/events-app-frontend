import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
} from "./consts/routes";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { AppDispatch } from "./redux/store";
import { checkAuth } from "./redux/actions/authActions";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path={HOME_ROUTE} element={<HomePage />}></Route>
        <Route path={LOGIN_ROUTE} element={<LoginPage />}></Route>
        <Route path={REGISTRATION_ROUTE} element={<RegistrationPage />}></Route>
        <Route path={PROFILE_ROUTE} element={<ProfilePage />}></Route>
      </Routes>
    </Router>
  );
};
