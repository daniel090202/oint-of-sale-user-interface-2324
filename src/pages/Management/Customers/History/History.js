import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Table } from "../../../../layouts/components";

import classNames from "classnames/bind";
import styles from "./History.module.scss";

import axios from "axios";

import config from "../../../../config";

const cn = classNames.bind(styles);

function History() {
  const location = useLocation();
  const { data } = location.state;

  const [orders, setOrders] = useState({
    onShow: 3,
    showOptions: true,
    options: [
      {
        to: config.routes.customer.order,
        option: "details",
      },
      {
        to: "",
        option: "archive",
      },
    ],
    headers: [
      "ID",
      "Phone",
      "Total price",
      "Customer paid",
      "Exchange",
      "Date",
      "Options",
    ],
    rows: [],
  });

  useEffect(() => {
    try {
      const url = process.env.REACT_APP_SERVER_URL + "/order/customer";

      const options = {
        method: "GET",
        params: {
          phone: data.phone,
        },
        url,
      };

      axios(options)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          const values = data.data;

          if (values) {
            for (const value of values) {
              delete value.orderDetails;
              value.exchange = Math.abs(value.exchange);

              const date = new Date(value.createdAt);
              const formattedDate =
                date.getDate() +
                " " +
                date.toLocaleString("default", { month: "long" }) +
                " " +
                date.getFullYear();

              value.createdAt = formattedDate;
            }
          }

          setOrders({ ...orders, rows: values });
        });
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("wrapper")}>
      <div className={cn("header")}>
        <button className={cn("back")} onClick={() => window.history.go(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <h1>Purchase history</h1>
      </div>
      <div>
        <span>Customer: </span>
        <span>{data.fullName}</span>
      </div>
      <div>
        <span>Total: </span>
        <span>{orders.rows.length}</span>
      </div>
      <Table data={orders} />
    </div>
  );
}

export default History;
