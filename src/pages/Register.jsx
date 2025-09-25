import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const REGISTER_API = "https://backend-kzpz.onrender.com/api/accounts/register/";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(REGISTER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.detail || "Registration failed");
      } else {
        setSuccess("Account created! You can now login.");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-gradient-main)' }}>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md"
        style={{ border: "1px solid #eee" }}
      >
        <h2 className="text-2xl font-bold mb-7 text-center">Register</h2>
        <div className="space-y-5 mb-5">
          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-100 rounded-lg border focus:outline-none font-medium"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">First name</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-100 rounded-lg border focus:outline-none font-medium"
              autoComplete="given-name"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Last name</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-100 rounded-lg border focus:outline-none font-medium"
              autoComplete="family-name"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-100 rounded-lg border focus:outline-none font-medium"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Vehicle Registration & Search</label>
            <iframe 
              src="https://bookmygarage.com/widget/f336c8b760b04fb48ee3bc951010ed15/?a=transparent&b=%236a5acd&c=%23ffffff&f=%236a5acd&d=%236a5acd&e=%236a5acd" 
              style={{
                overflow: "hidden",
                border: "none",
                margin: "0",
                minHeight: "214px",
                width: "100%"
              }}
              title="BookMyGarage Widget"
            />
          </div>
        </div>
        {error && <div className="text-red-600 my-2 text-center">{error}</div>}
        {success && <div className="text-green-600 my-2 text-center">{success}</div>}
        <button
          type="submit"
          className="w-full bg-[#1976df] text-white py-3 rounded-lg font-bold hover:bg-[#0f5bb5] transition mb-3"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="text-center text-gray-600 mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-[#1976df] underline font-semibold">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}