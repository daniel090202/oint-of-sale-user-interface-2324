import { Table } from "../../../layouts/components";
import { Button } from "../../../components/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./Customers.module.scss";

import axios from "axios";
import { useState, useEffect } from "react";

import configs from "../../../config";

const cn = classNames.bind(styles);

function Customers() {
  const [customers, setCustomers] = useState({
    type: "customer",
    onShow: 3,
    showOptions: true,
    options: [
      {
        to: configs.routes.customer.history,
        option: "details",
      },
      {
        to: "",
        option: "archive",
      },
    ],
    headers: ["Full Name", "Phone", "Address", "Options"],
    rows: [],
  });

  useEffect(() => {
    try {
      const url = process.env.REACT_APP_SERVER_URL + "/customer";

      const options = {
        method: "GET",
        url,
      };

      axios(options)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          const values = data.data;

          setCustomers({ ...customers, rows: values });
        });
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("wrapper")}>
      <h1 className={cn("title")}>Customer Information</h1>
      <div className={cn("header")}>
        <div className={cn("total-amount", "mr-4")}>
          <span>There are total available:</span>
          <span>{customers.rows.length}</span>
          <span>customer(s).</span>
        </div>
      </div>
      <Table data={customers} />
    </div>
  );
}

export default Customers;
