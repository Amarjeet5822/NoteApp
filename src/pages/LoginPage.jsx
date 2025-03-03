import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import {
  loginUser,
  resetState,
} from "../store/features/authUser/authUserSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // get state from authUser
  const { isLogged, loading, error, data, success } = useSelector(
    (state) => state.authUser
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Toast response on UI
  const notify = (message, type = "info") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast.info(message);
    }
  };

  const formHandler = (event) => {
    event.preventDefault();
    if (!email || !pass) {
      notify("missing field");
      return;
    }
    dispatch(loginUser({ email, pass }));
    setEmail("");
    setPass("");
  };
  useEffect(() => {
    loading ? setIsLoading(true) : setIsLoading(false);
    if (success && data?.message) {
      notify(data?.message, "success");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
    if (error) {
      notify(error?.message, "error");
    }
    return () => {
      dispatch(resetState());
    };
  }, [error, success, isLogged, loading, data]);
  return (
    <div className="min-w-44 phone:min-w-60  phone:max-w-2xl tablet:max-w-5xl phone:px-4 tablet:px-4 max-w-60 m-auto text-sm phone:text-base tablet:text-xl ">
      <div
        className={
          isLoading
            ? `fixed top-0  left-0 text-5xl  h-screen w-full flex justify-center items-center`
            : ""
        }
      >
        {isLoading ? "Loading..." : ""}
      </div>
      <form
        onSubmit={formHandler}
        className="flex flex-col justify-center items-center py-8  px-6 "
      >
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
        <div className="bg-white shadow-md rounded-lg px-6 py-6 w-full max-w-sm">
          <p className="text-2xl font-semibold text-center text-gray-800 pb-4">
            Login Please
          </p>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email:
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
            />
          </div>
          <div className="w-full mt-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password:
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
              placeholder="Enter your password"
            />
          </div>
          <div className="w-full mt-6">
            <input
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition duration-200 cursor-pointer"
              type="submit"
              name="submit"
              value="Login"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
