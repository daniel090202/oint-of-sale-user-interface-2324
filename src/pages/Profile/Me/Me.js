import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Me.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faPenToSquare,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

import Update from "../Update";
import ChangePassword from "../ChangePassword";
import Modal from "../../../components/Modal";

import images from "../../../assets/images";
import { logOut } from "../../../redux/apiRequest";
import { Button } from "../../../components/Button";
import { logOutSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../utils/createInstance";

const cn = classNames.bind(styles);

function Me() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.login?.currentUser);

  const user = userData?.account;
  const userEmail = user?.email;
  const accessToken = userData?.accessToken;

  let axiosJWT = createAxios(userData, dispatch, logOutSuccess);

  const handleSignOut = () => {
    logOut(dispatch, navigate, axiosJWT, userEmail, accessToken);
  };

  const handleCloseUpdate = (isOpen) => {
    setModalOpen(isOpen);
  };

  const handleCloseChange = (isOpen) => {
    setOpen(isOpen);
  };

  return (
    <div className={cn("wrapper")}>
      {user !== undefined && (
        <div>
          <div className={cn("header")}>
            {user.avatar ? (
              <img
                alt="Avatar"
                src={`http://localhost:8080/Images/${user.avatar}`}
                className={cn("form-image")}
              />
            ) : (
              <img
                alt="Avatar"
                src={images.defaultUser}
                className={cn("form-image")}
              />
            )}
            <h1 className={cn("title")}>{user.fullName}</h1>
          </div>
          <div className={cn("grid", "grid-cols-2", "gap-4")}>
            <div className={cn("form-control")}>
              <label htmlFor="name" className={cn("label")}>
                Full name
              </label>
              <p id="name" className={cn("form-input")}>
                {user.fullName}
              </p>
            </div>
            <div className={cn("form-control")}>
              <label htmlFor="phone" className={cn("label")}>
                Phone number
              </label>
              <p id="phone" className={cn("form-input")}>
                {user.phone}
              </p>
            </div>
            <div className={cn("form-control")}>
              <label htmlFor="email" className={cn("label")}>
                Email address
              </label>
              <p id="email" className={cn("form-input")}>
                {user.email}
              </p>
            </div>
            <div className={cn("form-control")}>
              <label htmlFor="address" className={cn("label")}>
                Residential address
              </label>
              <p id="address" className={cn("form-input")}>
                {user.address}
              </p>
            </div>
            <div className={cn("form-control")}>
              <label htmlFor="age" className={cn("label")}>
                Age
              </label>
              <p id="age" className={cn("form-input")}>
                {user.age}
              </p>
            </div>
            <div className={cn("form-control")}>
              <label htmlFor="gender" className={cn("label")}>
                Gender
              </label>
              <p id="gender" className={cn("form-input")}>
                {user.gender}
              </p>
            </div>
          </div>
          <div className={cn("flex", "justify-center")}>
            <Button
              primary
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
              leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
            >
              Update
            </Button>
            <Button
              primary
              onClick={() => {
                setOpen(!modalOpen);
              }}
              leftIcon={<FontAwesomeIcon icon={faLock} />}
            >
              Password
            </Button>
            <Button
              primary
              leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
              onClick={() => handleSignOut()}
            >
              Logout
            </Button>
          </div>
          <Modal modalOpen={modalOpen}>
            <Update data={user} handleCloseModal={handleCloseUpdate} />
          </Modal>
          <Modal modalOpen={isOpen}>
            <ChangePassword handleCloseModal={handleCloseChange} />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Me;
