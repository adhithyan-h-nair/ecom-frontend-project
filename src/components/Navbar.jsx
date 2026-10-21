import { IoMoonOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Brand from "./Brand";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-4 items-center shadow-md">
      <div className="flex items-center gap-4">
        <Brand />
        <div className="links flex items-center gap-2">
          <Link className="text-md font-medium cursor-pointer px-2 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200">
            Home
          </Link>
          <Link className="text-md font-medium cursor-pointer px-2 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200">
            Products
          </Link>
          <Link className="text-md font-medium cursor-pointer px-2 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200">
            Deals
          </Link>
        </div>
      </div>
      <div className="endArea flex gap-2 items-center">
        <div className="cursor-pointer">
          <IoMoonOutline size={20} />
        </div>
        <div className="border h-6"></div>
        <div>
          <button
            onClick={() => {
              navigate("/authenticate");
            }}
            className="bg-indigo-600 text-white font-medium px-2 py-1 rounded-lg cursor-pointer active:bg-indigo-700 active:scale-95"
          >
            Login/Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
