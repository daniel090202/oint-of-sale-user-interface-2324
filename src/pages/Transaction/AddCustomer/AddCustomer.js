import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./AddCustomer.module.scss";

import { useState } from "react";

import { Button } from "../../../components/Button";

const cn = classNames.bind(styles);

function AddCustomer({
  addedCustomer,
  handleCloseModal,
  handleAddedCustomer,
  handleCustomerWrapper,
}) {
  const [customer, setCustomer] = useState({
    phone: "",
    fullName: "",
    address: "",
  });

  const handleChange = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  const handleCloseButton = () => {
    handleCloseModal(false);
    handleAddedCustomer(customer);
    handleCustomerWrapper("form-control__customer");
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
            value={customer.fullName}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Full name"
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
            value={customer.phone}
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
            value={customer.address}
            onChange={handleChange}
            className={cn("input")}
            placeholder="XXX Street, District X, HCMC"
          />
        </div>
      </form>
      <div className={cn("flex", "justify-center", "my-4")}>
          <Button primary onClick={() => handleCloseButton()}>
            Create
          </Button>
      </div>
    </div>
  );
}

export default AddCustomer;
