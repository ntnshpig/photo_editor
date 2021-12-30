import React, { useState, useEffect, useReducer, useContext } from "react";
import AuthContext from "../../Storage/auth-context";
import scss from "./SignIn.module.scss";
import { useNavigate } from "react-router";
import Loader from "react-loader-spinner";
import { message } from "antd";
import api from "../../Services/api";
import Logo from "../../Storage/img/Logo.svg"

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length >= 4 && action.val.includes("@"),
    };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isValid: state.value.trim().length >= 4 && state.value.includes("@"),
    };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length >= 6 };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isValid: state.value.trim().length >= 6 };
  }
  return { value: "", isValid: false };
};

const SignIn = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 100);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "BLUR" });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // if (formIsValid) {
    //   try {
    //     const response = await api().post("api/auth/login", {
    //       email: emailState.value,
    //       password: passwordState.value,
    //     });
    //     if (response.status === 200) {
    //       message.success("Вход произведён успешно!");
    //       authCtx.login(response.data);
    //       navigate("/profile");
    //     } else if (response.status === 403) {
    //       message.error("Пользователь не найден!");
    //     } else if (response.status === 400) {
    //       message.error("Вы ещё не подтвердили почту!");
    //     } else {
    //       throw new Error(response.data.message);
    //     }
    //   } catch (error) {
    //     message.error("Данные не верные!");
    //   }
    // }
    setIsLoading(false);
  };

  return (
    <div className={scss.SignInDiv}>
      <div className={scss.SignIn}>
        <div className={scss.Intro}>
        <img src={Logo} className={scss.IntroLogo} alt="Logo"/>
          <span className={scss.IntroText}>Webster</span>
        </div>

        {isLoading && (
          <Loader
            type="TailSpin"
            color="#5e81fe"
            height={100}
            width={100}
            timeout={Infinity}
            className={scss.Loader}
          />
        )}
        {!isLoading && (
          <form onSubmit={submitHandler}>
            <span className={scss.EnterData}>Sign In</span>
            <input
              type="email"
              value={emailState.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
              placeholder="Email"
            />
            <input
              type="password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
              placeholder="Password"
            />
            <button
              type="submit"
              className={scss.button}
              disabled={!formIsValid}
            >
              Sign In
            </button>
            <span
              className={scss.ForgotPass}
              onClick={() => navigate("/forgot_password")}
            >
              Forgot password?
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
