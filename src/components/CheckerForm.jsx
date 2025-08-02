import React, { useState, useEffect, useRef, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ShoppingCart, X as XIcon, ChevronRight } from 'lucide-react';

// DVLA API endpoints
const API_VEHICLE_INFO = "https://backend-kzpz.onrender.com/api/dvla/vehicle-info/";
const API_CART = "https://backend-kzpz.onrender.com/api/dvla/cart/";

const SERVICE_PRICES = {
  "MOT - Class 4": 40.00,
  "MOT - Class 5": 59.00,
  "MOT - Class 7": 60.00,
  "MOT Base": 30.00,
  "Regular Servicing": 30.00,
  "FREE Re-Test": 0.00,
  "Brake Pads (Front)": 120.00,
  "Brake Pads + Discs": 260.00,
  "Clutch Replacement": 580.00,
  "Battery Replacement": 160.00
};

const allCategories = [
  {
    id: 'mot',
    label: 'MOT',
    services: [
      { id: 'mot-class4', name: 'MOT - Class 4', price: SERVICE_PRICES["MOT - Class 4"] },
      { id: 'mot-class5', name: 'MOT - Class 5', price: SERVICE_PRICES["MOT - Class 5"] },
      { id: 'mot-class7', name: 'MOT - Class 7', price: SERVICE_PRICES["MOT - Class 7"] },
      { id: 'mot-base', name: 'MOT Base', price: SERVICE_PRICES["MOT Base"] },
    ]
  },
  {
    id: 'servicing',
    label: 'Servicing',
    services: [
      { id: 'interim', name: 'Interim Service (Oil Service)', price: 108 },
      { id: 'engine', name: 'Engine Service (mid service)', price: 167.87 },
      { id: 'full', name: 'Full Service (major)', price: 226.79 }
    ]
  },
  {
    id: 'brakes',
    label: 'Brakes',
    services: [
      { id: 'front_brake_pads', name: 'Front Brake Pads', price: null },
      { id: 'front_brake_disc_pads', name: 'Front Brake Disc and Pads Replacement', price: 252 },
      { id: 'rear_brake_disc_pads', name: 'Rear Brake Disc and Pads Replacement', price: 228 },
      { id: 'rear_brake_pads', name: 'Rear Brake Pads', price: null },
      { id: 'brake_fluid_change', name: 'Brake fluid change (non diagnostics)', price: 72 },
      { id: 'brake_repair', name: 'Brake Repair ', price: 132 }
    ]
  },
  {
    id: 'steering',
    label: 'Steering',
    services: [
      { id: 'front_2wheel_alignment', name: 'Front 2 wheel Alignment', price: 72 },
      { id: '4wheel_alignment_camber', name: '4 Wheel Alignment with Camber Caster', price: 144 },
      { id: '4wheel_alignment', name: '4 Wheel Alignment', price: 72 },
      { id: 'power_steering_fluid', name: 'Power steering fluid change', price: 156 }
    ]
  },
  {
    id: 'general_electrics',
    label: 'General electrics',
    services: [
      { id: 'battery_replacement', name: 'Battery replacement (vehicles with stop/start system)', price: null },
      { id: 'alternator_replacement', name: 'Alternator replacement', price: null },
      { id: 'starter_motor_replacement', name: 'Starter motor replacement', price: 13.08 },
      { id: 'windscreen_wiper_blades', name: 'Windscreen wiper blades (front - all) replacement', price: 36 }
    ]
  },
  {
    id: 'engine',
    label: 'Engine',
    services: [
      { id: 'timing_belt_replacement', name: 'Timing belt replacement', price: null },
      { id: 'engine_diagnostics', name: 'Engine Diagnostics', price: 36 },
      { id: 'engine_rebuilds', name: 'Engine Rebuilds ', price: null },
      { id: 'engine_remapping', name: 'Engine Remapping ', price: null }
    ]
  },
  {
    id: 'cooling',
    label: 'Cooling system',
    services: [
      { id: 'water_pump_replacement', name: 'Water pump replacement', price: 312 },
      { id: 'coolant_drain_refill', name: 'Coolant Drain & Refill', price: 86.40 },
      { id: 'anti_freeze_drain_refill', name: 'Anti Freeze drain & refill', price: 43.20 },
      { id: 'coolant_antifreeze_combined', name: 'Coolant/antifreeze combined drain & refill', price: 72 }
    ]
  },
  {
    id: 'suspension',
    label: 'Suspension',
    services: [
      { id: 'rear_coil_spring', name: 'Rear Coil spring (road spring) replacement', price: 240 },
      { id: 'front_coil_spring', name: 'Front Coil spring (road spring) replacement', price: null }
    ]
  },
  {
    id: 'tyres',
    label: 'Tyres',
    services: [
      { id: 'puncture_repair', name: 'Puncture Repair', price: 24 },
      { id: 'wheel_balancing', name: 'Wheel Balancing', price: 12 },
      { id: 'locking_wheel_nut_removal', name: 'One Locking Wheel Nut Removal', price: 21.6 }
    ]
  },
  {
    id: 'heating_air',
    label: 'Heating & air conditioning',
    services: [
      { id: 'air_con_regas_2017on', name: 'Air Con Re-gas (2017 onwards)', price: 100 },
      { id: 'air_con_regas_before2017', name: 'Air Con Re-gas (Before 2017)', price: 50 },
      { id: 'car_air_conditioning', name: 'Car Air Conditioning ', price: 54 },
      { id: 'air_conditioning_service_and_regas', name: 'Air Conditioning Service and Regas', price: 43.40 },
      { id: 'air_conditioning_and_regas_1234yf', name: 'Air Conditioning and Regas 1234yf gas', price: 78.12 }
    ]
  },
  {
    id: 'em_fuel',
    label: 'Engine management - Fuel',
    services: [
      { id: 'add_blue_refill', name: 'Add Blue Re-fill', price: 30 }
    ]
  },
  {
    id: 'clutch_controls',
    label: 'Clutch & controls',
    services: [
      { id: 'clutch_repair', name: 'Clutch Repair ', price: 96 }
    ]
  },
  {
    id: 'other',
    label: 'Other',
    services: [
      { id: 'anti_freeze', name: 'Anti Freeze', price: 24 },
      { id: 'dpf_cleaning', name: 'DPF Cleaning ', price: 240 },
      { id: 'tyre_pressure_check', name: 'Tyre Pressure Check ', price: 6 },
      { id: 'winter_check', name: 'Winter Check ', price: 35 },
      { id: 'summer_check', name: 'Summer Check ', price: 35 },
      { id: 'mini_valet', name: 'Mini Valet', price: 20 },
      { id: 'winter_wheel', name: 'Winter Wheel', price: 75 },
      { id: 'car_air_conditioning', name: 'Car Air Conditioning ', price: 54 },
      { id: 'air_conditioning_service_and_regas2', name: 'Air Conditioning Service and Regas', price: 43.40 },
      { id: 'ghost_immobiliser', name: 'Ghost Immobiliser ', price: 600 },
      { id: 'collection_delivery_service', name: 'Collection and Delivery Service', price: 20 },
      { id: 'ultimate_treatment_package', name: 'Ultimate Treatment Package', price: 65.03 },
      { id: 'car_wash_vacuum', name: 'Car Wash & Vacuum (mini valet)', price: 14.40 },
      { id: 'adas_calibration', name: 'ADAS Calibration ', price: 260.40 },
      { id: 'essential_treatment_package', name: 'Essential Treatment Package', price: 25.97 },
      { id: 'performance_treatment_package', name: 'Performance Treatment Package', price: 45.50 },
      { id: 'hybrid_ev_repairs', name: 'Hybrid and EV Repairs ', price: null },
      { id: 'full_van_service', name: 'Full Van Service ', price: 421.19 },
      { id: 'brake_repair', name: 'Brake Repair ', price: 132 },
      { id: 'cambelt_change', name: 'Cambelt Change ', price: null },
      { id: 'exhaust_repair', name: 'Exhaust Repair ', price: 241.67 },
      { id: 'car_service', name: 'Car Service', price: 250 },
      { id: 'ecu_remapping', name: 'ECU Remapping ', price: 360 },
      { id: 'engine_rebuilds', name: 'Engine Rebuilds ', price: null },
      { id: 'car_detailing', name: 'Car Detailing ', price: null },
      { id: 'engine_remapping', name: 'Engine Remapping', price: null },
      { id: 'number_plate_replacement_', name: 'Number Plate Replacement ', price: null },
      { id: 'auto_electrics_repair', name: 'Auto Electrics Repair ', price: null },
      { id: 'oil_change', name: 'Oil Change ', price: null },
      { id: 'car_battery', name: 'Car Battery ', price: null },
      { id: 'commercial_van_interim_service', name: 'Commercial Van Interim Service ', price: null }
    ]
  },
  { id: 'all_repair', label: 'All Repair', services: [] }
];

