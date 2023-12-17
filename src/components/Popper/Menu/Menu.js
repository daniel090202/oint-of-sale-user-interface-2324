import PropTypes from "prop-types";

import { useState } from "react";

import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import Item from "./Item";
import Header from "./Header";

const cn = classNames.bind(styles);

function Menu({
  children,
  menuItems = [],
  hideOnClick = false,
  onChange = () => {},
}) {
  const [history, setHistory] = useState([{ data: menuItems }]);
  const currentPopper = history[history.length - 1];

  const renderMenuItems = () => {
    return currentPopper.data.map((menuItem, index) => {
      const isParent = !!menuItem.children;

      return (
        <Item
          key={index}
          data={menuItem}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, menuItem.children]);
            } else {
              onChange(menuItem);
            }
          }}
        ></Item>
      );
    });
  };

  const handleBackToPreviousMenu = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const renderMenu = (attrs) => (
    <div className={cn("selection-menu")} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cn("selection-popper")}>
        {history.length > 1 && (
          <Header
            className={cn("selection-title")}
            title={currentPopper.title}
            onBack={handleBackToPreviousMenu}
          ></Header>
        )}
        <div className={cn("selection-content")}>{renderMenuItems()}</div>
      </PopperWrapper>
    </div>
  );

  const handleResetToFirstMenu = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  return (
    <Tippy
      hideOnClick={hideOnClick}
      delay={[0, 200]}
      offset={[12, 8]}
      interactive={true}
      placement="bottom-end"
      render={renderMenu}
      onHide={handleResetToFirstMenu}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  menuItems: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Menu;
