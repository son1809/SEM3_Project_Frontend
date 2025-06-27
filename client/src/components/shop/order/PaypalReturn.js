import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { confirmPaypalPayment } from "./FetchApi";

const PaypalReturn = () => {
  const [status, setStatus] = useState("Processing...");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      confirmPaypalPayment(token).then((result) => {
        if (result && result.success) {
          setStatus("Payment successful! Thank you for your order.");
          setTimeout(() => navigate("/user/orders"), 2000);
        } else {
          setStatus("Payment failed or cancelled.");
        }
      });
    } else {
      setStatus("No payment token found.");
    }
  }, [location, navigate]);

  return <div className="p-8 text-center">{status}</div>;
};

export default PaypalReturn;