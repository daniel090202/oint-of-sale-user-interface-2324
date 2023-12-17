import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "./Toast.module.scss";

const cn = classNames.bind(styles);

const Toast = ({ handleCloseModal, message }) => {
  return (
    <div className={cn("wrapper")}>
      <div className={cn("close")}>
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => {
              handleCloseModal(false);
            }}
          />
      </div>
      <hr className={cn("horizontal-line")}/>
      <h1 className={cn("message")}>{message}</h1>
    </div>
  );
};

export default Toast;
