import scss from "./Profile.module.scss";
import { useContext, useState, useRef, useEffect } from "react";
import AuthContext from "../../Storage/auth-context";
import * as Icon from "react-bootstrap-icons";
import { CSSTransition } from "react-transition-group";
import Loader from "react-loader-spinner";
import { message } from "antd";
import api from "../../Services/api";

const Profile = (props) => {
  const authCtx = useContext(AuthContext);
  const [isPassChange, setIsPassChange] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [newName, setNewName] = useState(authCtx.fullName);
  const [newEmail, setNewEmail] = useState(authCtx.email);
  const [isLoading, setIsLoading] = useState(false);
  const oldPass = useRef("");
  const newPass = useRef("");
  const newPassRepeat = useRef("");

  const changeNewNameHandler = (event) => {
    setNewName(event.target.value);
  };
  const changeNewEmailHandler = (event) => {
    setNewEmail(event.target.value);
  };
  const changeIsPassChange = () => {
    setIsEditProfile(false);
    setIsPassChange((prevState) => !prevState);
  };
  const cahngeIsEdit = () => {
    setIsPassChange(false);
    setIsEditProfile((prevState) => !prevState);
  };

  const submitEditProfileHandler = async (event) => {
    event.preventDefault();
    setIsPassChange(false);
    setIsEditProfile(false);
    setIsLoading(true);

    try {
      const response = await api().post("api/user/" + authCtx.userId, {
        name: newName,
        email: newEmail,
      });
      if (response.status === 200) {
        message.success("Данные успешно обновлены!");
        authCtx.update_info();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      message.error("Произошла ошибка!");
    }
    setIsLoading(false);
  };

  const submitNewPassHandler = async (event) => {
    event.preventDefault();
    setIsPassChange(false);
    setIsEditProfile(false);
    setIsLoading(true);
    try {
      const response = await api().post("api/user/update/password", {
        old_password: oldPass.current.value,
        password: newPass.current.value,
        password_confirmation: newPassRepeat.current.value,
      });
      if (response.status === 200) {
        message.success("Пароль успешно обновлен!");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      message.error(error.toString());
    }
    setIsLoading(false);
  };

  useEffect(async () => {
    // await authCtx.update_info();
    // await setIsLoading(false);
  }, []);

  return (
    <div className={scss.ProfileDiv}>
      <div className={scss.TopDiv}>
        <span className={scss.FullName}>{authCtx.fullName}</span>
        <span className={scss.Email}>{authCtx.email}</span>
      </div>
      {isLoading && (
        <Loader
          type="TailSpin"
          color="#D2E1FF"
          height={100}
          width={100}
          timeout={50000}
          className={scss.Loader}
        />
      )}
      {!isLoading && (
        <div className={scss.BottomDiv}>
          <div className={scss.TopInfoDiv}>
            <div className={scss.LeftInfoBlock}>
              {!isEditProfile && <span>{authCtx.fullName}</span>}
              {!isEditProfile && <span>{authCtx.email}</span>}
              {isEditProfile && (
                <div className={scss.EditProfile}>
                  <input
                    type="text"
                    value={newName}
                    onChange={changeNewNameHandler}
                  />
                  <input
                    type="email"
                    value={newEmail}
                    className={scss.EmailChange}
                    onChange={changeNewEmailHandler}
                  />
                </div>
              )}
              <CSSTransition
                in={isPassChange}
                timeout={300}
                classNames={{
                  enterActive: scss.DropDownEnterActive,
                  enterDone: scss.DropDownEnterDone,
                  exitActive: scss.DropDownExit,
                  exitDone: scss.DropDownExitActive,
                }}
                mountOnEnter
                unmountOnExit
              >
                <div className={scss.ChangePass}>
                  <span>Old password: </span>
                  <input
                    ref={oldPass}
                    type="password"
                    placeholder="Old password"
                    required
                  />
                  <span>New password: </span>
                  <input
                    ref={newPass}
                    type="password"
                    placeholder="New password"
                    required
                  />
                  <span>Repeat new password: </span>
                  <input
                    ref={newPassRepeat}
                    type="password"
                    placeholder="Repeat new password"
                    required
                  />
                </div>
              </CSSTransition>
            </div>
            {/* <div className={scss.RightInfoBlock}>
            </div> */}
          </div>
          <div className={scss.ButtonsDiv}>
            <div className={scss.LeftBlockOfButtons}>
              <span
                className={isPassChange ? scss.Active : null}
                onClick={changeIsPassChange}
              >
                Change password
              </span>
              <span
                className={isEditProfile ? scss.Active : null}
                onClick={cahngeIsEdit}
              >
                Edit profile
              </span>
            </div>
            <div className={scss.RightBlockOfButtons}>
              {(isPassChange || isEditProfile) && (
                <button
                  className={scss.button}
                  onClick={
                    isPassChange
                      ? submitNewPassHandler
                      : submitEditProfileHandler
                  }
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
