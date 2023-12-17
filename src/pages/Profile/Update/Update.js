import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../../components/Button";

import classNames from "classnames/bind";
import styles from "./Update.module.scss";

import qs from "qs";
import axios from "axios";
import { useState } from "react";

import Modal from "../../../components/Modal";
import Toast from "../../../components/Toast";

const cn = classNames.bind(styles);

const Update = ({ data, handleCloseModal }) => {
  const [account, setAccount] = useState(data);
  const [isOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [profilePicture, setProfilePicture] = useState();

  const handleChange = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleProfilePicture = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const url = process.env.REACT_APP_SERVER_URL + "/account/update";

      const formData = new FormData();
      const attributes = Object.keys(account);

      formData.append("file", profilePicture);

      for (const value of attributes) {
        formData.append(value, account[value]);
      }

      axios
        .post(url, formData)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          const message = data.message;

          setNotification(message);
          setModalOpen(!isOpen);
        });
    } catch (error) {
      setNotification(error.message);
      setModalOpen(!isOpen);
    }
  };

  const handleMessageModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  return (
    <div className={cn("wrapper")}>
      <div className={cn("header")}>
        <h1 className={cn("title")}>Update profile</h1>
        <FontAwesomeIcon
          icon={faXmark}
          className={cn("close")}
          onClick={() => {
            handleCloseModal(false);
          }}
        />
      </div>
      <hr className={cn("horizontal-line")} />
      <div className={cn("form-control", "form-control__file")}>
          {profilePicture && (
            <img
              alt="Avatar"
              src={URL.createObjectURL(profilePicture)}
              className={cn("form-image")}
            />
          )}
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleProfilePicture}
          />
        </div>
      <form
        method="post"
        className={cn(
          "h-96",
          "grid",
          "grid-cols-2",
          "gap-2",
          "overflow-y-scroll"
        )}
      >
        <div className={cn("form-control")}>
          <label htmlFor="fullName" className={cn("label")}>
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={account.fullName}
            onChange={handleChange}
            className={cn("input")}
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="phone" className={cn("label")}>
            Phone number
          </label>
          <input
            id="phone"
            type="number"
            name="phone"
            value={account.phone}
            onChange={handleChange}
            className={cn("input")}
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="email" className={cn("label")}>
            Email address
          </label>
          <input
            disabled
            id="email"
            type="email"
            name="email"
            value={account.email}
            onChange={handleChange}
            className={cn("input")}
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="address" className={cn("label")}>
            Residential address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={account.address}
            onChange={handleChange}
            className={cn("input")}
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="age" className={cn("label")}>
            Age
          </label>
          <input
            id="age"
            type="number"
            name="age"
            value={account.age}
            onChange={handleChange}
            className={cn("input")}
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="gender" className={cn("label")}>
            Gender
          </label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={account.gender}
            onChange={handleChange}
            className={cn("input")}
          />
        </div>
      </form>
      <div className={cn("w-full", "my-10", "flex", "justify-center")}>
        <Button
          primary
          onClick={handleSubmit}
          rightIcon={<FontAwesomeIcon icon={faPlus} />}
        >
          Update
        </Button>
      </div>
      <Modal modalOpen={isOpen}>
        <Toast message={notification} handleCloseModal={handleMessageModal} />
      </Modal>
    </div>
  );
};

export default Update;
