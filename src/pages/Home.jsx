import React, { useEffect, useState, useRef, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Car, Shield, Clock, Users, CheckCircle, Wrench, Battery, Zap, Settings, Award, MapPin, Phone, Search, ShoppingCart, X as XIcon
} from 'lucide-react';

import brake from '../assets/brake.jpg';
import hero from "../assets/MOT.jpg";
import MOT from '../assets/bg1.jpg';
import vehicleRepairs from '../assets/vehicle_repairs.jpg';
import regularServices from '../assets/regular_services.jpg';
import batteryImg from '../assets/battery.jpg';
import clutch from '../assets/clutch.jpg';
import why from '../assets/why.jpg';
import why2 from '../assets/why2.jpg';
import why3 from '../assets/why3.jpg';

// Backend endpoints
const API_VEHICLE_INFO = "https://backend-kzpz.onrender.com/api/dvla/vehicle-info/";
const API_CART = "https://backend-kzpz.onrender.com/api/dvla/cart/";

const allCategories = [
  {
    id: 'mot', label: 'MOT', services: [
      { id: 1, code: 'mot-base', name: 'MOT', price: 30 },
      { id: 2, code: 'mot_iv', name: 'MOT IV', price: 45 },
      { id: 3, code: 'mot_v', name: 'MOT V', price: 49 },
      { id: 4, code: 'motvii', name: 'MOT VII', price: 60 },
    ]
  },
  {
    id: 'servicing', label: 'Servicing', services: [
      { id: 5, code: 'interim', name: 'Interim Service (Oil Service)', price: 108 },
      { id: 6, code: 'engine', name: 'Engine Service (mid service)', price: 167.87 },
      { id: 7, code: 'full', name: 'Full Service (major)', price: 226.79 }
    ]
  },
  {
    id: 'brakes', label: 'Brakes', services: [
      { id: 8, code: 'front_brake_pads', name: 'Front Brake Pads', price: null },
      { id: 9, code: 'front_brake_disc_pads', name: 'Front Brake Disc and Pads Replacement', price: 252 },
      { id: 10, code: 'rear_brake_disc_pads', name: 'Rear Brake Disc and Pads Replacement', price: 228 },
      { id: 11, code: 'rear_brake_pads', name: 'Rear Brake Pads', price: null },
      { id: 12, code: 'brake_fluid_change', name: 'Brake fluid change (non diagnostics)', price: 72 },
      { id: 13, code: 'brake_repair', name: 'Brake Repair ', price: 132 }
    ]
  },
  {
    id: 'steering', label: 'Steering', services: [
      { id: 14, code: 'front_2wheel_alignment', name: 'Front 2 wheel Alignment', price: 72 },
      { id: 15, code: '4wheel_alignment_camber', name: '4 Wheel Alignment with Camber Caster', price: 144 },
      { id: 16, code: '4wheel_alignment', name: '4 Wheel Alignment', price: 72 },
      { id: 17, code: 'power_steering_fluid', name: 'Power steering fluid change', price: 156 }
    ]
  },
  {
    id: 'general_electrics', label: 'General electrics', services: [
      { id: 18, code: 'battery_replacement', name: 'Battery replacement (vehicles with stop/start system)', price: null },
      { id: 19, code: 'alternator_replacement', name: 'Alternator replacement', price: null },
      { id: 20, code: 'starter_motor_replacement', name: 'Starter motor replacement', price: 13.08 },
      { id: 21, code: 'windscreen_wiper_blades', name: 'Windscreen wiper blades (front - all) replacement', price: 36 }
    ]
  },
  {
    id: 'engine', label: 'Engine', services: [
      { id: 22, code: 'timing_belt_replacement', name: 'Timing belt replacement', price: null },
      { id: 23, code: 'engine_diagnostics', name: 'Engine Diagnostics', price: 36 },
      { id: 24, code: 'engine_rebuilds', name: 'Engine Rebuilds ', price: null },
      { id: 25, code: 'engine_remapping', name: 'Engine Remapping ', price: null }
    ]
  },
  {
    id: 'cooling', label: 'Cooling system', services: [
      { id: 26, code: 'water_pump_replacement', name: 'Water pump replacement', price: 312 },
      { id: 27, code: 'coolant_drain_refill', name: 'Coolant Drain & Refill', price: 86.40 },
      { id: 28, code: 'anti_freeze_drain_refill', name: 'Anti Freeze drain & refill', price: 43.20 },
      { id: 29, code: 'coolant_antifreeze_combined', name: 'Coolant/antifreeze combined drain & refill', price: 72 }
    ]
  },
  {
    id: 'suspension', label: 'Suspension', services: [
      { id: 30, code: 'rear_coil_spring', name: 'Rear Coil spring (road spring) replacement', price: 240 },
      { id: 31, code: 'front_coil_spring', name: 'Front Coil spring (road spring) replacement', price: null }
    ]
  },
  
  {
    id: 'heating_air', label: 'Heating & air conditioning', services: [
      { id: 35, code: 'air_con_regas_2017on', name: 'Air Con Re-gas (2017 onwards)', price: 100 },
      { id: 36, code: 'air_con_regas_before2017', name: 'Air Con Re-gas (Before 2017)', price: 50 },
      { id: 37, code: 'car_air_conditioning', name: 'Car Air Conditioning ', price: 54 },
      { id: 38, code: 'air_conditioning_service_and_regas', name: 'Air Conditioning Service and Regas', price: 43.40 },
      { id: 39, code: 'air_conditioning_and_regas_1234yf', name: 'Air Conditioning and Regas 1234yf gas', price: 78.12 }
    ]
  },
  {
    id: 'em_fuel', label: 'Engine management - Fuel', services: [
      { id: 40, code: 'add_blue_refill', name: 'Add Blue Re-fill', price: 30 }
    ]
  },
  {
    id: 'clutch_controls', label: 'Clutch & controls', services: [
      { id: 41, code: 'clutch_repair', name: 'Clutch Repair ', price: 96 }
    ]
  },
  {
    id: 'other', label: 'Other', services: [
      { id: 42, code: 'anti_freeze', name: 'Anti Freeze', price: 24 },
      { id: 43, code: 'dpf_cleaning', name: 'DPF Cleaning ', price: 240 },
      { id: 44, code: 'tyre_pressure_check', name: 'Tyre Pressure Check ', price: 6 },
      { id: 45, code: 'winter_check', name: 'Winter Check ', price: 35 },
      { id: 46, code: 'summer_check', name: 'Summer Check ', price: 35 },
      { id: 47, code: 'mini_valet', name: 'Mini Valet', price: 20 },
      { id: 48, code: 'winter_wheel', name: 'Winter Wheel ', price: 75 },
      { id: 49, code: 'car_air_conditioning', name: 'Car Air Conditioning ', price: 54 },
      { id: 50, code: 'air_conditioning_service_and_regas2', name: 'Air Conditioning Service and Regas', price: 43.40 },
      { id: 51, code: 'ghost_immobiliser', name: 'Ghost Immobiliser ', price: 600 },
      { id: 52, code: 'collection_delivery_service', name: 'Collection and Delivery Service', price: 20 },
      { id: 53, code: 'ultimate_treatment_package', name: 'Ultimate Treatment Package', price: 65.03 },
      { id: 54, code: 'car_wash_vacuum', name: 'Car Wash & Vacuum (mini valet)', price: 14.40 },
      { id: 55, code: 'adas_calibration', name: 'ADAS Calibration ', price: 260.40 },
      { id: 56, code: 'essential_treatment_package', name: 'Essential Treatment Package', price: 25.97 },
      { id: 57, code: 'performance_treatment_package', name: 'Performance Treatment Package', price: 45.50 },
      { id: 58, code: 'hybrid_ev_repairs', name: 'Hybrid and EV Repairs ', price: null },
      { id: 59, code: 'full_van_service', name: 'Full Van Service ', price: 421.19 },
      { id: 60, code: 'brake_repair', name: 'Brake Repair ', price: 132 },
      { id: 61, code: 'cambelt_change', name: 'Cambelt Change', price: null },
      { id: 62, code: 'exhaust_repair', name: 'Exhaust Repair ', price: 241.67 },
      { id: 63, code: 'car_service', name: 'Car Service', price: 250 },
      { id: 64, code: 'ecu_remapping', name: 'ECU Remapping ', price: 360 },
      { id: 65, code: 'engine_rebuilds', name: 'Engine Rebuilds ', price: null },
      { id: 66, code: 'car_detailing', name: 'Car Detailing ', price: null },
      { id: 67, code: 'engine_remapping', name: 'Engine Remapping ', price: null },
      { id: 68, code: 'number_plate_replacement', name: 'Number Plate Replacement ', price: null },
      { id: 69, code: 'auto_electrics_repair', name: 'Auto Electrics Repair', price: null },
      { id: 70, code: 'oil_change', name: 'Oil Change ', price: null },
      { id: 71, code: 'car_battery', name: 'Car Battery ', price: null },
      { id: 72, code: 'commercial_van_interim_service', name: 'Commercial Van Interim Service ', price: null }
    ]
  },
  { id: 'all_repair', label: 'All Repair', services: [] }
];

