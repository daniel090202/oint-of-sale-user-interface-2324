import PropTypes from "prop-types";

import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

import { Button } from "~/components/Button";

const cn = classNames.bind(styles);

function Item({ data, onClick }) {
  const classes = cn("menu-item", {
    separate: data.separate,
  });
  return (
    <Button
      className={classes}
      to={data.to}
      leftIcon={data.icon}
      onClick={onClick}
    >
      {data.title}
    </Button>
  );
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Item;
