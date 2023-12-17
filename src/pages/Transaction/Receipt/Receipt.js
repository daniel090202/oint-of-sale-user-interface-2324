import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleDown } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./Receipt.module.scss";

const cn = classNames.bind(styles);

const Receipt = ({
  data,
  user,
  customer,
  exchange,
  totalExpense,
  customerPaid,
  handleCloseModal,
}) => {
  const date = new Date();

  const handleDownloadReceipt = () => {
    const capture = document.querySelector(".receipt");

    html2canvas(capture).then((canvas) => {
      const imageData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();

      doc.addImage(imageData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save("receipt.pdf");
    });
  };

  return (
    <div className={cn("wrapper")}>
      <div className={cn("header")}>
        <h1 className={cn("header-title")}>Receipt</h1>
        <div>
          <FontAwesomeIcon
            icon={faCircleDown}
            className={cn("close")}
            onClick={() => {
              handleDownloadReceipt();
            }}
          />
          <FontAwesomeIcon
            icon={faXmark}
            className={cn("close")}
            onClick={() => {
              handleCloseModal(false);
            }}
          />
        </div>
      </div>
      <hr className={cn("horizontal-line")} />
      <div className="receipt">
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
        <div className={cn("flex", "flex-col", "items-end", "mt-10")}>
          <div>
            <span>Staff in charge: </span>
            <span>{user.fullName}</span>
          </div>
          <div>
            <span>Created at: </span>
            <span>
              {date.getDate()} - {date.getMonth() + 1} - {date.getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
