import React from "react";
import { Scissors } from "react-bootstrap-icons";
import Particles from "./Particles";
import scss from "./Home.module.scss";
import { PlayFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router";
import AuthContext from "../../Storage/auth-context";
import { useContext } from "react";

const Home = (props) => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    
  return (
    <div className={scss.Home}>
      <Particles />
      <div className={scss.Info}>
        <h1 className={scss.IntroText}>How to create visual content without specific skills?</h1>
        <p className={scss.DescribeText}>
          Use our free picture editor that allows every user without design
          skills to create and process beautifull images.
        </p>
        <div
            className={scss.PlayContainer}
            onClick={() => {
              authCtx.isLoggedIn ? navigate("/profile") : navigate("/signIn");
            }}
          >
            <PlayFill className={scss.Icon} />
          </div>
      </div>
    </div>
  );
};

export default Home;
