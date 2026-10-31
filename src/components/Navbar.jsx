import { IoMoonOutline, IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Brand from "./Brand";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import CartContext from "../contexts/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  const { getUserCart } = useContext(CartContext);

  const userCart = currentUser ? getUserCart(currentUser.id) : [];
  const cartItemCount = userCart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="flex justify-between p-4 items-center shadow-md">
      <div className="flex items-center gap-4">
        <Brand />
        <div className="links flex items-center gap-2">
          <Link
            to={"/home"}
            className="text-md font-medium cursor-pointer px-2 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to={"/products"}
            className="text-md font-medium cursor-pointer px-2 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200"
          >
            Products
          </Link>
          <Link className="text-md font-medium cursor-pointer px-2 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200">
            Deals
          </Link>
        </div>
      </div>
      <div className="endArea flex gap-3 items-center">
        <div className="cursor-pointer">
          <IoMoonOutline size={20} />
        </div>
        {currentUser && (
          <button
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer p-1.5 rounded-lg hover:bg-indigo-100 transition-colors flex items-center justify-center"
            title="Cart"
            aria-label="Shopping Cart"
          >
            <IoCartOutline size={22} className="text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        )}
        <div className="border h-6"></div>
        <div>
          {currentUser ? (
            <button
              onClick={logout}
              className="bg-indigo-600 text-white font-medium px-2 py-1 rounded-lg cursor-pointer active:bg-indigo-700 active:scale-95 transition-all"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/authenticate");
              }}
              className="bg-indigo-600 text-white font-medium px-2 py-1 rounded-lg cursor-pointer active:bg-indigo-700 active:scale-95 transition-all"
            >
              Login/Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
