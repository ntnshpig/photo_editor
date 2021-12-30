import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../Storage/img/Logo.svg";
import scss from "./Footer.module.scss";

import * as Icon from "react-bootstrap-icons";
import AuthContext from "../../../Storage/auth-context";


const Footer = (props) => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <footer className={scss.Footer}>
      <div className={scss.Top}>
        <div className={scss.TopLeftBox}>
        <img className={scss.Logo} src={Logo} alt="Logo" />
          <ul className={scss.Nav}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/edit">Photo Editor</Link>
            </li>
            <li>
              <Link to="/paint">Painting</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div className={scss.TopRightBox}>
          <div className={scss.SocialMedia}>
              <Icon.Facebook className={scss.SocialMediaIcon}/>
              <Icon.Twitter className={scss.SocialMediaIcon}/>
              <Icon.Linkedin className={scss.SocialMediaIcon}/>
          </div>
        </div>
      </div>
      <div className={scss.Bot}>
        <span className={scss.LoveText}>© We love our customers! by Webster</span>
      </div>
    </footer>
  );
};

export default Footer;
