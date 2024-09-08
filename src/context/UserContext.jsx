import React, { createContext, useState, useEffect } from "react";
import apiAxios from "../services/API";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user_info = localStorage.getItem("user_info");
    return user_info ? JSON.parse(user_info) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user_info", JSON.stringify(user));
    } else {
      localStorage.removeItem("user_info");
    }
  }, [user]);

  const login_user = (user_info) => {
    setUser(user_info);
  };

  const logout_user = async () => {
    setUser(null);
    try {
      const response = await apiAxios({
        rota: "api/logout-user/",
        metodo: "POST",
      });
      localStorage.removeItem("user_info");
    } catch (error) {
      console.log(error);
    }
  };

  const orders = async () => {
    if (user) {
      try {
        const response = await apiAxios({
          rota: "api/user-orders/",
          metodo: "POST",
          body: { user_id: user.user_id },
        });
        return response.data;
      } catch (error) {
        return error;
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, login_user, logout_user, orders }}>
      {children}
    </UserContext.Provider>
  );
};
