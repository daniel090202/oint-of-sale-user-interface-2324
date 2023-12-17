import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faHandPointRight,
} from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./Confirm.module.scss";

import Receipt from "../Receipt";
import Toast from "../../../components/Toast";
import Modal from "../../../components/Modal";
import { Table } from "../../../layouts/components";
import { Button } from "../../../components/Button";

const cn = classNames.bind(styles);

const Confirm = () => {
  const location = useLocation();
  const { data, customer, totalExpense, customerPaid } = location.state;

  const [notification, setNotification] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const userData = useSelector((state) => state.auth.login?.currentUser);
  const user = userData?.account;

  const exchange = totalExpense - customerPaid;

  const handleConfirmButton = () => {
    try {
      const url = process.env.REACT_APP_SERVER_URL + "/order";

      const confirmData = {
        total: parseInt(totalExpense),
        paid: parseInt(customerPaid),
        exchange: parseInt(exchange),
        customer: customer,
        account: user,
        data: data.rows,
      };

      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: JSON.stringify(confirmData),
        url,
      };

      axios(options)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          const message = data.message;

          setNotification(message);
          setModalOpen(!modalOpen);
        });
    } catch (error) {
      setNotification(error.message);
      setModalOpen(!modalOpen);
    }
  };

  const handleCloseModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  return (
    <div className={cn("wrapper")}>
      <div className={cn("header")}>
        <button onClick={() => window.history.go(-1)}>
          <FontAwesomeIcon className={cn("back")} icon={faArrowLeft} />
        </button>
        <h1 className={cn("header-title")}>Confirm order</h1>
      </div>
      <div className={cn("flex", "justify-evenly", "items-center")}>
        <div className={cn("form-control", "form-control__customer")}>
          <p>Full name: {customer.fullName}</p>
          <p>Phone: {customer.phone}</p>
          <p>Address: {customer.address}</p>
        </div>
        <div className={cn("form-control")}>
          <div className={cn("cart-control")}>
            <span className={cn("title")}>Total expense:</span>
            <span className={cn("operand")}>+</span>
            <span className={cn("price")}>{totalExpense}</span>
          </div>
          <div className={cn("cart-control")}>
            <span className={cn("title")}>Coupons:</span>
            <span className={cn("operand")}>-</span>
            <span className={cn("price")}>0</span>
          </div>
          <div className={cn("cart-control")}>
            <span className={cn("title")}>Practical expense:</span>
            <span className={cn("operand")}>+</span>
            <span className={cn("price")}>{totalExpense}</span>
          </div>
          <div className={cn("cart-control")}>
            <span className={cn("title")}>Customer paid:</span>
            <span className={cn("operand")}>-</span>
            <span className={cn("price")}>{customerPaid}</span>
          </div>
          <div className={cn("cart-control")}>
            <span className={cn("title")}>Exchange:</span>
            <span className={cn("operand")}>{exchange > 0 ? "+" : "-"}</span>
            <span className={cn("price")}>{Math.abs(exchange)}</span>
          </div>
        </div>
      </div>
      <Table data={data} />
      <div className={cn("flex", "justify-center", "items-center")}>
        <Button
          primary
          onClick={() => handleConfirmButton()}
          rightIcon={<FontAwesomeIcon icon={faHandPointRight} />}
        >
          Confirm
        </Button>
      </div>
      <Modal modalOpen={modalOpen}>
        <Receipt
          data={data}
          user={user}
          exchange={exchange}
          customer={customer}
          totalExpense={totalExpense}
          customerPaid={customerPaid}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Confirm;
