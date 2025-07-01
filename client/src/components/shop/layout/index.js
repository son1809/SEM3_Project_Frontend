import React, { Fragment, createContext, useReducer } from "react";
import { Navber, Footer, CartModal } from "../partials";
import LoginSignup from "../auth/LoginSignup";
import { layoutState, layoutReducer } from "./layoutContext";

export const LayoutContext = createContext();

const Layout = ({ children }) => {
  const [data, dispatch] = useReducer(layoutReducer, layoutState);
  return (
    <LayoutContext.Provider value={{ data, dispatch }}>
      <Fragment>
        <Navber />
        <LoginSignup />
        <CartModal />
        {/* Main content wrapper with padding to avoid navbar clipping */}
        <div className="flex-grow pt-24 md:pt-28 min-h-screen bg-white">
          {children}
        </div>
        <Footer />
      </Fragment>
    </LayoutContext.Provider>
  );
};

export default Layout;
