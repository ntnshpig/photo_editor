import axios from "axios";
import Cookies from "js-cookie";

export default function api() {
  const api = axios.create({
    baseURL: "https://api.niwebster.com",
    // baseURL: "http://127.0.0.1",
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        Cookies.remove("ticket_management_is_user_logged_in", {
          expires: 86400,
          sameSite: "lax",
        });

        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("fullName");
        console.log("Log out");

        document.location.reload();
        return Promise.reject();
      }

      return Promise.reject(error);
    }
  );
  return api;
}
