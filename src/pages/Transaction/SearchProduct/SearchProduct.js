import axios from "axios";
import { useState, useEffect, useRef } from "react";

import "tippy.js/dist/tippy.css";
import HeadlessTippy from "@tippyjs/react/headless";

import classNames from "classnames/bind";
import styles from "./SearchProduct.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import Popper from "../../../components/Popper";
import Product from "../../../components/Product";
import useDebounce from "../../../components/Hooks/useDebounce";

const cn = classNames.bind(styles);

function SearchProduct({
  cartLength,
  totalExpense,
  addedProducts,
  handleCartLength,
  handleTotalExpense,
  handleAddedProducts,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef();

  const handleSearchValue = () => {
    inputRef.current.focus();
    setSearchValue("");
    setSearchResult([]);
  };

  const handleHideResult = (e) => {
    setSearchValue("");
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
      if (value.barcode.startsWith(searchValue)) {
        similarValues.push(value);
      }
    }

    for (const value of searchResult) {
      if (value.name.toLowerCase().startsWith(searchValue.toLowerCase())) {
        similarValues.push(value);
      }
    }

    return (
      <div className={cn("search-result")} tabIndex="-1" {...attrs}>
        <Popper>
          <h4 className={cn("search-title")}>Products</h4>
          {similarValues.map((product) => (
            <Product
              data={product}
              key={product.barcode}
              cartLength={cartLength}
              totalExpense={totalExpense}
              addedProducts={addedProducts}
              handleCartLength={handleCartLength}
              handleTotalExpense={handleTotalExpense}
              handleAddedProducts={handleAddedProducts}
            />
          ))}
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

        const url = process.env.REACT_APP_SERVER_URL + "/product";
        axios
          .get(url)
          .then((response) => {
            return response.data;
          })
          .then((data) => {
            const products = data.data;

            setSearchResult(products);

            setLoading(false);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAPI();
  }, [debouncedValue]);

  return (
    // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context
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
            placeholder={"Search products"}
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
    </div>
  );
}

export default SearchProduct;
