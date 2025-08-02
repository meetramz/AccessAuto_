import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
      <CheckCircle className="w-20 h-20 text-green-600 mb-6" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
      <p className="text-gray-700 mb-6">Thank you! Your booking has been confirmed.</p>
      <Link
        to="/"
        className="px-6 py-3 rounded-md text-white font-semibold bg-green-600 hover:bg-green-700 transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;
