import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./Details.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShare,
  faArrowLeft,
  faBoxArchive,
  faDeleteLeft,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import UpdateProduct from "../UpdateProduct";
import Modal from "../../../components/Modal";
import Toast from "../../../components/Toast";

import { Button } from "../../../components/Button";

const cn = classNames.bind(styles);

function Details() {
  const location = useLocation();

  const { type, data } = location.state;

  const [account, setAccount] = useState(data);
  const [product, setProduct] = useState(data);
  const [modalOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [updateModelOpen, setUpdateModalOpen] = useState(false);

  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });

  const renderContent = () => {
    const divLists = [];

    const attributes = Object.keys(account);
    for (const key in attributes) {
      if (attributes[key] === "active") {
        if (account[attributes[key]]) {
          divLists.push(
            <div className={cn("form-control")}>
              <label htmlFor={key} className={cn("label")}>
                {attributes[key]}
              </label>
              <p id={key} className={cn("form-input")}>
                Active
              </p>
            </div>
          );
        } else {
          divLists.push(
            <div className={cn("form-control")}>
              <label htmlFor={key} className={cn("label")}>
                {attributes[key]}
              </label>
              <p id={key} className={cn("form-input")}>
                Inactive
              </p>
            </div>
          );
        }
      } else if (attributes[key] === "original") {
        if (user.account.admin) {
          divLists.push(
            <div className={cn("form-control")}>
              <label htmlFor={key} className={cn("label")}>
                {attributes[key]}
              </label>
              <p id={key} className={cn("form-input")}>
                {account[attributes[key]]}
              </p>
            </div>
          );
        }
      } else {
        divLists.push(
          <div className={cn("form-control")}>
            <label htmlFor={key} className={cn("label")}>
              {attributes[key]}
            </label>
            <p id={key} className={cn("form-input")}>
              {account[attributes[key]]}
            </p>
          </div>
        );
      }
    }

    return divLists;
  };

  const renderButtons = () => {
    const buttonLists = [];

    if (type === "account") {
      buttonLists.push(
        <Button
          primary
          onClick={() => {
            handleUpdateModal();
          }}
          rightIcon={<FontAwesomeIcon icon={faPenToSquare} />}
        >
          Update
        </Button>
      );

      if (data.status === 1) {
        buttonLists.push(
          <Button
            primary
            onClick={(event) => {
              handleArchiveButton(event);
            }}
            rightIcon={<FontAwesomeIcon icon={faBoxArchive} />}
          >
            Archive
          </Button>
        );
      }

      if (data.status === 2) {
        buttonLists.push(
          <Button
            primary
            onClick={(event) => {
              handleActivateButton(event);
            }}
            rightIcon={<FontAwesomeIcon icon={faBoxArchive} />}
          >
            Activate
          </Button>
        );
      }

      if (!data.active) {
        buttonLists.push(
          <Button
            primary
            onClick={(event) => {
              handleResendButton(event);
            }}
            rightIcon={<FontAwesomeIcon icon={faShare} />}
          >
            Resend
          </Button>
        );
      }
    } else if (type === "product" && user.account.admin) {
      buttonLists.push(
        <Button
          primary
          onClick={() => {
            handleUpdateModal();
          }}
          rightIcon={<FontAwesomeIcon icon={faPenToSquare} />}
        >
          Update
        </Button>
      );

      buttonLists.push(
        <Button
          primary
          onClick={(event) => {
            handleDeleteProduct(event);
          }}
          rightIcon={<FontAwesomeIcon icon={faDeleteLeft} />}
        >
          Delete
        </Button>
      );

      if (data.status === 1 && data.amount > 0) {
        buttonLists.push(
          <Button
            primary
            onClick={(event) => {
              handleArchiveButton(event);
            }}
            rightIcon={<FontAwesomeIcon icon={faBoxArchive} />}
          >
            Archive
          </Button>
        );
      }
    }

    return buttonLists;
  };

  const handleArchiveButton = async (event) => {
    event.preventDefault();

    try {
      if (type === "account") {
        const url =
          process.env.REACT_APP_SERVER_URL + "/account/archive/:userEmail";

        const options = {
          method: "GET",
          headers: { token: `Bearer ${user.accessToken}` },
          params: {
            email: data.email,
          },
          url,
        };

        const response = await axios(options);
        const { message } = response.data;

        setNotification(message);
        setModalOpen(!modalOpen);

        window.history.go(-1);
      }
    } catch (error) {
      setNotification(error.message);
      setModalOpen(!modalOpen);
    }
  };

  const handleActivateButton = async (event) => {
    event.preventDefault();

    try {
      const url =
        process.env.REACT_APP_SERVER_URL + "/account/activate/:userID";

      const options = {
        method: "GET",
        headers: { token: `Bearer ${user.accessToken}` },
        params: {
          email: data.email,
        },
        url,
      };

      const response = await axios(options);
      const { message } = response.data;

      setNotification(message);
      setModalOpen(!modalOpen);

      window.history.go(-1);
    } catch (error) {
      setNotification(error.message);
      setModalOpen(!modalOpen);
    }
  };

  const handleDeleteProduct = async (event) => {
    event.preventDefault();

    try {
      const url = process.env.REACT_APP_SERVER_URL + "/product";

      const options = {
        method: "DELETE",
        headers: { token: `Bearer ${user.accessToken}` },
        params: {
          id: product.barcode,
        },
        url,
      };

      const response = await axios(options);
      const { message } = response.data;

      setNotification(message);
      setModalOpen(!modalOpen);

      window.history.go(-1);
    } catch (error) {
      setNotification(error.message);
      setModalOpen(!modalOpen);
    }
  };

  const handleResendButton = async (event) => {
    event.preventDefault();

    try {
      const url =
        process.env.REACT_APP_SERVER_URL + "/account/resend/:userEmail";

      const options = {
        method: "GET",
        headers: { token: `Bearer ${user.accessToken}` },
        params: {
          email: account.email,
        },
        url,
      };

      const response = await axios(options);
      const { message } = response.data;

      setNotification(message);
      setModalOpen(!modalOpen);

      window.history.go(-1);
    } catch (error) {
      setNotification(error.message);
      setModalOpen(!modalOpen);
    }
  };

  const handleCloseModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  const handleUpdateModal = () => {
    setUpdateModalOpen(!updateModelOpen);
  };

  const handleCloseUpdateModal = (isOpen) => {
    setUpdateModalOpen(isOpen);
  };

  return (
    <div className={cn("wrapper")}>
      <div className={cn("header")}>
        <button onClick={() => window.history.go(-1)}>
          <FontAwesomeIcon className={cn("back")} icon={faArrowLeft} />
        </button>
        <h1 className={cn("title")}>Details</h1>
      </div>
      <div className={cn("grid", " grid-cols-3 ", "gap-3", "my-10")}>
        {renderContent()}
      </div>
      <div className={cn("flex", "justify-center")}>{renderButtons()}</div>
      <Modal modalOpen={modalOpen}>
        <Toast message={notification} handleCloseModal={handleCloseModal} />
      </Modal>
      <Modal modalOpen={updateModelOpen}>
        <UpdateProduct
          data={product}
          handleCloseModal={handleCloseUpdateModal}
        />
      </Modal>
    </div>
  );
}

export default Details;
