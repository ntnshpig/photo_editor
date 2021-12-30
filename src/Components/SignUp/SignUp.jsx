import React, {
  useRef,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import AuthContext from "../../Storage/auth-context";
import scss from "./SignUp.module.scss";
import { useNavigate } from "react-router";
import Loader from "react-loader-spinner";
import { Checkbox, message } from "antd";
import api from "../../Services/api";
import userPolicy from "./UserPolicy";
import Logo from "../../Storage/img/Logo.svg"

const SignUp = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const full_nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const password_confirmationRef = useRef("");

  function onChecked(e) {
    setIsChecked(e.target.checked);
  }


  const submitHandler = async (event) => {
    event.preventDefault();
    if (!isChecked) {
      message.info("Примите пользовательское соглашение!");
      return;
    }
    if (passwordRef.current.value.length < 6) {
      message.error("Пароль должен быть больше 6 символов!");
      return;
    }
    if (passwordRef.current.value !== password_confirmationRef.current.value) {
      message.error("Пароли не совпадают!");
      return;
    }
    setIsLoading(true);
    const user = {
      name: full_nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmationRef.current.value,
    };
    try {
      // await api().get("/sanctum/csrf-cookie");
      const response = await api().post("api/auth/register", {
        ...user,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      } else {
        message.success("Sign Up succed! Now login");
        navigate("/signIn");
      }
    } catch (error) {
      message.error(error.toString());
    }
    setIsLoading(false);
  };

  return (
    <div className={scss.SignUpDiv}>
      <div className={scss.SignUp}>
      <div className={scss.Intro}>
        <img src={Logo} className={scss.IntroLogo} alt="Logo"/>
          <span className={scss.IntroText}>Webster</span>
        </div>
        {isLoading && (
          <Loader
            type="TailSpin"
            color="#5e81feF"
            height={100}
            width={100}
            timeout={Infinity}
            className={scss.Loader}
          />
        )}
        {!isLoading && (
          <form onSubmit={submitHandler}>
            <span className={scss.EnterData}>Sign Up</span>
            <input type="text" placeholder="Name" ref={full_nameRef} required />
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
            <input
              type="password"
              placeholder="Password confirmation"
              ref={password_confirmationRef}
              required
            />
            <button type="submit" className={scss.button}>
              Sign Up
            </button>
            <span
              className={scss.HaveAcc}
              onClick={() => {
                navigate("/signIn");
              }}
            >
              I already have an account
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
