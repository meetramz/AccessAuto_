import { useState } from "react";

export default function GlobalPayments() {
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });
  const [message, setMessage] = useState("");

  const handlePay = async () => {
    const [month, year] = card.expiry.split("/");

    try {
      const res = await fetch("http://localhost:5000/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: "1000", // $10.00
          currency: "USD",
          card: {
            number: card.number,
            expiry_month: month,   // ✅ matches backend
            expiry_year: "20" + year, // ✅ matches backend
            cvv: card.cvv,
          },
        }),
      });

      const data = await res.json();
      console.log("Response:", data);

      if (data.error || data.response_code === "FAILED") {
        setMessage("❌ Payment Failed: " + (data.message || data.error));
      } else {
        setMessage(
          "✅ Payment Success! Transaction ID: " +
            (data.transaction_id || "N/A")
        );
      }
    } catch (err) {
      console.error("Frontend error:", err.message);
      setMessage("❌ Payment Failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          GlobalPay Payment
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Card Number"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={card.number}
            onChange={(e) => setCard({ ...card, number: e.target.value })}
          />

          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={card.expiry}
              onChange={(e) => setCard({ ...card, expiry: e.target.value })}
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-1/2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={card.cvv}
              onChange={(e) => setCard({ ...card, cvv: e.target.value })}
            />
          </div>

          <button
            onClick={handlePay}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Pay Now
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("Success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
