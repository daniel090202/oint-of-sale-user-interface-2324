import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import {
  faUser,
  faHouse,
  faListCheck,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Menu, { Item } from "./Menu";

import config from "../../../config";

const cn = classNames.bind(styles);

function Header() {
  const userData = useSelector((state) => state.auth.login?.currentUser);
  const user = userData?.account || undefined;

  const renderHeaders = () => {
    if (!user) {
      return (
        <>
          <li className={cn("menu-item")}>
            <Item
              needAuthenticated={false}
              icon={<FontAwesomeIcon icon={faHouse} />}
              to={config.routes.home}
            ></Item>
          </li>
          <li className={cn("menu-item")}>
            <Item
              needAuthenticated={false}
              icon={<FontAwesomeIcon icon={faUser} />}
              to={config.routes.signIn}
            ></Item>
          </li>
        </>
      );
    } else {
      if (user.active) {
        return (
          <>
            <li className={cn("menu-item")}>
              <Item
                needAuthenticated={false}
                icon={<FontAwesomeIcon icon={faHouse} />}
                to={config.routes.home}
              ></Item>
            </li>
            <li className={cn("menu-item")}>
              <Item
                needAuthenticated={true}
                icon={<FontAwesomeIcon icon={faCashRegister} />}
                to={config.routes.transaction.home}
              ></Item>
            </li>
            <li className={cn("menu-item")}>
              <Item
                needAuthenticated={true}
                icon={<FontAwesomeIcon icon={faListCheck} />}
                to={config.routes.management.home}
              ></Item>
            </li>
            <li className={cn("menu-item")}>
              <Item
                needAuthenticated={true}
                icon={<FontAwesomeIcon icon={faUser} />}
                to={config.routes.profile.home}
              ></Item>
            </li>
          </>
        );
      } else {
        return (
          <>
            <li className={cn("menu-item")}>
              <Item
                needAuthenticated={false}
                title="Home"
                to={config.routes.home}
              ></Item>
            </li>
            <li className={cn("menu-item")}>
              <Item
                needAuthenticated={true}
                icon={<FontAwesomeIcon icon={faUser} />}
                to={config.routes.profile.home}
              ></Item>
            </li>
          </>
        );
      }
    }
  };

  return (
    <div className={cn("wrapper")}>
      <div className={cn("menu")}>
        <Menu>
          <li className={cn("menu-item")}>
            <Link to={config.routes.home}>Apple Store</Link>
          </li>
        </Menu>
      </div>
      <div className={cn("menu")}>
        <Menu>{renderHeaders()}</Menu>
      </div>
    </div>
  );
}

export default Header;
