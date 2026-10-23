import Brand from "../components/Brand";
import { IoLogInOutline } from "react-icons/io5";
import { LuUserPlus } from "react-icons/lu";
import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
const Authentication = () => {
  const [regClick, setRegClick] = useState(false);

  return (
    <div className="flex p-8 justify-center ">
      <div className="flex flex-col gap-2  shadow-lg p-4 rounded-md bg-indigo-50 min-w-100">
        <div className="flex flex-col items-center">
          <Brand />
          {regClick ? (
            <h1 className="text-2xl font-bold">Welcome to ShopeEase</h1>
          ) : (
            <h1 className="text-2xl font-bold">Welcome back to ShopeEase</h1>
          )}
        </div>
        <div className="flex gap-2 bg-indigo-200 p-1 rounded-xl w-full">
          <button
            className={`flex-1 p-2  font-medium text-sm rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-colors duration-500 ${regClick ? "text-gray-500" : "bg-white text-indigo-600"}`}
            onClick={() => {
              setRegClick(false);
            }}
          >
            <IoLogInOutline size={18} />
            <span>Log In</span>
          </button>
          <button
            className={`flex-1 p-2 font-medium text-sm rounded-xl flex items-center justify-center gap-1 cursor-pointer transition-colors duration-500 ${regClick ? "bg-white text-indigo-600" : " text-gray-500"}`}
            onClick={() => {
              setRegClick(true);
            }}
          >
            <LuUserPlus size={18} />
            <span className="whitespace-nowrap">Register Account</span>
          </button>
        </div>
        {regClick ? <Register/> : <Login/> }
      </div>
    </div>
  );
};

export default Authentication;
