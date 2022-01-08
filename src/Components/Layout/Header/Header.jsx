import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../Storage/auth-context";
import scss from "./Header.module.scss";
import Nav from "./Nav/Nav";
import Burger from "./Burger/Burger";
import Logo from "../../../Storage/img/Logo.svg";

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const navigate = useNavigate();

  const burgerMenuHandler = () => {
    setBurgerIsOpen((prevState) => !prevState);
  };

  return (
    <header className={scss.Header}>
      <div className={scss.LeftBox}>
      <Link to="/" className={scss.Logo} onClick={burgerIsOpen ? burgerMenuHandler : null}>
          <img src={Logo} className={scss.logoImage} alt="Logo" />
          <span className={scss.LogoText}>Webster</span>
        </Link>

        <Nav IsLoggedIn={authCtx.isLoggedIn()}/>
      </div>

      {!authCtx.isLoggedIn() && (
        <div className={scss.RightBox}>
          <button
            className={`${scss.Button} ${scss.SignIn}`}
            onClick={() => navigate("/signIn")}
          >
            Sign In
          </button>
          <button
            className={`${scss.Button} ${scss.SignUp}`}
            onClick={() => navigate("/signUp")}
          >
            Sign Up
          </button>
        </div>
      )}
      {authCtx.isLoggedIn() && (
        <div className={scss.RightBox}>
          <button
            className={`${scss.Button} ${scss.Profile}`}
            onClick={() => navigate("/profile")}
          >
            {authCtx.email}
          </button>
          <button
            className={`${scss.Button} ${scss.Logout}`}
            onClick={() => {
              authCtx.logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      )}
      <Burger
        onBurgerMenuOpen={burgerMenuHandler}
        burgerIsOpen={burgerIsOpen}
      />
    </header>
  );
};

export default Header;
