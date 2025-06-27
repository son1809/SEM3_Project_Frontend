import DashboardAdmin from "./dashboardAdmin";
import Categories from "./categories";
import Products from "./products";
import Orders from "./orders";
import AdminEmployeeLogin from "./auth/AdminEmployeeLogin";
import AdminEmployeeRegister from "./auth/AdminEmployeeRegister";
import ChangeEmployeePassword from "./auth/ChangeEmployeePassword";
import UserList from "./auth/UserList";
import AdminProtectedRoute from "../shop/auth/AdminProtectedRoute";
import { Routes, Route } from "react-router-dom";

export { DashboardAdmin, Categories, Products, Orders, AdminEmployeeLogin, AdminEmployeeRegister, ChangeEmployeePassword, UserList, AdminProtectedRoute };

// Add the following routes in your main AppRoutes or wherever you define routes:
//
// <Route path="/admin/login" element={<AdminEmployeeLogin />} />
// <Route path="/admin/register" element={<AdminProtectedRoute><AdminEmployeeRegister /></AdminProtectedRoute>} />
// <Route path="/admin/change-employee-password" element={<AdminProtectedRoute><ChangeEmployeePassword /></AdminProtectedRoute>} />
// <Route path="/admin/users" element={<AdminProtectedRoute><UserList /></AdminProtectedRoute>} />
