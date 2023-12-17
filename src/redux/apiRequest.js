import qs from "qs";
import axios from "axios";
import {
  logInFail,
  logOutFail,
  logInStart,
  logOutStart,
  logInSuccess,
  logOutSuccess,
} from "./authSlice";
import { getUsersStart, getUsersFailed, getUsersSuccess } from "./userSlice";

import config from "../config";

export const loginUser = async (
  account,
  activeToken,
  setActiveToken,
  dispatch,
  navigate
) => {
  dispatch(logInStart());

  try {
    const url = process.env.REACT_APP_SERVER_URL + "/account/login";

    let headers;

    if (activeToken) {
      headers = {
        "content-type": "application/x-www-form-urlencoded",
        token: `Bearer ${activeToken}`,
      };
    } else {
      headers = {
        "content-type": "application/x-www-form-urlencoded",
      };
    }

    account.email = account.email + "@gmail.com";

    const options = {
      method: "POST",
      withCredentials: true,
      headers: headers,
      data: qs.stringify(account),
      url,
    };

    const response = await axios(options);
    const user = response.data.account;

    dispatch(logInSuccess(response.data));

    if (!user.active) {
      navigate(config.routes.profile.me);
    }

    navigate(config.routes.home);
  } catch (error) {
    dispatch(logInFail());
    setActiveToken(activeToken);
    navigate(config.routes.signIn);
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());

  try {
    const url = process.env.REACT_APP_SERVER_URL + "/account/all-users";

    const options = {
      method: "GET",
      headers: { token: `Bearer ${accessToken}` },
      url,
    };

    const response = await axios(options);
    dispatch(getUsersSuccess(response.data));
  } catch (error) {
    dispatch(getUsersFailed());
  }
};

export const logOut = async (
  dispatch,
  navigate,
  axiosJWT,
  userEmail,
  accessToken
) => {
  dispatch(logOutStart());
  try {
    const url = process.env.REACT_APP_SERVER_URL + "/account/logout";

    await axiosJWT.post(url, userEmail, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    dispatch(logOutSuccess());
    navigate(config.routes.signIn);
  } catch (error) {
    dispatch(logOutFail());
  }
};
