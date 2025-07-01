import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <svg className="w-20 h-20 text-green-500 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l3 3 5-5" />
      </svg>
      <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">Thank you for your order. Your payment was processed successfully.</p>
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded"
        onClick={() => navigate("/user/orders")}
      >
        View My Orders
      </button>
    </div>
  );
};

export default PaymentSuccess;
