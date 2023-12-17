import axios from "axios";
import { useState, useEffect, useRef } from "react";

import "tippy.js/dist/tippy.css";
import HeadlessTippy from "@tippyjs/react/headless";

import classNames from "classnames/bind";
import styles from "./SearchCustomer.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import AddCustomer from "../AddCustomer";
import Modal from "../../../components/Modal";
import Popper from "../../../components/Popper";
import Customer from "../../../components/Customer";
import useDebounce from "../../../components/Hooks/useDebounce";

const cn = classNames.bind(styles);

function SearchCustomer({
  addedCustomer,
  handleAddedCustomer,
  handleCustomerWrapper,
}) {
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  const handleSearchValue = () => {
    inputRef.current.focus();
    setSearchValue("");
    setSearchResult([]);
  };

  const handleHideResult = (e) => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  const renderSearchResult = (attrs) => {
    const similarValues = [];

    for (const value of searchResult) {
      if (value.phone.startsWith(searchValue)) {
        similarValues.push(value);
      }
    }

    return (
      <div className={cn("search-result")} tabIndex="-1" {...attrs}>
        <Popper>
          <h4 className={cn("search-title")}>Customer</h4>
          {similarValues.map((customer) => (
            <Customer
              data={customer}
              key={customer.phone}
              handleAddedCustomer={handleAddedCustomer}
              handleCustomerWrapper={handleCustomerWrapper}
            />
          ))}
          <button
            className={cn("create-button")}
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            Create new
          </button>
        </Popper>
      </div>
    );
  };

  const handleSubmit = (e) => {};

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchAPI = async () => {
      try {
        setLoading(true);

        const url = process.env.REACT_APP_SERVER_URL + "/customer";
        axios
          .get(url, {
            params: {
              data: debouncedValue,
            },
          })
          .then((response) => {
            return response.data;
          })
          .then((data) => {
            const customers = data.data;

            setSearchResult(customers);
            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAPI();
  }, [debouncedValue]);

  const handleCloseModal = (isOpen) => {
    setModalOpen(isOpen);
  };

  return (
    <div>
      <HeadlessTippy
        interactive={true}
        placement="bottom"
        visible={showResult && searchResult.length > 0}
        render={(attrs) => renderSearchResult(attrs)}
        onClickOutside={handleHideResult}
      >
        <div className={cn("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placement="bottom"
            placeholder={"Search customers"}
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className={cn("search-clear")} onClick={handleSearchValue}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <FontAwesomeIcon className={cn("loading")} icon={faSpinner} />
          )}
          <HeadlessTippy content="Search">
            <button
              className={cn("search-button")}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </HeadlessTippy>
        </div>
      </HeadlessTippy>
      <Modal modalOpen={modalOpen}>
        <AddCustomer
          addedCustomer={addedCustomer}
          handleCloseModal={handleCloseModal}
          handleAddedCustomer={handleAddedCustomer}
          handleCustomerWrapper={handleCustomerWrapper}
        />
      </Modal>
    </div>
  );
}

export default SearchCustomer;