const BookingSystem = memo(function BookingSystem({
  activeTab, setActiveTab,
  regNo, setRegNo,
  regInputRef,
  handleOpenServicePopup
}) {
  return (
    <div
      className="mt-8 p-4 rounded-xl w-full max-w-sm mx-auto"
      style={{
        background: 'var(--bg-gradient-main)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      <div className="space-y-2 mb-6">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`flex-1 px-3 py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === 'services'
                ? 'bg-white text-black'
                : 'border border-white text-white hover:bg-white hover:text-black'
            }`}
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            Services
          </button>
        </div>
        <div className="flex">
          <button
            type="button"
            onClick={() => setActiveTab('book-mot')}
            className={`w-full px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              activeTab === 'book-mot'
                ? 'bg-white text-black'
                : 'border border-white text-white hover:bg-white hover:text-black'
            }`}
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            <Shield className="w-4 h-4" />
            Book MOT
          </button>
        </div>
      </div>
      {activeTab === 'services' && (
        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2 text-sm">
              Enter your Reg. No. (After select service)
            </label>
            <div className="flex">
              <div className="flex items-center px-2 bg-[var(--primary-blue)] rounded-l-lg">
                <div className="w-6 h-4 bg-[var(--primary-blue-dark)] rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">GB</span>
                </div>
              </div>
              <input
                ref={regInputRef}
                type="text"
                value={regNo}
                onChange={e => setRegNo(e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase())}
                placeholder="ENTER REG NO."
                className="flex-1 px-3 py-3 bg-[var(--primary-blue-lighter)] text-black font-bold placeholder-gray-700 rounded-r-lg focus:outline-none text-sm"
                maxLength={10}
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleOpenServicePopup}
            className="w-full bg-[var(--primary-blue)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primary-blue-dark)] transition-colors"
          >
            GO
          </button>
        </div>
      )}

      {activeTab === 'book-mot' && (
        <div className="space-y-4">
          <div className="flex">
            <div className="flex items-center px-2 bg-[var(--primary-blue)] rounded-l-lg">
              <div className="w-6 h-4 bg-[var(--primary-blue-dark)] rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">GB</span>
              </div>
            </div>
            <input
              type="text"
              value={regNo}
              onChange={e => setRegNo(e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase())}
              placeholder="ENTER REG NO."
              className="flex-1 px-3 py-3 bg-[var(--primary-blue-lighter)] text-black font-bold placeholder-gray-700 rounded-r-lg focus:outline-none text-sm"
              maxLength={10}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <p className="text-white text-center text-sm">Don't know your vehicle registration?</p>
          <button
            type="button"
            onClick={() => {}}
            className="w-full bg-[var(--primary-blue)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primary-blue-dark)] transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
          <Link
            to="/mot-check"
            className="w-full bg-[var(--primary-blue-dark)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primary-blue)] transition-colors flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" />
            IS YOUR MOT DUE?
          </Link>
        </div>
      )}
    </div>
  );
});

const Home = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const [activeTab, setActiveTab] = useState('services');
  const [regNo, setRegNo] = useState('');
  const [showServicePopup, setShowServicePopup] = useState(false);
  const [serviceReg, setServiceReg] = useState('');
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(allCategories[0].id);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [loadingVehicle, setLoadingVehicle] = useState(false);
  const servicesScrollRef = useRef(null);
  const sidebarScrollRef = useRef(null);
  const scrollPositions = useRef({});
  const sidebarScrollPosition = useRef(0);
  const images = [why, why2, why3];
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (!cartOpen) return;
    const handler = (e) => {
      if (!e.target.closest('.cart-dropdown')) setCartOpen(false);
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [cartOpen]);

  useEffect(() => {
    if (showServicePopup) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [showServicePopup]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Removed problematic scroll preservation useEffect that was causing automatic scrolling

  const regInputRef = useRef(null);

  async function fetchVehicleInfo(regNumber) {
    setLoadingVehicle(true);
    try {
      const res = await fetch(API_VEHICLE_INFO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reg_number: regNumber })
      });
      if (!res.ok) throw new Error('Failed to fetch vehicle info');
      const data = await res.json();
      setVehicleInfo(data);
    } catch (err) {
      setVehicleInfo(null);
    } finally {
      setLoadingVehicle(false);
    }
  }

  function addToCart(service) {
  setCart((prev) => {
    // Always use service_id for identification and backend compatibility
    const key = service.service_id || service.id;
    const idx = prev.findIndex((item) => item.service_id === key);
    if (idx > -1) {
      // If already in cart, increment qty
      return prev.map((item, i) => i === idx ? { ...item, qty: item.qty + 1 } : item);
    }
    // Add new service with service_id field
    return [...prev, { ...service, service_id: key, qty: 1 }];
  });
  setCartOpen(true);
}

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function changeQty(id, delta) {
    setCart((prev) => prev.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  }

  function handleServiceSelect(service, checked) {
    if (checked) addToCart(service);
    else removeFromCart(service.id);
  }

  function isInCart(serviceId) {
    return !!cart.find((item) => item.id === serviceId);
  }

  async function sendCartToBackend() {
    for (let item of cart) {
      await fetch(API_CART, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: item.service_id, quantity: item.qty })
      });
    }
    localStorage.removeItem('cart');
  }

  function handleProceedBooking() {
    sendCartToBackend().then(() => {
localStorage.setItem('cart', JSON.stringify(cart));
navigate('/booking', { state: { fromCart: true } });
    });
  }

  function handleCategoryChange(categoryId) {
    // Save current scroll position before changing category
    if (servicesScrollRef.current) {
      scrollPositions.current[selectedCategory] = servicesScrollRef.current.scrollTop;
    }
    setSelectedCategory(categoryId);
  }

  // Restore scroll position when category changes (simplified)
  useEffect(() => {
    // Only restore scroll position if we have a saved position for this category
    if (servicesScrollRef.current && scrollPositions.current[selectedCategory] !== undefined) {
      servicesScrollRef.current.scrollTop = scrollPositions.current[selectedCategory];
    }
  }, [selectedCategory]);

  function handleOpenServicePopup() {
    if (!regNo.trim()) {
      if (regInputRef.current) regInputRef.current.focus();
      return;
    }
    setServiceReg(regNo.trim().toUpperCase());
    fetchVehicleInfo(regNo.trim().toUpperCase());
    setShowServicePopup(true);
    setSelectedCategory(allCategories[0].id);
    // Reset scroll positions when opening popup
    scrollPositions.current = {};
  }

  const CartDropdown = memo(function CartDropdown() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price || 0) * item.qty, 0);
    return (
      <div className="fixed top-33 right-8 z-[1000]">
        <button
          type="button"
          className="relative bg-white rounded-full shadow-lg p-3 border border-gray-200 hover:shadow-xl transition"
          onClick={() => setCartOpen((o) => !o)}
        >
          <ShoppingCart size={28} className="text-[#1976df]" />
          {cart.length > 0 && (
            <span className="absolute -top-1.2 -right-1.5 bg-green-500 text-white rounded-full px-2 text-xs font-bold">
              {cart.reduce((sum, c) => sum + c.qty, 0)}
            </span>
          )}
        </button>
        {cartOpen && (
          <div className="cart-dropdown absolute right-0 mt-3 bg-white rounded-xl shadow-2xl p-4 min-w-[320px] w-[340px] border border-gray-200 z-50">
            <div className="flex justify-between items-center mb-3">
              <span className="text-lg font-semibold">Your Cart</span>
              <button type="button" onClick={() => setCartOpen(false)}>
                <XIcon size={22} />
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="text-gray-400 text-center py-12">No items in cart.</div>
            ) : (
              <div>
                <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <li key={item.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-700">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <button type="button" onClick={() => changeQty(item.id, -1)} disabled={item.qty === 1} className="px-1 text-lg font-bold">-</button>
                          <span className="px-1">{item.qty}</span>
                          <button type="button" onClick={() => changeQty(item.id, 1)} className="px-1 text-lg font-bold">+</button>
                        </div>
                        <span className="font-bold">£{((item.price || 0) * item.qty).toFixed(2)}</span>
                        <button type="button" onClick={() => removeFromCart(item.id)} className="text-red-600 ml-2">
                          <XIcon size={16} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-4">
                  <span className="font-semibold text-base">Sub-Total:</span>
                  <span className="font-bold text-lg">£{subtotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="w-full mt-4 bg-[#16a400] hover:bg-[#14a300] text-white py-3 rounded-lg font-bold transition"
                  onClick={handleProceedBooking}
                >
                  PROCEED TO BOOKING
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  });

  const ServicePopup = memo(function ServicePopup() {
    return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center"
        style={{
          background: 'rgba(255,255,255,0.60)',
          backdropFilter: 'blur(10px)'
        }}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative overflow-y-auto max-h-screen flex flex-col">
          <button
            type="button"
            className="absolute right-5 top-5 text-gray-600 hover:text-red-600 z-10"
            onClick={() => setShowServicePopup(false)}
          >
            <XIcon size={30} />
          </button>
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center p-7 border-b bg-[#f8fafb]">
            <div className="flex-1 flex flex-col md:flex-row gap-4 items-center">
              <div>
                <div className="font-bold text-lg mb-1">My Vehicle Info</div>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Reg No.: <b>{vehicleInfo?.registrationNumber || serviceReg}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Make: <b>{vehicleInfo?.make}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Fuel: <b>{vehicleInfo?.fuelType}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Colour: <b>{vehicleInfo?.colour}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    MOT Status: <b>{vehicleInfo?.motStatus}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    MOT Expiry: <b>{vehicleInfo?.motExpiryDate}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Tax Status: <b>{vehicleInfo?.taxStatus}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Tax Due: <b>{vehicleInfo?.taxDueDate}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Year: <b>{vehicleInfo?.yearOfManufacture}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Engine: <b>{vehicleInfo?.engineCapacity}cc</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    CO₂: <b>{vehicleInfo?.co2Emissions}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Wheelplan: <b>{vehicleInfo?.wheelplan}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Type Approval: <b>{vehicleInfo?.typeApproval}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Revenue Weight: <b>{vehicleInfo?.revenueWeight}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Export: <b>{vehicleInfo?.markedForExport ? "Yes" : "No"}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    Last V5C Issued: <b>{vehicleInfo?.dateOfLastV5CIssued}</b>
                  </div>
                  <div className="bg-gray-100 rounded px-4 py-2 font-mono">
                    First Reg Month: <b>{vehicleInfo?.monthOfFirstRegistration}</b>
                  </div>
                </div>
                {loadingVehicle && (
                  <div className="text-sm text-blue-500 mt-2">Loading vehicle info...</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-1 overflow-hidden" style={{ minHeight: 380, height: "100%" }}>
            <aside
              ref={sidebarScrollRef}
              className="border-r bg-[#f8fafb] py-6 flex flex-col gap-2"
              style={{
                width: 200,
                maxHeight: "calc(90vh - 120px)",
                overflowY: "auto",
                minHeight: 360,
              }}>
              {allCategories.map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  className={`text-left px-4 py-2 rounded-lg font-medium text-base transition ${
                    selectedCategory === cat.id
                      ? 'bg-[#e6f4ea] text-green-700'
                      : 'hover:bg-[#e3e9f7] text-gray-700'
                  }`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </aside>
            <main
              className="flex-1 py-6 px-5 flex flex-col"
              style={{
                maxHeight: "calc(90vh - 120px)",
                minHeight: 360,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div className="text-xl font-semibold mb-4">
                {allCategories.find(c => c.id === selectedCategory)?.label}
              </div>
              <div
                ref={servicesScrollRef}
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: "auto"
                }}
              >
                <div className="space-y-4">
                  {allCategories.find(c => c.id === selectedCategory)?.services.length > 0 ? (
                    allCategories.find(c => c.id === selectedCategory).services.map(service => (
                      <div key={service.id} className="flex items-center justify-between bg-[#f6f8fa] p-4 rounded-2xl shadow-sm border mb-2" style={{ borderColor: "#bdbdbd" }}>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-lg text-green-700">
                            {typeof service.price === "number"
                              ? `£${service.price.toFixed(2)}`
                              : "Price on Request"}
                          </span>
                          {/* restored checkbox! */}
                          <input
                            type="checkbox"
                            className="w-5 h-5 accent-green-600"
                            checked={isInCart(service.id)}
                            onChange={e => handleServiceSelect(service, e.target.checked)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 italic text-center py-8">No services listed for this category.</div>
                  )}
                  {selectedCategory === allCategories[allCategories.length-1].id && (
                    <div style={{marginTop: 20, background: "#F5F5F5", border: "1px solid #eee", padding: 16, fontWeight: 'bold'}}>
                      In case, your service is not listed above, kindly fill out the form. <a href="#">Click here.</a>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  });
const servicesArr = [
    { icon: <Shield className="w-12 h-12" />, title: "MOT Testing", description: "Official MOT testing for Class 4, 5 & 7 vehicles", image: MOT },
    { icon: <Wrench className="w-12 h-12" />, title: "Vehicle Repairs", description: "Repairs for all makes and models", image: vehicleRepairs },
    { icon: <Settings className="w-12 h-12" />, title: "Regular Servicing", description: "Routine maintenance for long-lasting performance", image: regularServices },
    { icon: <Car className="w-12 h-12" />, title: "Brake Services", description: "Brake inspection and replacement", image: brake },
    { icon: <Battery className="w-12 h-12" />, title: "Battery Services", description: "Battery testing and replacement", image: batteryImg },
    { icon: <Zap className="w-12 h-12" />, title: "Clutch Repairs", description: "Clutch repair and replacement", image: clutch }
  ];
  const features = [
    { icon: <Award className="w-8 h-8" />, title: "MOT Approved", description: "Official MOT testing station" },
    { icon: <Users className="w-8 h-8" />, title: "Expert Technicians", description: "Qualified and experienced staff" },
    { icon: <Clock className="w-8 h-8" />, title: "Quick Service", description: "Fast turnaround times" },
    { icon: <CheckCircle className="w-8 h-8" />, title: "Quality Guaranteed", description: "All work comes with warranty" }
  ];
  // ... rest of your Home page with servicesArr, features, etc unchanged ...

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg-gradient-main)' }}>
      <CartDropdown />
      {showServicePopup && <ServicePopup />}
      <section className="relative pt-12 pb-24 px-4 md:px-20" style={{ background: 'linear-gradient(135deg, #7dd3fc, #a5b4fc, #e5e7eb)' }}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'var(--primary-blue)', filter: 'blur(80px)' }}></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10"
            style={{ background: 'var(--primary-blue-dark)', filter: 'blur(60px)' }}></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="glass-effect rounded-2xl shadow-lg"
            style={{ boxShadow: 'var(--shadow-lg)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--card-border)' }}>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-block px-4 py-1 mb-4 rounded-full text-sm font-medium"
                  style={{ background: 'var(--primary-blue-light)', color: 'white' }}>
                  Trusted Since 2010
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
                  Expert Auto <span className="gradient-text">Services</span> You Can Trust
                </h1>
                <p className="text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
                  From MOT testing to comprehensive repairs, we keep your vehicle running at its best with professional care.
                </p>
                <BookingSystem
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  regNo={regNo}
                  setRegNo={setRegNo}
                  regInputRef={regInputRef}
                  handleOpenServicePopup={handleOpenServicePopup}
                />
                <div className="mt-10 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} style={{ color: 'var(--primary-blue)' }}/>
                    <span style={{ color: 'var(--text-muted)' }}> 9 Chelson St, Longton, Stoke-on-Trent ST3 1PT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} style={{ color: 'var(--primary-blue)' }}/>
                    <span style={{ color: 'var(--text-muted)' }}>01782 405229</span>
                  </div>
                  
                </div>
              </div>
              <div className="relative hidden md:block">
                <div className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url(${hero})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '0 var(--radius-xl) var(--radius-xl) 0',
                    filter: 'brightness(0.9)'
                  }}>
                </div>
                <div className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)',
                    borderRadius: '0 var(--radius-xl) var(--radius-xl) 0'
                  }}>
                </div>
                <a 
                  href="https://maps.app.goo.gl/dKcKVbrEf2JxkG597" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-8 right-8 p-6 glass-effect rounded-xl max-w-xs hover:scale-105 transition-transform duration-300 cursor-pointer"
                  style={{
                    boxShadow: 'var(--shadow-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--card-border)',
                    textDecoration: 'none'
                  }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(45deg, #4285f4, #34a853, #fbbc05, #ea4335)' }}>
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold" style={{ color: '#4285f4' }}>G</span>
                        <span className="text-lg font-bold" style={{ color: '#ea4335' }}>o</span>
                        <span className="text-lg font-bold" style={{ color: '#fbbc05' }}>o</span>
                        <span className="text-lg font-bold" style={{ color: '#4285f4' }}>g</span>
                        <span className="text-lg font-bold" style={{ color: '#34a853' }}>l</span>
                        <span className="text-lg font-bold" style={{ color: '#ea4335' }}>e</span>
                      </div>
                      <div className="text-sm font-semibold text-gray-700">Customer Reviews</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" style={{ color: '#fbbc05' }}>
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">100% Customer Satisfaction</div>
                  <div className="text-sm text-black font-bold">Click to view all reviews</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SERVICES SECTION */}
      <section style={{ padding: 'var(--spacing-2xl) 0' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-light)' }}>Our Services</h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--primary-blue-lighter)' }}>
              We offer comprehensive automotive services with professional expertise and quality assurance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesArr.map((service, index) => (
              <div key={index} className="hover-scale glass-effect rounded-xl overflow-hidden"
                   style={{
                     boxShadow: 'var(--shadow-md)',
                     borderRadius: 'var(--radius-lg)',
                     border: '1px solid var(--card-border)'
                   }}>
                <div className="relative">
                  <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(to top, rgba(30, 64, 175, 0.4), transparent)'
                  }}></div>
                </div>
                <div className="p-8">
                  <div style={{ color: 'var(--primary-blue)' }} className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-dark)' }}>{service.title}</h3>
                  <p className="mb-6" style={{ color: 'var(--text-muted)' }}>{service.description}</p>
                  <Link to="/booking" className="inline-block px-6 py-3 rounded-lg text-white"
                        style={{
                          background: 'var(--bg-gradient-card)',
                          borderRadius: 'var(--radius-md)',
                          boxShadow: 'var(--shadow-sm)',
                          transition: 'var(--transition-normal)'
                        }}>
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* WHY CHOOSE US SECTION */}
<section style={{
  padding: 'var(--spacing-2xl) 0',
  background: 'var(--bg-gradient-secondary)'
}}>
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-dark)' }}>
        Why Choose Access Auto Services?
      </h2>
      <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
        We are an MOT approved garage committed to reliable auto care and customer satisfaction.
      </p>
    </div>

    <div className="flex flex-col md:flex-row items-center gap-10">
      
      {/* Image Section - Fixed Size Images */}
      <div className="md:w-1/2">
        <div className="relative rounded-xl overflow-hidden" style={{ boxShadow: 'var(--shadow-lg)' }}>
          <div className="w-full h-[300px] relative">
            <img
              src={images[currentImg]}
              alt="Why choose us"
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-lg)'
              }}
            />
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(to top right, rgba(30, 64, 175, 0.3), transparent)',
              borderRadius: 'var(--radius-lg)'
            }}></div>
          </div>
        </div>
      </div>

      {/* Feature List */}
      <div className="md:w-1/2 space-y-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4 p-6 hover-scale glass-effect"
               style={{
                 borderRadius: 'var(--radius-md)',
                 boxShadow: 'var(--shadow-sm)',
                 border: '1px solid var(--card-border)'
               }}>
            <div style={{
              color: 'var(--primary-blue)',
              background: 'rgba(219, 234, 254, 0.5)',
              padding: 'var(--spacing-sm)',
              borderRadius: 'var(--radius-sm)'
            }}>{feature.icon}</div>
            <div>
              <h4 className="font-semibold text-lg" style={{ color: 'var(--text-dark)' }}>{feature.title}</h4>
              <p style={{ color: 'var(--text-muted)' }}>{feature.description}</p>
            </div>
          </div>
        ))}
        <div className="text-center mt-10">
          <Link to="/about" className="inline-block px-10 py-4 rounded-xl hover-scale font-semibold"
                style={{
                  background: 'var(--bg-gradient-card)',
                  color: 'white',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'var(--transition-normal)'
                }}>
            Learn More About Us
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

    </div>
  );
};

export default Home;