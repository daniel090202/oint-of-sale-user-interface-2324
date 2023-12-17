import { Table } from "../../layouts/components";
import { Button } from "../../components/Button";

import classNames from "classnames/bind";
import styles from "./Transaction.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCircleInfo,
  faHandPointRight,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchProduct from "./SearchProduct";
import SearchCustomer from "./SearchCustomer";

import config from "../../config";

const cn = classNames.bind(styles);

function Transaction() {
  const navigate = useNavigate();

  const [customerPaid, setCustomerPaid] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [customerWrapper, setCustomerWrapper] = useState(
    "form-control--disabled"
  );
  const [customer, setCustomer] = useState({
    phone: "",
    fullName: "",
    address: "",
  });

  const handleIncreaseAmount = (product, data) => {
    const addedProducts = [...data];
    let expense = 0;
    let amount = 0;

    for (const value of addedProducts) {
      const nextAmount = value.amount + 1;

      if (nextAmount > value.remain) {
        return;
      }

      if (value.barcode === product.barcode) {
        value.amount += 1;
        value.total += value.sale;
      }

      amount += value.amount;
      expense += value.amount * value.sale;
    }

    setCartLength(amount);
    setTotalExpense(expense);
    setProducts({ ...products, rows: addedProducts });
  };

  const handleDecreaseAmount = (product, data) => {
    const addedProducts = [...data];
    let expense = 0;
    let amount = 0;

    for (const value of addedProducts) {
      if (value.amount === 1) {
        return;
      }

      if (value.barcode === product.barcode) {
        value.amount -= 1;
        value.total -= value.sale;
      }

      amount += value.amount;
      expense += value.amount * value.sale;

      console.log(value.amount);
      console.log(amount);
    }

    setCartLength(amount);
    setTotalExpense(expense);
    setProducts({ ...products, rows: addedProducts });
  };

  const handleDeleteProduct = (product, data) => {
    const addedProducts = [...data];

    for (const value of addedProducts) {
      if (value.barcode === product.barcode) {
        addedProducts.splice(addedProducts.indexOf(value), 1);
      }
    }

    setProducts({ ...products, rows: addedProducts });
  };

  const [products, setProducts] = useState({
    onShow: 3,
    showOptions: true,
    options: [
      {
        onClick: handleIncreaseAmount,
        option: "up",
      },
      {
        onClick: handleDecreaseAmount,
        option: "down",
      },
      {
        onClick: handleDeleteProduct,
        option: "delete",
      },
    ],
    headers: [
      "Barcode",
      "Name",
      "Unit",
      "Remain",
      "Amount",
      "Total",
      "Options",
    ],
    rows: [],
  });
  const [cartLength, setCartLength] = useState(0);

  const handleForwardButton = () => {
    if (
      customer.address === "" &&
      customer.phone === "" &&
      customer.fullName === ""
    ) {
      return;
    }

    if (customerPaid === 0 || customerPaid < totalExpense) {
      return;
    }

    if (products.rows.length > 0) {
      const actualProducts = {
        ...products,
        onShow: 3,
        showOptions: false,
        options: [],
        headers: ["Barcode", "Name", "Unit", "Remain", "Amount", "Total"],
      };
      navigate(config.routes.transaction.confirm, {
        state: {
          data: actualProducts,
          customer: customer,
          customerPaid: customerPaid,
          totalExpense: totalExpense,
        },
      });
    }
  };

  const handleCustomerMoreInfoButton = () => {
    navigate(config.routes.customer.history, {
      state: { data: customer, type: "customer" },
    });
  };

  return (
    <div className={cn("wrapper")}>
      <div className={cn("flex", "flex-col")}>
        <div className={cn("form-control")}>
          <label>Phone</label>
          <SearchCustomer
            addedCustomer={customer}
            handleAddedCustomer={setCustomer}
            handleCustomerWrapper={setCustomerWrapper}
          />
        </div>
        <div
          className={cn(
            customerWrapper,
            "form-control",
            "form-control__customer"
          )}
        >
          <div className={cn("flex", "justify-between")}>
            <p >{customer.fullName}</p>
            <div>
              <FontAwesomeIcon
                icon={faCircleInfo}
                className={cn("mx-4")}
                onClick={() => handleCustomerMoreInfoButton()}
              />
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setCustomerWrapper("form-control--disabled")}
              />
            </div>
          </div>
          <p>{customer.address}</p>
        </div>
        <div className={cn("form-control")}>
          <label>Product</label>
          <SearchProduct
            cartLength={cartLength}
            addedProducts={products}
            totalExpense={totalExpense}
            handleCartLength={setCartLength}
            handleAddedProducts={setProducts}
            handleTotalExpense={setTotalExpense}
          />
        </div>
        <div className={cn("form-control")}>
          <label>Paid</label>
          <input
            type="number"
            onChange={(event) => {
              setCustomerPaid(event.target.value);
            }}
            className={cn("form-input")}
            placeholder="Customer paid"
            value={customerPaid > 0 ? customerPaid : ""}
          />
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
            <span className={cn("operand")}></span>
            <span className={cn("price")}>{totalExpense}</span>
          </div>
        </div>
        <Button
          primary
          onClick={() => handleForwardButton()}
          rightIcon={<FontAwesomeIcon icon={faHandPointRight} />}
        >
          Forward
        </Button>
      </div>
      <div className={cn("flex", "flex-col")}>
        <div>
          <span>Amount:</span>
          <span>{cartLength}</span>
        </div>
        <Table data={products} />
      </div>
    </div>
  );
}

export default Transaction;
