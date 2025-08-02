import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LOGIN_API = "https://backend-kzpz.onrender.com/api/accounts/login/";
const REFRESH_API = "https://backend-kzpz.onrender.com/api/accounts/token/refresh/";

// How long your access token lasts (in milliseconds). Adjust to your backend!
const ACCESS_TOKEN_LIFETIME_MS = 14 * 60 * 1000; // 14 minutes

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  // ---- NEW ----
  function setupAutoRefresh() {
    // Clear any previous timer
    if (window._accessTokenRefreshTimer) clearInterval(window._accessTokenRefreshTimer);

    window._accessTokenRefreshTimer = setInterval(async () => {
      const refresh_token = localStorage.getItem("refresh_token");
      if (!refresh_token) return;
      try {
        const res = await fetch(REFRESH_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refresh_token })
        });
        const data = await res.json();
        if (res.ok && data.access) {
          localStorage.setItem("access_token", data.access);
        } else {
          // If refresh fails, log out
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          clearInterval(window._accessTokenRefreshTimer);
          window.location.href = "/login";
        }
      } catch {
        // Network error: optionally log out or ignore
      }
    }, ACCESS_TOKEN_LIFETIME_MS);
  }
  // --------------

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(LOGIN_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.detail || "Login failed");
      } else {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        setupAutoRefresh(); // ---- NEW ----
        navigate("/");
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
        <h2 className="text-2xl font-bold mb-7 text-center">Login</h2>
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
            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-100 rounded-lg border focus:outline-none font-medium"
              autoComplete="current-password"
            />
          </div>
        </div>
        {error && <div className="text-red-600 my-2 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-[#1976df] text-white py-3 rounded-lg font-bold hover:bg-[#0f5bb5] transition mb-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center text-gray-600 mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#1976df] underline font-semibold">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}