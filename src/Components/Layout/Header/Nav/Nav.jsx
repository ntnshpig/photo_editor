import scss from "./Nav.module.scss";
import { Link, useLocation } from "react-router-dom";
import React from "react";

const Nav = (props) => {
  const loc = useLocation();

  return (
    <ul className={scss.Nav}>
       <li
        className={loc.pathname === "/" ? scss.Active : null}
      >
         <Link to="/">Home</Link>
      </li>
      <li
        className={loc.pathname === "/edit" ? scss.Active : null}
      >
         <Link to="/edit">Photo Editor</Link>
      </li>
      <li className={loc.pathname === "/paint" ? scss.Active : null}>
        <Link to="/paint">Paint</Link>
      </li>
      <li className={loc.pathname === "/profile" ? scss.Active : null}>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  );
};

export default Nav;
