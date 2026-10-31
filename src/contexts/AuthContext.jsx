import { createContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("currentUser")) || null;
    } catch {
      return null;
    }
  });
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );

  const registerUser = (user) => {
    const userWithMail = users.find((u) => u.email === user.email);
    if (userWithMail) {
      toast.error("User with this email already exists.");
      return false;
    }
    const newUser = {
      id: Date.now(),
      ...user,
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    toast.success("Registration Successful");
    navigate("/products");
    return true;
  };

  const loginUser = (loginData) => {
    const userwithmail = users.find((user) => {
      return user.email == loginData.email;
    });
    if(!userwithmail){
        toast.error('Invalid Credentials.')
        return false;
    }
    else{
        if(userwithmail.password == loginData.password){
            setCurrentUser(userwithmail);
            localStorage.setItem("currentUser", JSON.stringify(userwithmail));
            navigate('/products');
            toast.success('Login Successfull');
            return true;
        }
        else{
            toast.error('Invalid password.');
            return false;
        }

    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/authenticate");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        registerUser,
        loginUser,
        logout,
        logoutUser: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

