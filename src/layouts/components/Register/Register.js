import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./Register.module.scss";

import qs from "qs";
import axios from "axios";

import { useState } from "react";

import Modal from "../../../components/Modal";
import Toast from "../../../components/Toast";
import { Button } from "../../../components/Button";

const cn = classNames.bind(styles);

function Register({ handleCloseModal }) {
  const [notification, setNotification] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [account, setAccount] = useState({
    age: "",
    fullName: "",
    phone: "",
    email: "",
    gender: "",
    address: "",
  });

  const handleChange = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const url = process.env.REACT_APP_SERVER_URL + "/account/register";

      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(account),
        url,
      };

      axios(options)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          const code = data.code;
          const message = data.message;

          if (code === 0) {
            setNotification(message);
            setModalOpen(!modalOpen);
            setAccount({
              age: "",
              fullName: "",
              phone: "",
              email: "",
              gender: "",
              address: "",
            });
          } else {
            setNotification(message);
            setModalOpen(!modalOpen);
          }
        });
    } catch (error) {
      setNotification(error.message);
      setModalOpen(!modalOpen);
    }
  };

  const handleMessageModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  return (
    <div className={cn("wrapper")}>
      <div className={cn("header")}>
        <h1 className={cn("title")}>Register new account</h1>
        <FontAwesomeIcon
          icon={faXmark}
          className={cn("close")}
          onClick={() => {
            handleCloseModal(false);
          }}
        />
      </div>
      <hr className={cn("horizontal-line")} />
      <form method="post" className={cn("grid", "grid-cols-2", "gap-2")}>
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
            placeholder="Your name"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="email" className={cn("label")}>
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={account.email}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Example: yourname@gmail.com"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="phone" className={cn("label")}>
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="number"
            value={account.phone}
            onChange={handleChange}
            className={cn("input")}
            placeholder="0936 - 730 - 339"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="address" className={cn("label")}>
            Residential address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={account.address}
            onChange={handleChange}
            className={cn("input")}
            placeholder="XXX Street, District X, HCMC"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="age" className={cn("label")}>
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            value={account.age}
            onChange={handleChange}
            className={cn("input")}
            placeholder="From 25 to under 40 years old"
          />
        </div>
        <div className={cn("form-control")}>
          <div className={cn("form-control__ratio")}>
            <input
              id="male"
              type="radio"
              name="gender"
              value={"Male"}
              onChange={handleChange}
              checked={account.gender === "Male"}
            />
            <label className={cn("label")} htmlFor="male">
              Male
            </label>
          </div>
          <div className={cn("form-control__ratio")}>
            <input
              id="female"
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              checked={account.gender === "Female"}
            />
            <label className={cn("label")} htmlFor="female">
              Female
            </label>
          </div>
        </div>
      </form>
      <div className={cn("w-full", "flex", "justify-center")}>
        <Button
          primary
          type="submit"
          onClick={handleSubmit}
          rightIcon={<FontAwesomeIcon icon={faPlus} />}
        >
          Create
        </Button>
      </div>
      <Modal modalOpen={modalOpen}>
        <Toast message={notification} handleCloseModal={handleMessageModal} />
      </Modal>
    </div>
  );
}

export default Register;
