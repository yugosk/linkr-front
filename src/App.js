import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/reset.css";
import "./assets/styles/style.css";

import { UserContextProvider } from "./contexts/userContext";

import Header from "./components/Header/Header";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TimelinePage from "./pages/TimelinePage";
import HashtagPage from "./pages/HashtagPage";
import UserPage from "./pages/UserPage"

export default function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}
