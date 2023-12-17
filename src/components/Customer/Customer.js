import PropTypes from "prop-types";

import styles from "./Customer.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

function Customer({ data, handleAddedCustomer, handleCustomerWrapper }) {
  const handleClickButton = () => {
    handleAddedCustomer(data);
    handleCustomerWrapper("form-control__customer");
  };

  return (
    <button className={cn("wrapper")} onClick={() => handleClickButton()}>
      <p className={cn("title")}>{data.fullName}</p>
      <p>{data.address}</p>
    </button>
  );
}

// Props Type Library To Validate The Parameter Of Function Components
Customer.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Customer;
