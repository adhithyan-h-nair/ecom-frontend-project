import { createContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );

  const registerUser = (user) => {
    setUsers((user) => [...users, user]);
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
            navigate('/products');
            toast.success('Login Successfull');
        }
        else{
            toast.error('Invalid password.');
            return false;
        }

    }
  };

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export default AuthContext;
