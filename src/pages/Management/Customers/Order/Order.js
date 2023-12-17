import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Table } from "../../../../layouts/components";

import classNames from "classnames/bind";
import styles from "./Order.module.scss";

import axios from "axios";

const cn = classNames.bind(styles);

function Order() {
  const location = useLocation();
  const { data } = location.state;

  const [order, setOrder] = useState({
    onShow: 3,
    showOptions: false,
    options: [],
    headers: ["Name", "Unit", "Amount", "Price"],
    rows: [],
  });

  useEffect(() => {
    try {
      const url = process.env.REACT_APP_SERVER_URL + "/order/details";

      const options = {
        method: "GET",
        params: {
          orderID: data._id,
        },
        url,
      };

      axios(options)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          const values = data.data;

          setOrder({ ...order, rows: values });
        });
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("wrapper")}>
      <div className={cn("header")}>
        <button onClick={() => window.history.go(-1)}>
          <FontAwesomeIcon className={cn("back")} icon={faArrowLeft} />
        </button>
        <h1>Order details</h1>
      </div>
      <div>
        <span>Order ID: </span>
        <span>{data._id}</span>
      </div>
      <Table data={order} />
    </div>
  );
}

export default Order;
