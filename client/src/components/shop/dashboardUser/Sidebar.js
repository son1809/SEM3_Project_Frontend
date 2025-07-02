import React, { Fragment, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "./Action";
import { DashboardUserContext } from "./Layout";

const Sidebar = (props) => {
  const { data } = useContext(DashboardUserContext);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Fragment>
      <div className="flex flex-col w-full space-y-4 md:w-3/12 font-medium">
        <div
          style={{ background: "#303031" }}
          className="flex items-center space-x-2 rounded shadow p-2 text-gray-100"
        >
          <svg
            className="cursor-pointer w-16 h-16 text-gray-100"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex flex-col w-full">
            <span className="text-sm">Hello,</span>
            <span className="text-lg">
              {data.userDetails ? data.userDetails.name : ""}
            </span>
          </div>
        </div>
        <div className="shadow hidden md:block w-full flex flex-col">
          <div
            onClick={() => {
              if (props.setDashboardSection) props.setDashboardSection("orders");
              navigate("/user/orders");
            }}
            className={`${props.dashboardSection === "orders" && location.pathname === "/user/orders" ? "border-r-4 border-yellow-700 bg-gray-200" : ""} px-4 py-4 hover:bg-gray-200 cursor-pointer`}
            style={{
              background: (props.dashboardSection === "orders" && location.pathname === "/user/orders") ? "#fefcbf" : undefined
            }}
          >
            My Orders
          </div>
          <hr />
          <div
            onClick={() => {
              if (props.setDashboardSection) {
                props.setDashboardSection("profile");
                if (location.pathname !== "/user/profile") {
                  navigate("/user/profile");
                }
              }
            }}
            className={`${props.dashboardSection === "profile" && location.pathname === "/user/profile" ? "border-r-4 border-yellow-700 bg-gray-200" : ""} px-4 py-4 hover:bg-gray-200 cursor-pointer`}
            style={{
              background: (props.dashboardSection === "profile" && location.pathname === "/user/profile") ? "#fefcbf" : undefined
            }}
          >
            My Accounts
          </div>
          <hr />
          <div
            onClick={() => {
              if (props.setDashboardSection) {
                props.setDashboardSection("setting");
                if (location.pathname !== "/user/setting") {
                  navigate("/user/setting");
                }
              }
            }}
            className={`${props.dashboardSection === "setting" && location.pathname === "/user/setting" ? "border-r-4 border-yellow-700 bg-gray-200" : ""} px-4 py-4 hover:bg-gray-200 cursor-pointer`}
            style={{
              background: (props.dashboardSection === "setting" && location.pathname === "/user/setting") ? "#fefcbf" : undefined
            }}
          >
            Setting
          </div>
          <hr />
          <div
            onClick={() => {
              if (props.setDashboardSection) {
                props.setDashboardSection("feedbacks");
                if (location.pathname !== "/user/feedbacks") {
                  navigate("/user/feedbacks");
                }
              }
            }}
            className={`${props.dashboardSection === "feedbacks" && location.pathname === "/user/feedbacks" ? "border-r-4 border-yellow-700 bg-gray-200" : ""} px-4 py-4 hover:bg-gray-200 cursor-pointer`}
            style={{
              background: (props.dashboardSection === "feedbacks" && location.pathname === "/user/feedbacks") ? "#fefcbf" : undefined
            }}
          >
            My Feedbacks
          </div>
          <hr />
          <div
            onClick={() => {
              if (props.setDashboardSection) {
                props.setDashboardSection("returns");
                if (location.pathname !== "/user/returns") {
                  navigate("/user/returns");
                }
              }
            }}
            className={`${props.dashboardSection === "returns" && location.pathname === "/user/returns" ? "border-r-4 border-yellow-700 bg-gray-200" : ""} px-4 py-4 hover:bg-gray-200 cursor-pointer`}
            style={{
              background: (props.dashboardSection === "returns" && location.pathname === "/user/returns") ? "#fefcbf" : undefined
            }}
          >
            My Returns / Replacements
          </div>
          <hr />
          <div
            onClick={(e) => logout()}
            className={`${
              location.pathname === "/admin/dashboard/categories"
                ? "border-r-4 border-yellow-700 bg-gray-200"
                : ""
            }  px-4 py-4 hover:bg-gray-200 cursor-pointer`}
          >
            Logout
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
