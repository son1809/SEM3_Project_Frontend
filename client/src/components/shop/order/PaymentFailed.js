import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navber from "../partials/Navber";
import Footer from "../partials/Footer";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Try to get last payment url from state or fallback
  const retryUrl = "/checkout";
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="fixed top-0 left-0 w-full z-30"><Navber /></div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-24 mt-24 mb-12">
        <svg className="w-24 h-24 text-red-500 mb-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9l-6 6M9 9l6 6" />
        </svg>
        <h1 className="text-4xl font-bold text-red-700 mb-4">Payment Failed</h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">Sorry, your payment could not be processed. Please try again or contact support if the problem persists.</p>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded shadow text-lg"
            onClick={() => navigate(retryUrl)}
          >
            Retry Payment
          </button>
          <button
            className="bg-white border border-yellow-500 text-yellow-700 font-bold py-3 px-8 rounded shadow text-lg hover:bg-yellow-50"
            onClick={() => navigate("/")}
          >
            Continue shopping
          </button>
        </div>
      </div>
      <div className="mt-auto w-full"><Footer /></div>
    </div>
  );
};

export default PaymentFailed;
