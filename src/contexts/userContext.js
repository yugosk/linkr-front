import React, { createContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(null);

  const createSession = ({ token, picture, userId }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("picture", picture);
    localStorage.setItem("userId", userId);

    setAuthenticated(true);
  };

  const getSession = () => {
    const token = localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : null;
    const picture = localStorage.getItem("picture");
    const userId = localStorage.getItem("userId");

    return { token, picture, userId };
  };

  const finishSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("picture");
    localStorage.removeItem("userId");
    setAuthenticated(false);
    navigate("/", { replace: true });
  };

  const checkSession = () => {
    const { token, picture, userId } = getSession();

    if (token && picture && userId) {
      setAuthenticated(true);
    } else {
      finishSession();
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const values = useMemo(
    () => ({
      authenticated,
      createSession,
      getSession,
      checkSession,
      finishSession,
    }),
    [authenticated]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserContext;
