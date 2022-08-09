import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/reset.css";
import "./assets/styles/style.css";

import SignupPage from "./pages/SignupPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}
