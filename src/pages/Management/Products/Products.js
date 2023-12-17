import Modal from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { Table, AddProduct } from "../../../layouts/components";

import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBoxArchive } from "@fortawesome/free-solid-svg-icons";

import classNames from "classnames/bind";
import styles from "./Products.module.scss";

import axios from "axios";
import { Fragment, useState, useEffect } from "react";

import configs from "../../../config";

const cn = classNames.bind(styles);

function Products() {
  const userData = useSelector((state) => state.auth.login?.currentUser);

  const user = userData?.account;
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState({
    type: "product",
    onShow: 5,
    showOptions: true,
    options: [
      {
        to: configs.routes.details.products,
        option: "details",
      },
      {
        to: configs.routes.details.products,
        option: "archive",
      },
    ],
    headers: [
      "Code",
      "Name",
      "Category",
      "Model",
      "Color",
      "RAM",
      "In Stock",
      "Released Date",
      "Sale Price",
      "On Sale",
      "Options",
    ],
    rows: [],
  });

  useEffect(() => {
    try {
      const url = process.env.REACT_APP_SERVER_URL + "/product";

      const options = {
        method: "GET",
        url,
      };

      axios(options)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          const documents = data.data;

          setProducts({ ...products, rows: documents });
        });
    } catch (error) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateAccount = () => {
    setModalOpen(!modalOpen);
  };

  const handleCloseModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  return (
    <Fragment>
      <div className={cn("wrapper")}>
        <h1 className={cn("title")}>Product Catalog</h1>
        <div className={cn("header")}>
          <div className={cn("total-amount", "mr-4")}>
            <span>There are total available:</span>
            <span>{products.rows.length}</span>
            <span>item(s).</span>
          </div>
          {user.admin && (
            <Button
              primary
              leftIcon={<FontAwesomeIcon icon={faPlus} />}
              onClick={() => {
                handleCreateAccount();
              }}
            >
              Create
            </Button>
          )}
          <Button primary leftIcon={<FontAwesomeIcon icon={faBoxArchive} />}>
            <span>Archive</span>
          </Button>
        </div>
        <Table data={products} />
      </div>
      <Modal modalOpen={modalOpen}>
        <AddProduct handleCloseModal={handleCloseModal} />
      </Modal>
    </Fragment>
  );
}

export default Products;
