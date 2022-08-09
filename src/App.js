import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/reset.css";
import "./assets/styles/style.css";

import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TimelinePage from "./pages/TimelinePage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
      </Routes>
    </BrowserRouter>
  );
}
