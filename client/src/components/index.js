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
  Blog,
  ContactUs,
} from "./shop";
import { DashboardAdmin, Categories, Products, Orders, AdminEmployeeLogin, AdminEmployeeRegister, ChangeEmployeePassword, UserList } from "./admin";
import { UserProfile, UserOrders, SettingUser } from "./shop/dashboardUser";
import FeedbackAndReturnTabs from "./shop/dashboardUser/FeedbackAndReturnTabs";
import PaypalReturn from "./shop/order/PaypalReturn"; // <-- Add this import

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

        {/* Admin Auth & User Management Routes */}
        <Route path="/admin/login" element={<AdminEmployeeLogin />} />
        <Route path="/admin/register" element={<AdminProtectedRoute><AdminEmployeeRegister /></AdminProtectedRoute>} />
        <Route path="/admin/change-employee-password" element={<AdminProtectedRoute><ChangeEmployeePassword /></AdminProtectedRoute>} />
        <Route path="/admin/users" element={<AdminProtectedRoute><UserList /></AdminProtectedRoute>} />
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
        <Route
          path="/user/feedbacks"
          element={
            <ProtectedRoute>
              <UserOrders dashboardSectionDefault="feedbacks" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/returns"
          element={
            <ProtectedRoute>
              <UserOrders dashboardSectionDefault="returns" />
            </ProtectedRoute>
          }
        />
        {/* User Dashboard End */}

        {/* Blog & Contact Us */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact-us" element={<ContactUs />} />
        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
