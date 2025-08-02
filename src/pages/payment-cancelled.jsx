import React from 'react';
import { XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentDeclined = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
      <XCircle className="w-20 h-20 text-red-600 mb-6" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Failed</h1>
      <p className="text-gray-700 mb-6">Unfortunately, your payment was declined. Please try again or contact support.</p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/booking"
          className="px-6 py-3 rounded-md text-white font-semibold bg-red-600 hover:bg-red-700 transition-all"
        >
          Try Again
        </Link>
        <Link
          to="/contact"
          className="px-6 py-3 rounded-md font-semibold border border-red-600 text-red-700 hover:bg-red-100 transition-all"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default PaymentDeclined;
