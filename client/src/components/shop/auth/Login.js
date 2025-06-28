import React, { Fragment, useState, useContext } from "react";
import { LayoutContext } from "../index";
import { useSnackbar } from 'notistack';
import { loginReq } from "./fetchApi";

const Login = (props) => {
  const { data: layoutData, dispatch: layoutDispatch } = useContext(LayoutContext);

  const [data, setData] = useState({
    username: "",
    password: "",
    error: false,
    loading: false,
  });

  const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;

  const { enqueueSnackbar } = useSnackbar();

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    try {
      let responseData = await loginReq({
        username: data.username,
        password: data.password,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
        });
      } else if (responseData.token) {
        setData({ username: "", password: "", loading: false, error: false });
        localStorage.setItem("jwt", JSON.stringify(responseData));
        enqueueSnackbar('Login Completed Successfully..!', { variant: 'success' });
        window.location.href = "/";
      }
    } catch (error) {
      setData({
        ...data,
        loading: false,
        error: "Đăng nhập thất bại",
        password: "",
      });
    }
  };

  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Login</div>
      {layoutData.loginSignupError ? (
        <div className="bg-red-200 py-2 px-4 rounded">
          You need to login for checkout. Haven't accont? Create new one.
        </div>
      ) : (
        ""
      )}
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="username">
            Username or email address
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, username: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.username}
            type="text"
            id="username"
            className={`${
              !data.error ? "" : "border-red-500"
            } px-4 py-2 focus:outline-none border"}`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, password: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.password}
            type="password"
            id="password"
            className={`${
              !data.error ? "" : "border-red-500"
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              className="px-4 py-2 focus:outline-none border mr-1"
            />
            <label htmlFor="rememberMe">
              Remember me<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
          <a className="block text-gray-600" href="/">
            Lost your password?
          </a>
        </div>
        <div
          onClick={formSubmit}
          style={{ background: "#303031" }}
          className="font-medium px-4 py-2 text-white text-center cursor-pointer"
        >
          Login
        </div>
      </form>
    </Fragment>
  );
};

export default Login;