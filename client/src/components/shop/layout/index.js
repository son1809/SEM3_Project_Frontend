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
        <div className="flex-grow">
          <Navber />
          <LoginSignup />
          <CartModal />
          {/* All Children pass from here */}
          {children}
        </div>
        <Footer />
      </Fragment>
    </LayoutContext.Provider>
  );
};

export default Layout;
