import React from "react";
import {
  Home,
  WishList,
  ProtectedRoute,
  AdminProtectedRoute,
  CartProtectedRoute,
  PageNotFound,
  ProductDetails,
  ProductByCategory,
  CheckoutPage,
} from "./shop";
import { DashboardAdmin, Categories, Products, Orders } from "./admin";
import AdminEmployeeLogin from "./admin/auth/AdminEmployeeLogin";
import AdminEmployeeRegister from "./admin/auth/AdminEmployeeRegister";
import ChangeEmployeePassword from "./admin/auth/ChangeEmployeePassword";
import { UserProfile, UserOrders, SettingUser } from "./shop/dashboardUser";
import PaypalReturn from "./shop/order/PaypalReturn"; // <-- Add this import
import MyReturnOrReplacement from "./shop/dashboardUser/MyReturnOrReplacement";
import AllReturnOrReplacement from "./admin/orders/AllReturnOrReplacement";
import MyFeedbacks from "./shop/feedback/MyFeedbacks";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Routing All page will be here */
const AppRoutes = (props) => {
  return (
    <Router>
      <Routes>
        {/* Shop & Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/category/:catId" element={<ProductByCategory />} />
        <Route
          path="/checkout"
          element={
            <CartProtectedRoute>
              <CheckoutPage />
            </CartProtectedRoute>
          }
        />
        <Route path="/paypal-return" element={<PaypalReturn />} /> {/* <-- Add this route */}
        {/* Shop & Public Routes End */}

        {/* Admin Auth Routes */}
        <Route path="/admin/login" element={<AdminEmployeeLogin />} />
        <Route
          path="/admin/register"
          element={
            <AdminProtectedRoute>
              <AdminEmployeeRegister />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/change-password"
          element={
            <AdminProtectedRoute>
              <ChangeEmployeePassword />
            </AdminProtectedRoute>
          }
        />
        {/* Admin Auth Routes End */}

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <DashboardAdmin />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/categories"
          element={
            <AdminProtectedRoute>
              <Categories />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/products"
          element={
            <AdminProtectedRoute>
              <Products />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard/orders"
          element={
            <AdminProtectedRoute>
              <Orders />
            </AdminProtectedRoute>
          }
        />
        {/* Admin Routes End */}

        {/* User Dashboard */}
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/orders"
          element={
            <ProtectedRoute>
              <UserOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/setting"
          element={
            <ProtectedRoute>
              <SettingUser />
            </ProtectedRoute>
          }
        />
        {/* User Dashboard End */}

        {/* User Return/Replacement */}
        <Route
          path="/user/returns"
          element={
            <ProtectedRoute>
              <MyReturnOrReplacement />
            </ProtectedRoute>
          }
        />
        {/* Admin Return/Replacement */}
        <Route
          path="/admin/returns"
          element={
            <AdminProtectedRoute>
              <AllReturnOrReplacement />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/user/feedbacks"
          element={
            <ProtectedRoute>
              <MyFeedbacks />
            </ProtectedRoute>
          }
        />
        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
