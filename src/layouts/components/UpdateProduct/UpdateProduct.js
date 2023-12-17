import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../../components/Button";

import classNames from "classnames/bind";
import styles from "./UpdateProduct.module.scss";

import qs from "qs";
import axios from "axios";
import { useState } from "react";

import Modal from "../../../components/Modal";
import Toast from "../../../components/Toast";

const cn = classNames.bind(styles);

function UpdateProduct({ data, handleCloseModal }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [product, setProduct] = useState(data);


  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const url = process.env.REACT_APP_SERVER_URL + "/product/update";

      const options = {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(product),
        url,
      };

      axios(options)
        .then((response) => {
          return response.data;
        })
        .then((data) => {
          const message = data.message;

          setNotification(message);
          setModalOpen(!modalOpen);
        });
    } catch (error) {
      setNotification(error.message);
      setModalOpen(!modalOpen);
    }
  };

  const handleMessageModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  return (
    <div className={cn("wrapper")}>
      <div className={cn("header")}>
        <h1 className={cn("title")}>Update product</h1>
        <FontAwesomeIcon
          icon={faXmark}
          className={cn("close")}
          onClick={() => {
            handleCloseModal(false);
          }}
        />
      </div>
      <hr className={cn("horizontal-line")} />
      <form
        method="post"
        className={cn(
          "h-96",
          "grid",
          "grid-cols-2",
          "gap-2",
          "overflow-y-scroll"
        )}
      >
        <div className={cn("form-control")}>
          <label htmlFor="barcode" className={cn("label")}>
            Barcode
          </label>
          <input
            type="text"
            id="barcode"
            name="barcode"
            value={product.barcode}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Barcode attached on the label"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="name" className={cn("label")}>
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Name attached on the label"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="category" className={cn("label")}>
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Category attached on the label"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="brand" className={cn("label")}>
            Brand
          </label>
          <input
            id="brand"
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Brand attached on the label"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="model" className={cn("label")}>
            Model
          </label>
          <input
            id="model"
            type="text"
            name="model"
            value={product.model}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Model attached on the label"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="color" className={cn("label")}>
            Color
          </label>
          <input
            id="color"
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Fill out the hexa code of color"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="ram" className={cn("label")}>
            RAM
          </label>
          <input
            id="ram"
            name="ram"
            type="text"
            value={product.ram}
            onChange={handleChange}
            className={cn("input")}
            placeholder="RAM attached on the label"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="weight" className={cn("label")}>
            Weight
          </label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={product.weight}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Weight attached on the label"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="year" className={cn("label")}>
            Release Year
          </label>
          <input
            id="year"
            type="year"
            name="year"
            value={product.year}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Release year attached on the label"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="original" className={cn("label")}>
            Original Price
          </label>
          <input
            type="number"
            id="original"
            name="original"
            value={product.original}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Original Price only shown for administrator"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="sale" className={cn("label")}>
            Sale Price
          </label>
          <input
            id="sale"
            name="sale"
            type="number"
            value={product.sale}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Sale price decided by the administrator"
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="amount" className={cn("label")}>
            Initial Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={product.amount}
            onChange={handleChange}
            className={cn("input")}
            placeholder="Imported amount attached on the container"
          />
        </div>
      </form>
      <div className={cn("w-full", "my-10", "flex", "justify-center")}>
        <Button
          primary
          onClick={handleSubmit}
          rightIcon={<FontAwesomeIcon icon={faPenToSquare} />}
        >
          Update
        </Button>
      </div>
      <Modal modalOpen={modalOpen}>
        <Toast message={notification} handleCloseModal={handleMessageModal} />
      </Modal>
    </div>
  );
}

export default UpdateProduct;
