import React, { memo, useState, useEffect } from "react";
import { ShoppingCart, X as XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartDropdown = memo(function CartDropdown(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartOpen) return;
    const handler = (e) => {
      if (!e.target.closest(".cart-dropdown")) setCartOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [cartOpen]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function changeQty(id, delta) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }

  async function sendCartToBackend() {
    for (let item of cart) {
      await fetch("https://backend-kzpz.onrender.com/api/dvla/cart/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: item.id, quantity: item.qty }),
      });
    }
    localStorage.removeItem("cart");
    setCart([]);
  }

  function handleProceedBooking() {
    // Navigate to booking page with cart state
    navigate("/booking", { state: { fromCart: true } });
    setCartOpen(false);
  }

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

export default CartDropdown;