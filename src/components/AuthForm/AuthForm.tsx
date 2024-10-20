import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLoginCircleFill } from "react-icons/ri";

import { AppDispatch } from "../../redux/store";
import { HOME_ROUTE } from "../../consts/routes";
import { auth } from "../../redux/actions/authActions";
import styles from "./AuthForm.module.css";

type AuthProps = {
  title: string;
  button: string;
  link: string;
  linkText: string;
  spanText: string;
};

export const AuthForm = (props: AuthProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);
      const { email, password } = Object.fromEntries(formData) as Record<
        string,
        string
      >;

      try {
        let isRegistration = null;
        isRegistration = props.title !== "LOGIN";

        dispatch(auth(email, password, isRegistration));

        navigate(HOME_ROUTE);
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, navigate, props.title]
  );

  return (
    <div className={styles.formWrap}>
      <div className={styles.wrapContainer}>
        <form onSubmit={handleSubmitForm} className={styles.formContainer}>
          <h1 className={styles.formTitle}>{props.title}</h1>
          <div className={styles.formInputContainer}>
            <input
              type="text"
              className={styles.inputContainerInput}
              placeholder="Email"
              name="email"
              required
            />
            <RiLoginCircleFill className={styles.inputContainerImg} />
          </div>
          <div className={styles.formInputContainer}>
            <input
              type="password"
              className={styles.inputContainerInput}
              placeholder="Password"
              name="password"
              required
            />
            <RiLockPasswordFill className={styles.inputContainerImg} />
          </div>
          <button type="submit" className={styles.inputContainerButton}>
            {props.button}
          </button>
          <div className={styles.inputContainerChangeForm}>
            <span className={styles.changeFormText}>{props.spanText}</span>
            <Link to={props.link} className={styles.changeFormLink}>
              {props.linkText}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
