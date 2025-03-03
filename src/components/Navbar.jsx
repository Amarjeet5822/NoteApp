import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { logoutUser } from "../store/features/authUser/authUserSlice";
import { FaHome } from "react-icons/fa";
function Navbar() {
  const dispatch = useDispatch();
  const { isLogged } = useSelector((state) => state.authUser);
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logoutUser());
  };
  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged]);
  return (
    <nav className="mx-auto max-w-60 phone:px-4 tablet:px-4 phone:min-w-80  phone:max-w-2xl tablet:max-w-5xl ">
      <div className=" mx-auto phone:text-2xl tablet:text-3xl  text-xl flex justify-evenly phone:justify-evenly  rounded-b-md items-center gap-8  bg-gray-400 py-3">
        <div className="hover:bg-gray-500 py-1 px-4 text-center rounded-md  hover:text-white phone:text-3xl tablet:text-4xl ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-700  font-bold text-3xl" : ""
            }
          >
          <FaHome />
          </NavLink>
        </div>
        <div className="flex gap-2 ">
          <div>
            {!isLogged && (
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-red-700 font-bold" : ""
                }
              >
                Register
              </NavLink>
            )}
          </div>
          <div>
            {isLogged ? (
              <div>
                <button
                  className="hover:bg-gray-500 py-1 px-2 text-center rounded-md hover:text-white "
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-red-700 font-bold" : ""
                }
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
