import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <svg className="w-20 h-20 text-red-500 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9l-6 6M9 9l6 6" />
      </svg>
      <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Failed</h1>
      <p className="text-lg text-gray-700 mb-6">Sorry, your payment could not be processed. Please try again or contact support.</p>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default PaymentFailed;
