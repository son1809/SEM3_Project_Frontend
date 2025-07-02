

import React, { Fragment, createContext, useReducer } from "react";
import AdminLayout from "../layout";
import DashboardCard from "./DashboardCard";
import { dashboardState, dashboardReducer } from "./DashboardContext";
import TodaySell from "./TodaySell";
import UserListPage from "./UserListPage";
import DashboardAnalytics from "./DashboardAnalytics";
import CustomersPage from "./CustomersPage";
import { Routes, Route } from "react-router-dom";

export const DashboardContext = createContext();

const DashboardAdmin = (props) => {
  const [data, dispatch] = useReducer(dashboardReducer, dashboardState);
  return (
    <Fragment>
      <DashboardContext.Provider value={{ data, dispatch }}>
        <AdminLayout>
          <Routes>
            <Route path="/" element={
              <>
                <DashboardCard />
                <DashboardAnalytics />
                <TodaySell />
              </>
            } />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/users" element={<UserListPage />} />
          </Routes>
        </AdminLayout>
      </DashboardContext.Provider>
    </Fragment>
  );
};

export default DashboardAdmin;
