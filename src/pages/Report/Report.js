import { Button } from "../../components/Button";
import { Table } from "../../layouts/components";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";

import classNames from "classnames/bind";
import styles from "./Report.module.scss";

import axios from "axios";
import { useState, useEffect } from "react";

import config from "../../config";

const cn = classNames.bind(styles);

const Report = () => {
  const convertStringToDate = (date) => {
    const dateFormat = new Date(date);

    const year = dateFormat.getFullYear();
    const month = dateFormat.getMonth() + 1;
    const day = dateFormat.getDate();

    return {
      year,
      month,
      day,
    };
  };

  const [endTime, setEndTime] = useState({});
  const [details, setDetails] = useState([]);
  const [timeline, setTimeline] = useState(0);
  const [totalSold, setTotalSold] = useState(0);
  const [startTime, setStartTime] = useState({});
  const [isOpen, setModalOpen] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [notification, setNotification] = useState("");

  const handleStartTime = (event) => {
    const date = convertStringToDate(event.target.value);

    setStartTime(date);
  };

  const handleEndTime = (event) => {
    const date = convertStringToDate(event.target.value);

    setEndTime(date);
  };

  const [orders, setOrders] = useState({
    onShow: 6,
    showOptions: true,
    options: [
      {
        to: config.routes.customer.order,
        option: "details",
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

  const [allOrders, setAllOrders] = useState(orders.rows);

  useEffect(() => {
    try {
      const url = process.env.REACT_APP_SERVER_URL + "/order";

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

          let revenue = 0;
          let amount = 0;
          let orderDetails = [];

          if (values) {
            for (const value of values) {
              orderDetails.push({
                orderID: value._id,
                orderDetails: value.orderDetails,
              });

              for (const orderDetail of value.orderDetails) {
                amount += orderDetail.amount;
              }

              delete value.orderDetails;
              value.exchange = Math.abs(value.exchange);

              const date = new Date(value.createdAt);
              const formattedDate =
                date.getDate() +
                "-" +
                date.toLocaleString("default", { month: "long" }) +
                "-" +
                date.getFullYear();

              value.createdAt = formattedDate;
              revenue += value.total;
            }
          }

          setAllOrders(values);
          setTotalSold(amount);
          setTotalRevenue(revenue);
          setDetails(orderDetails);
          setTotalOrders(values.length);
          setOrders({ ...orders, rows: values });
        });
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTimelineButton = () => {
    if (timeline === "1") {
      const targetOrders = [];
      let sold = 0;
      let revenue = 0;
      let totalOrders = 0;

      for (const value of allOrders) {
        const newDate = new Date();
        const today = parseInt(newDate.getDate());
        const date = convertStringToDate(value.createdAt);

        if (date.day === today) {
          for (const detail of details) {
            if (detail.orderID === value._id) {
              for (const orderDetail of detail.orderDetails) {
                sold += orderDetail.amount;
              }
            }
          }

          revenue += value.total;

          targetOrders.push({ ...value });
        }
      }

      totalOrders = targetOrders.length;

      setTotalSold(sold);
      setTotalOrders(totalOrders);
      setTotalRevenue(revenue);

      setOrders({ ...orders, rows: targetOrders });
    } else if (timeline === "2") {
      const targetOrders = [];

      let sold = 0;
      let revenue = 0;
      let totalOrders = 0;

      for (const value of allOrders) {
        const date = convertStringToDate(value.createdAt);
        const newDate = new Date();
        const yesterday = parseInt(newDate.getDate()) - 1;

        if (date.day === yesterday) {
          for (const detail of details) {
            if (detail.orderID === value._id) {
              for (const orderDetail of detail.orderDetails) {
                sold += orderDetail.amount;
              }
            }
          }

          revenue += value.total;

          targetOrders.push({ ...value });
        }
      }

      totalOrders = targetOrders.length;

      setTotalSold(sold);
      setTotalOrders(totalOrders);
      setTotalRevenue(revenue);

      setOrders({ ...orders, rows: targetOrders });
    } else if (timeline === "3") {
      const targetOrders = [];

      let sold = 0;
      let revenue = 0;
      let totalOrders = 0;

      for (const value of allOrders) {
        const date = convertStringToDate(value.createdAt);
        const newDate = new Date();
        const today = parseInt(newDate.getDate());
        const sevenDaysAgo = parseInt(newDate.getDate()) - 7;

        if (date.day >= sevenDaysAgo && date.day <= today) {
          for (const detail of details) {
            if (detail.orderID === value._id) {
              for (const orderDetail of detail.orderDetails) {
                sold += orderDetail.amount;
              }
            }
          }

          revenue += value.total;

          targetOrders.push({ ...value });
        }
      }

      totalOrders = targetOrders.length;

      setTotalSold(sold);
      setTotalOrders(totalOrders);
      setTotalRevenue(revenue);

      setOrders({ ...orders, rows: targetOrders });
    } else if (timeline === "4") {
      const targetOrders = [];

      let sold = 0;
      let revenue = 0;
      let totalOrders = 0;

      for (const value of allOrders) {
        const date = convertStringToDate(value.createdAt);
        const newDate = new Date();
        const thisMonth = parseInt(newDate.getMonth()) + 1;

        if (date.month === thisMonth) {
          if (date.day >= 1 && date.day <= 31) {
            for (const detail of details) {
              if (detail.orderID === value._id) {
                for (const orderDetail of detail.orderDetails) {
                  sold += orderDetail.amount;
                }
              }
            }

            revenue += value.total;
            targetOrders.push({ ...value });
          }
        }
      }

      totalOrders = targetOrders.length;

      setTotalSold(sold);
      setTotalOrders(totalOrders);
      setTotalRevenue(revenue);

      setOrders({ ...orders, rows: targetOrders });
    }
  };

  const handleTimeRangeButton = () => {
    const endTimeRange = new Date(endTime.year, endTime.month - 1, endTime.day);
    const startTimeRange = new Date(
      startTime.year,
      startTime.month - 1,
      startTime.day
    );

    const targetOrders = [];
    let sold = 0;
    let revenue = 0;
    let totalOrders = 0;

    for (const value of allOrders) {
      const date = new Date(value.createdAt);
      const dateTimeRange = date.getTime();

      if (
        dateTimeRange >= startTimeRange.getTime() &&
        dateTimeRange <= endTimeRange.getTime()
      ) {
        for (const detail of details) {
          if (detail.orderID === value._id) {
            for (const orderDetail of detail.orderDetails) {
              sold += orderDetail.amount;
            }
          }
        }

        revenue += value.total;

        targetOrders.push({ ...value });
      }
    }

    totalOrders = targetOrders.length;

    setTotalSold(sold);
    setTotalOrders(totalOrders);
    setTotalRevenue(revenue);

    setOrders({ ...orders, rows: targetOrders });
  };

  const handleMessageModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  return (
    <div className={cn("wrapper")}>
      <h1 className={cn("title")}>Report And Analytics</h1>
      <div className={cn("content")}>
        <div className={cn("flex", "justify-between", "items-center", "my-4")}>
          <div className={cn("form-control")}>
            <select
              id="timeline"
              name="timeline"
              defaultValue={timeline}
              className={cn("form-input")}
              onChange={(event) => setTimeline(event.target.value)}
            >
              <option disabled hidden value="0">
                - - Select timeline - -
              </option>
              <option value="1">Today</option>
              <option value="2">Yesterday</option>
              <option value="3">In 7 days</option>
              <option value="4">This month</option>
            </select>
          </div>
          <Button
            onClick={() => {
              handleTimelineButton();
            }}
            primary
          >
            Show
          </Button>
        </div>
        <div className={cn("flex", "justify-between", "items-center", "my-4")}>
          <div className={cn("form-control")}>
            <input
              type="date"
              id="startTime"
              name="startTime"
              className={cn("form-input")}
              onChange={(event) => handleStartTime(event)}
            />
          </div>
          <div className={cn("form-control")}>
            <input
              type="date"
              id="endTime"
              name="endTime"
              className={cn("form-input")}
              onChange={(event) => {
                handleEndTime(event);
              }}
            />
          </div>
          <Button
            primary
            onClick={() => {
              handleTimeRangeButton();
            }}
          >
            Show
          </Button>
        </div>
        <div className={cn("flex", "justify-between", "items-center", "my-4")}>
          <div>
            <span>Revenue:</span>
            <span>{totalRevenue}</span>
          </div>
          <div>
            <span>Orders:</span>
            <span>{totalOrders}</span>
          </div>
          <div>
            <span>Sold:</span>
            <span>{totalSold}</span>
          </div>
        </div>
        <Table data={orders} />
      </div>
      <Modal modalOpen={isOpen}>
        <Toast message={notification} handleCloseModal={handleMessageModal} />
      </Modal>
    </div>
  );
};

export default Report;
