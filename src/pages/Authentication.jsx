import Brand from "../components/Brand";
import { IoLogInOutline } from "react-icons/io5";
import { LuUserPlus } from "react-icons/lu";
import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Login from "../components/Login";
import Register from "../components/Register";
import toast from "react-hot-toast";

const Authentication = () => {
  const [regClick, setRegClick] = useState(false);
  const { loginUser, registerUser } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterInput = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser(loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    const success = registerUser({
      fullname: registerData.fullname,
      email: registerData.email,
      password: registerData.password,
    });
    if (success) {
      setRegClick(false);
      setRegisterData({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

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
        {regClick ? (
          <Register
            formData={registerData}
            registerData={registerData}
            handleInput={handleRegisterInput}
            handleRegisterInput={handleRegisterInput}
            handleChange={handleRegisterInput}
            handleSubmit={handleRegisterSubmit}
            handleRegisterSubmit={handleRegisterSubmit}
          />
        ) : (
          <Login
            formData={loginData}
            loginData={loginData}
            handleInput={handleLoginInput}
            handleLoginInput={handleLoginInput}
            handleChange={handleLoginInput}
            handleSubmit={handleLoginSubmit}
            handleLoginSubmit={handleLoginSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Authentication;
