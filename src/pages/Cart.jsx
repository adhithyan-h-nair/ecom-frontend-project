import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";
import {
  IoTrashOutline,
  IoAdd,
  IoRemove,
  IoCartOutline,
  IoCheckmarkCircle,
  IoArrowBack,
} from "react-icons/io5";
import { FaTruckFast } from "react-icons/fa6";
import toast from "react-hot-toast";

const Cart = () => {
  const { currentUser } = useContext(AuthContext);
  const { getUserCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const [isOrdered, setIsOrdered] = useState(false);

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-8 bg-indigo-50 rounded-2xl shadow-md text-center flex flex-col items-center gap-4">
        <div className="p-4 bg-indigo-100 rounded-full text-indigo-600">
          <IoCartOutline size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">You are not logged in</h2>
        <p className="text-gray-600">Please log in to view and manage your shopping cart.</p>
        <button
          onClick={() => navigate("/authenticate")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-lg cursor-pointer transition-all active:scale-95"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const userCart = getUserCart(currentUser.id);

  const subtotal = userCart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = () => {
    if (userCart.length === 0) return;
    clearCart(currentUser.id);
    setIsOrdered(true);
    toast.success("Order placed successfully! It's on the way! 🚚");
  };

  if (isOrdered) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-8 bg-white border border-indigo-100 rounded-2xl shadow-xl text-center flex flex-col items-center gap-5">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
          <IoCheckmarkCircle size={52} />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Order Placed!</h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-indigo-600 font-semibold text-lg">
            <FaTruckFast size={24} />
            <span>It&apos;s on the way!</span>
          </div>
          <p className="text-gray-600 mt-2 max-w-md">
            Thank you for shopping with ShopEase. Your package has been processed and is scheduled for fast delivery.
          </p>
        </div>
        <div className="p-4 bg-indigo-50 rounded-xl w-full text-left text-sm text-gray-700 flex flex-col gap-1">
          <div className="flex justify-between font-medium">
            <span>Estimated Delivery:</span>
            <span className="text-indigo-600 font-bold">2 - 3 Business Days</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Status:</span>
            <span className="text-emerald-600 font-semibold">Shipped & In Transit 🚚</span>
          </div>
        </div>
        <button
          onClick={() => {
            setIsOrdered(false);
            navigate("/products");
          }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl cursor-pointer active:scale-98 transition-all"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (userCart.length === 0) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-8 bg-white border border-indigo-100 rounded-2xl shadow-md text-center flex flex-col items-center gap-4">
        <div className="p-4 bg-indigo-50 text-indigo-500 rounded-full">
          <IoCartOutline size={56} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-500">Looks like you haven&apos;t added any items to your cart yet.</p>
        <Link
          to="/products"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-xl cursor-pointer transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <IoArrowBack size={18} />
          <span>Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <Link
          to="/products"
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1"
        >
          <IoArrowBack size={16} />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {userCart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-24 h-24 shrink-0 flex items-center justify-center p-2 bg-gray-50 rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col gap-1 text-center sm:text-left">
                <h3 className="font-semibold text-gray-800 line-clamp-2">{item.title}</h3>
                <p className="text-indigo-600 font-bold text-lg">${Number(item.price).toFixed(2)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3 bg-gray-100 p-1.5 rounded-lg">
                <button
                  type="button"
                  onClick={() => decreaseQuantity(item.id, currentUser.id)}
                  aria-label="Decrease quantity"
                  className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-xs text-gray-700 hover:bg-gray-200 cursor-pointer active:scale-95"
                >
                  <IoRemove size={16} />
                </button>
                <span className="font-bold text-sm min-w-6 text-center text-gray-800">
                  {item.quantity || 1}
                </span>
                <button
                  type="button"
                  onClick={() => increaseQuantity(item.id, currentUser.id)}
                  aria-label="Increase quantity"
                  className="w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-xs text-gray-700 hover:bg-gray-200 cursor-pointer active:scale-95"
                >
                  <IoAdd size={16} />
                </button>
              </div>

              {/* Item Subtotal */}
              <div className="text-right min-w-20">
                <p className="text-xs text-gray-500">Subtotal</p>
                <p className="font-bold text-gray-900">
                  ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={() => removeFromCart(item.id, currentUser.id)}
                aria-label="Remove item"
                className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
                title="Remove item"
              >
                <IoTrashOutline size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl shadow-sm flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>

          <div className="flex flex-col gap-2 border-b border-indigo-200 pb-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Items Total ({userCart.reduce((sum, i) => sum + (i.quantity || 1), 0)} items)</span>
              <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-emerald-600 font-semibold">FREE</span>
            </div>
          </div>

          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span className="text-indigo-600 text-xl">${subtotal.toFixed(2)}</span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl cursor-pointer shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
