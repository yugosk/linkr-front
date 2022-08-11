import React, { createContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(null);

  const createSession = ({ token, picture }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("picture", picture);

    setAuthenticated(true);
  };

  const getSession = () => {
    const token = localStorage.getItem("token")
      ? `Bearer ${localStorage.getItem("token")}`
      : null;
    const picture = localStorage.getItem("picture");

    return { token, picture };
  };

  const finishSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("picture");
    setAuthenticated(false);
    navigate("/", { replace: true });
  };

  const checkSession = () => {
    const { token, picture } = getSession();

    if (token && picture) {
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
