import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/reset.css";
import "./assets/styles/style.css";

import { UserContextProvider } from "./contexts/userContext";

import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TimelinePage from "./pages/TimelinePage";


export default function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}
