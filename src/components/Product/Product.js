import PropTypes from "prop-types";

import styles from "./Product.module.scss";
import classNames from "classnames/bind";

const cn = classNames.bind(styles);

function Product({
  data,
  cartLength,
  totalExpense,
  addedProducts,
  handleCartLength,
  handleTotalExpense,
  handleAddedProducts,
}) {
  const handleClickButton = () => {
    const products = [...addedProducts.rows];

    if (products.length < 0) {
      return;
    }

    for (const value of products) {
      if (value.barcode === data.barcode) {
        return;
      }
    }

    const expense = totalExpense + parseInt(data.sale);
    handleTotalExpense(expense);

    data.remain = data.amount;

    delete data.ram;
    delete data.color;
    delete data.model;
    delete data.amount;
    delete data.status;
    delete data.category;
    delete data.original;

    data.amount = 1;
    data.total = data.amount * data.sale;

    handleCartLength(cartLength + 1);

    products.push(data);
    handleAddedProducts({ ...addedProducts, rows: products });
  };

  return (
    <button className={cn("wrapper")} onClick={() => handleClickButton()}>
      <h4 className={cn("account-id")}>{data.name}</h4>
    </button>
  );
}

// Props Type Library To Validate The Parameter Of Function Components
Product.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Product;
