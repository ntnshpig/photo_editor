import React, { useContext, useState } from "react";
import scss from "./Burger.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../../Storage/auth-context";
import { CSSTransition } from "react-transition-group";
import { Sling as Hamburger } from "hamburger-react";

const Burger = (props) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const authCtx = useContext(AuthContext);

  return (
    <>
      <div className={scss.Burger}>
        <Hamburger
          toggled={props.burgerIsOpen}
          toggle={props.onBurgerMenuOpen}
          rounded={true}
          size={36}
          color="#697ca6"
        />
      </div>
      <CSSTransition
        in={props.burgerIsOpen}
        timeout={200}
        classNames={{
          enterActive: scss.BurgerMenuEnterActive,
          enterDone: scss.BurgerMenuEnterDone,
          exitActive: scss.BurgerMenuExit,
          exitDone: scss.BurgerMenuExitActive,
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={scss.BurgerMenu}>
          <ul className={scss.Nav}>
          <li className={loc.pathname === "/" ? scss.Active : null}>
              <Link to="/" onClick={() => props.onBurgerMenuOpen()}>
                Home
              </Link>
            </li>
            <li className={loc.pathname === "/edit" ? scss.Active : null}>
              <Link to="/edit" onClick={() => props.onBurgerMenuOpen()}>
                Photo Editor
              </Link>
            </li>
            <li className={loc.pathname === "/paint" ? scss.Active : null}>
              <Link to="/paint" onClick={() => props.onBurgerMenuOpen()}>
                Paint
              </Link>
            </li>
            <li className={loc.pathname === "/profile" ? scss.Active : null}>
              <Link to="/profile" onClick={() => props.onBurgerMenuOpen()}>
                Profile
              </Link>
            </li>
          </ul>
          {!authCtx.isLoggedIn() && (
            <div className={scss.ButtonsDiv}>
              <button
                className={`${scss.Button} ${scss.SignIn}`}
                onClick={() => {
                  props.onBurgerMenuOpen();
                  navigate("/signIn");
                }}
              >
                Sign In
              </button>
              <button
                className={`${scss.Button} ${scss.SignUp}`}
                onClick={() => {
                  navigate("/signUp");
                  props.onBurgerMenuOpen();
                }}
              >
                Sign Up
              </button>
            </div>
          )}
          {authCtx.isLoggedIn() && (
            <div className={scss.ButtonsDiv}>
              <button
                className={`${scss.Button} ${scss.Profile}`}
                onClick={() => {
                  navigate("/profile");
                  props.onBurgerMenuOpen();
                }}
              >
                {authCtx.userLogin}
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
        </div>
      </CSSTransition>
    </>
  );
};

export default Burger;
