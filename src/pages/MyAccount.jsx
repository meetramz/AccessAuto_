import React, { useState, useEffect } from 'react';
import { User, Settings, Mail, Bell, Shield } from 'lucide-react';

const API_LOGIN = "https://backend-kzpz.onrender.com/api/accounts/login/";
const API_REGISTER = "https://backend-kzpz.onrender.com/api/accounts/register/";
const API_ME = "https://backend-kzpz.onrender.com/api/accounts/me/";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [authTab, setAuthTab] = useState("login");
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("access_token");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  });

  const [editInfo, setEditInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: ""
  });

  const getAuthHeaders = () =>
    token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(API_ME, {
          headers: { "Content-Type": "application/json", ...getAuthHeaders() }
        });
        const data = await res.json();
        setUserInfo(data);
        setEditInfo({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || ""
        });
      } catch (e) {
        console.error("Error fetching user info", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(API_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      localStorage.setItem("access_token", data.access);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(API_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm)
      });
      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();
      localStorage.setItem("access_token", data.access);
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditInputChange = (field, value) => {
    setEditInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      await fetch(API_ME, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify(editInfo)
      });
      setUserInfo((info) => ({ ...info, ...editInfo }));
    } catch (e) {
      console.error("Save failed", e);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  };

  const navigationItems = [
    { id: "overview", label: "Overview", icon: <User className="w-5 h-5 mr-3" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-5 h-5 mr-3" /> }
  ];

  const statsCards = [
    {
      count: 1,
      label: "Account Active",
      icon: <Shield className="w-8 h-8 mx-auto mb-2" />,
      bgColor: "rgba(209, 250, 229, 0.5)",
      iconColor: "#10b981"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-xl shadow-lg text-xl font-semibold">
          Loading your account...
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <div className="flex justify-between mb-6">
            <button
              onClick={() => setAuthTab("login")}
              className={`px-4 py-2 font-bold ${
                authTab === "login" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthTab("register")}
              className={`px-4 py-2 font-bold ${
                authTab === "register" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-400"
              }`}
            >
              Register
            </button>
          </div>

          {authTab === "login" ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full p-3 border rounded"
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                value={registerForm.first_name}
                onChange={(e) => setRegisterForm({ ...registerForm, first_name: e.target.value })}
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={registerForm.last_name}
                onChange={(e) => setRegisterForm({ ...registerForm, last_name: e.target.value })}
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                className="w-full p-3 border rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                className="w-full p-3 border rounded"
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-end p-4">
        <button
          onClick={logout}
          className="text-sm text-red-600 underline hover:text-red-800"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10" />
              </div>
              <h2 className="text-lg font-bold">{userInfo.first_name} {userInfo.last_name}</h2>
              <p className="text-sm text-gray-500">{userInfo.email}</p>
            </div>
            <nav className="mt-6 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-4 py-2 rounded ${
                    activeTab === item.id ? "bg-blue-600 text-white" : "text-gray-600"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3 space-y-6">
            {activeTab === "overview" && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-2xl font-bold mb-4">Account Overview</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {statsCards.map((card, index) => (
                    <div key={index} className="rounded p-4 text-center" style={{ background: card.bgColor }}>
                      <div style={{ color: card.iconColor }}>{card.icon}</div>
                      <div className="text-xl font-bold">{card.count}</div>
                      <div>{card.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Personal Info</h3>
                  <button
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {isEditing ? "Save Changes" : "Edit"}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["first_name", "last_name", "email", "phone", "address"].map((field) => (
                    <div key={field}>
                      <label className="text-sm text-gray-500 capitalize">{field.replace("_", " ")}</label>
                      <input
                        type="text"
                        value={editInfo[field]}
                        onChange={(e) => handleEditInputChange(field, e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border rounded mt-1 disabled:bg-gray-100"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
