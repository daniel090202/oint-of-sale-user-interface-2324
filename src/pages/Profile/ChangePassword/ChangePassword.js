import qs from "qs";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./ChangePassword.module.scss";

import config from "../../../config";
import Modal from "../../../components/Modal";
import Toast from "../../../components/Toast";
import { Button } from "../../../components/Button";
import { logInSuccess } from "../../../redux/authSlice";

const cn = classNames.bind(styles);

const ChangePassword = ({ handleCloseModal }) => {
  const userData = useSelector((state) => state.auth.login?.currentUser);
  const user = userData?.account;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [account, setAccount] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const handleChange = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (account.password === account.confirmPassword) {
      try {
        const url =
          process.env.REACT_APP_SERVER_URL + "/account/change-password";

        const data = {
          password: account.password,
          email: user.email,
        };

        const options = {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(data),
          url,
        };

        axios(options)
          .then((response) => {
            return response.data;
          })
          .then((data) => {
            localStorage.clear();
            navigate(config.routes.signIn);
          });
      } catch (error) {
        setNotification(error.message);
        setModalOpen(!isOpen);
      }
    } else {
      setAccount({
        password: "",
        confirmPassword: "",
      });
      setNotification("Passwords do not match");
      setModalOpen(!isOpen);
    }
  };

  const handleMessageModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  return (
    <div className={cn("wrapper")}>
      <div className={cn("header")}>
        <h1 className={cn("title")}>Change password</h1>
        <FontAwesomeIcon
          icon={faXmark}
          className={cn("close")}
          onClick={() => {
            handleCloseModal(false);
          }}
        />
      </div>
      <hr className={cn("horizontal-line")} />
      <form
        method="post"
        className={cn(
          "h-96",
          "grid",
          "grid-cols-1",
          "gap-1",
          "overflow-y-scroll"
        )}
      >
        <div className={cn("form-control")}>
          <label htmlFor="fullName" className={cn("label")}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={account.password}
            onChange={handleChange}
            className={cn("input")}
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="password" className={cn("label")}>
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={account.confirmPassword}
            onChange={handleChange}
            className={cn("input")}
          />
        </div>
      </form>
      <div className={cn("w-full", "my-10", "flex", "justify-center")}>
        <Button primary onClick={handleSubmit}>
          Change
        </Button>
      </div>
      <Modal modalOpen={isOpen}>
        <Toast message={notification} handleCloseModal={handleMessageModal} />
      </Modal>
    </div>
  );
};

export default ChangePassword;
