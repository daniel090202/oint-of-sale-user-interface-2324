import { useSelector } from "react-redux";

import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";

import Menu, { Item } from "./Menu";

const cn = classNames.bind(styles);

function SideBar({ data }) {
  const sideBarRoutes = data;

  const userData = useSelector((state) => state.auth.login?.currentUser);
  const user = userData?.account;

  return (
    <aside className={cn("wrapper")}>
      {user !== undefined && (
        <Menu>
          {(sideBarRoutes !== undefined || sideBarRoutes.length > 0) &&
            sideBarRoutes.map((route) => {
              if (
                (user.admin === route.admin || route.admin === false) &&
                user.active === true
              ) {
                return (
                  <Item key={route.title} title={route.title} to={route.to} />
                );
              }
            })}
        </Menu>
      )}
    </aside>
  );
}

export default SideBar;
