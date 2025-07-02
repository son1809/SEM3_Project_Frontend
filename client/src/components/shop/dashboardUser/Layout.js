import React, { Fragment, createContext, useReducer, useEffect } from "react";
import { Navber, Footer, CartModal } from "../partials";
import Sidebar from "./Sidebar";
import {
  dashboardUserState,
  dashboardUserReducer,
} from "./DashboardUserContext";

import MyFeedbacks from "../feedback/MyFeedbacks";
import MyReturnOrReplacement from "./MyReturnOrReplacement";
import { fetchData } from "./Action";

export const DashboardUserContext = createContext();

const Layout = ({ children, dashboardSectionDefault }) => {
  const [data, dispatch] = useReducer(dashboardUserReducer, dashboardUserState);
  const [dashboardSection, setDashboardSection] = React.useState(dashboardSectionDefault || "orders");

  useEffect(() => {
    fetchData(dispatch);
  }, []);

  let dashboardContent = null;
  if (dashboardSection === "feedbacks") {
    dashboardContent = <MyFeedbacks />;
  } else if (dashboardSection === "returns") {
    dashboardContent = <MyReturnOrReplacement />;
  } else {
    dashboardContent = children;
  }

  return (
    <Fragment>
      <DashboardUserContext.Provider value={{ data, dispatch }}>
        <div className="flex-grow">
          <Navber />
          <CartModal />
          <div className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24 flex flex-col md:flex-row">
            <Sidebar dashboardSection={dashboardSection} setDashboardSection={setDashboardSection} />
            {/* All Children pass from here */}
            {dashboardContent}
          </div>
        </div>
        <Footer />
      </DashboardUserContext.Provider>
    </Fragment>
  );
};

export default Layout;
