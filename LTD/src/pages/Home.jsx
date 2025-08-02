import React, { useState } from 'react';

export default function MOTCheckerForm() {
  const [regNumber, setRegNumber] = useState('');
  const [result, setResult] = useState('');
  const [color, setColor] = useState('text-white');

  const checkMOT = () => {
    const reg = regNumber.trim().toUpperCase();

    if (reg === '') {
      setResult('Please enter a registration number.');
      setColor('text-yellow-400');
    } else if (/^[A-Z0-9]{6,8}$/.test(reg)) {
      setResult(`Checking MOT status for: ${reg}...`);
      setColor('text-green-400');

      // TODO: Integrate actual MOT API here
    } else {
      setResult('Invalid registration format.');
      setColor('text-orange-400');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-white mb-6">Check Your MOT Status</h2>
        <input
          type="text"
          placeholder="Enter Vehicle Reg No."
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          className="w-full p-3 rounded-lg mb-4 text-black"
        />
        <button
          onClick={checkMOT}
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition"
        >
          Check Now
        </button>
        <div className={`mt-4 font-semibold ${color}`}>{result}</div>
      </div>
    </div>
  );
}
