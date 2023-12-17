import classNames from "classnames/bind";
import styles from "./SignIn.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { loginUser } from "../../redux/apiRequest";

const cn = classNames.bind(styles);

function SignIn() {
  const [activeToken, setActiveToken] = useState("");
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    setActiveToken(query.get("token"));
  }, []);

  const handleChange = (event) => {
    setAccount({ ...account, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    loginUser(account, activeToken, setActiveToken, dispatch, navigate);
  };

  return (
    <div className={cn("wrapper")}>
      <h1 className={cn("header")}>Sign In</h1>
      <form method="POST" onSubmit={handleSubmit}>
        <div className={cn("form-control")}>
          <label htmlFor="email" className={cn("label")}>
            Username
          </label>
          <input
            id="email"
            type="text"
            name="email"
            onChange={handleChange}
            className={cn("form-input")}
          />
        </div>
        <div className={cn("form-control")}>
          <label htmlFor="password" className={cn("label")}>
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            className={cn("form-input")}
          />
        </div>
        <div className={cn("form-control", "form-control__checkbox")}>
          <input
            type="checkbox"
            id="remember"
            name="remember"
            className={cn("form-input", "form-input__checkbox")}
          />
          <label className={cn("label", "mx-4")} htmlFor="remember">
            Remember
          </label>
        </div>
        <div className={cn("flex", "justify-center")}>
          <Button
            primary
            type="submit"
            rightIcon={<FontAwesomeIcon icon={faRightToBracket} />}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