// Memoized BookingSystem to prevent rerenders
const BookingSystem = memo(function BookingSystem({
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
        <div className="flex">
          <button
            type="button"
            className="w-full bg-[var(--primary-blue)] text-white py-3 rounded-lg font-bold hover:bg-[var(--primary-blue-dark)] transition-colors flex items-center justify-center gap-2"
            style={{ borderRadius: 'var(--radius-md)' }}
          >
            <Shield className="w-4 h-4" />
            Book MOT
          </button>
        </div>
      </div>
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
              id="vehicle-reg-no"
              name="vehicleRegNo"
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
    </div>
  );
});

const MOT = () => {
  const [regNo, setRegNo] = useState('');
  const regInputRef = useRef(null);
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
  const navigate = useNavigate();

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

  // Prevent scroll reset when cart or other states change
  useEffect(() => {
    if (servicesScrollRef.current) {
      const currentScrollTop = servicesScrollRef.current.scrollTop;
      // Preserve scroll position after state updates
      setTimeout(() => {
        if (servicesScrollRef.current && servicesScrollRef.current.scrollTop !== currentScrollTop) {
          servicesScrollRef.current.scrollTop = currentScrollTop;
        }
      }, 0);
    }
    
    // Also preserve sidebar scroll position
    if (sidebarScrollRef.current) {
      const currentSidebarScrollTop = sidebarScrollRef.current.scrollTop;
      setTimeout(() => {
        if (sidebarScrollRef.current && sidebarScrollRef.current.scrollTop !== currentSidebarScrollTop) {
          sidebarScrollRef.current.scrollTop = currentSidebarScrollTop;
        }
      }, 0);
    }
  }, [cart, vehicleInfo, loadingVehicle]);

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
      const idx = prev.findIndex((item) => item.id === service.id);
      if (idx > -1) {
        return prev.map((item, i) => i === idx ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...service, qty: 1 }];
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
        body: JSON.stringify({ service: item.id, quantity: item.qty })
      });
    }
    localStorage.removeItem('cart');
    setCart([]);
  }

  function handleProceedBooking() {
    sendCartToBackend().then(() => {
      navigate('/');
    });
  }

  function handleCategoryChange(categoryId) {
    // Save current scroll position before changing category
    if (servicesScrollRef.current) {
      scrollPositions.current[selectedCategory] = servicesScrollRef.current.scrollTop;
    }
    // Save sidebar scroll position
    if (sidebarScrollRef.current) {
      sidebarScrollPosition.current = sidebarScrollRef.current.scrollTop;
    }
    setSelectedCategory(categoryId);
  }

  // Restore scroll position when category changes
  useEffect(() => {
    if (servicesScrollRef.current && scrollPositions.current[selectedCategory] !== undefined) {
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        if (servicesScrollRef.current) {
          servicesScrollRef.current.scrollTop = scrollPositions.current[selectedCategory];
        }
      }, 0);
    }
    
    // Restore sidebar scroll position
    if (sidebarScrollRef.current && sidebarScrollPosition.current !== undefined) {
      setTimeout(() => {
        if (sidebarScrollRef.current) {
          sidebarScrollRef.current.scrollTop = sidebarScrollPosition.current;
        }
      }, 0);
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
    sidebarScrollPosition.current = 0;
  }

  // --- CartDropdown and ServicePopup components unchanged ---
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
              <div className="text-xl font-semibold mb-4">{allCategories.find(c => c.id === selectedCategory)?.label}</div>
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

  return (
    <div className=" bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <BookingSystem
          regNo={regNo}
          setRegNo={setRegNo}
          regInputRef={regInputRef}
          handleOpenServicePopup={handleOpenServicePopup}
        />
      </div>
      <CartDropdown />
      {showServicePopup && <ServicePopup />}
    </div>
  );
};

export default MOT;