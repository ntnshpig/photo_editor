import React, { useState } from "react";
import { message } from "antd";
import Cookies from "js-cookie";
import cookie from "cookie";
import api from "../Services/api";

const AuthContext = React.createContext({
  userId: null,
  email: "",
  fullName: "",
  isLoggedIn: () => {},
  login: (userData) => {},
  logout: () => {},
  update_info: () => {},
});

export const AuthContextProvider = (props) => {
  const initialUserId = localStorage.getItem("userId");
  const initialEmail = localStorage.getItem("email");
  const initialFullName = localStorage.getItem("fullName");

  const [email, setEmail] = useState(initialEmail);
  const [userId, setUserId] = useState(initialUserId);
  const [fullName, setFullName] = useState(initialFullName);

  const isLoggedIn = (reqCookies = null) => {
    // if we don't have request cookies, get the cookie from client
    if (!reqCookies) {
      return !!Cookies.get("ticket_management_is_user_logged_in");
    }

    // otherwise get cookie from server
    return !!cookie.parse(reqCookies).ticket_management_is_user_logged_in;
  };

  const loginHandler = (userData) => {
    Cookies.set("ticket_management_is_user_logged_in", true, {
      expires: 60 * 24*7,
      sameSite: "lax",
    });

    setEmail(userData.user.email);
    setUserId(userData.user.id);
    setFullName(userData.user.name);

    localStorage.setItem("userId", userData.user.id);
    localStorage.setItem("email", userData.user.email);
    localStorage.setItem("fullName", userData.user.name);
  };

  const updateUserInfo = async () => {
    try {
      const response = await api().get("api/user/user_info");
      console.log(response);

      if (+response.status === 200) {
        setEmail(response.data.data[0].email);
        setUserId(response.data.data[0].id);
        setFullName(response.data.data[0].name);


        localStorage.setItem("userId", response.data.data[0].id);
        localStorage.setItem("email", response.data.data[0].email);
        localStorage.setItem("fullName", response.data.data[0].name);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      message.error("Произошла ошибка!");
    }
  };

  const logoutHandler = async () => {
    Cookies.remove('ticket_management_is_user_logged_in', {
      expires: 86400, 
      sameSite: "lax"
    });
    setEmail("");
    setUserId(null);
    setFullName("");

    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("fullName");
    try {
      const response = await api().post("api/auth/logout");
     
      if (response.status !== 200) {
        throw new Error(response.data.message);

      }
    } catch (error) {
      message.error("Произошла ошибка!");
    }
  };

  let contextValue = {
    userId: userId,
    email: email,
    fullName: fullName,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    update_info: updateUserInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
