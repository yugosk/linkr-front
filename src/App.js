import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/reset.css";
import "./assets/styles/style.css";

import { UserContextProvider } from "./contexts/userContext";

import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import TimelinePage from "./pages/TimelinePage";
import PostList from "./components/Timeline/TimelinePosts";

export default function App() {
  const posts = [
    {
      username: "mary",
      picture:
        "https://crazyraccoon.jp/wp/wp-content/uploads/2022/06/HP_%E9%81%B8%E6%89%8B%E7%94%BB%E5%83%8F_Meiy.png",
      description: "",
      url: "https://www.npmjs.com/package/joi",
      metaTitle: "joi",
      metaImage:
        "https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png",
      metaDescription:
        "Object schema validation. Latest version: 17.6.0, last published: 6 months ago. Start using joi in your project by running `npm i joi`. There are 9058 other projects in the npm registry using joi.",
    },
    {
      username: "mary",
      picture:
        "https://crazyraccoon.jp/wp/wp-content/uploads/2022/06/HP_%E9%81%B8%E6%89%8B%E7%94%BB%E5%83%8F_Meiy.png",
      description: "testando no front também",
      url: "https://www.figma.com/file/W3lZA9PUddEefwzdgiFZL4/T6-%7C-Projetão%3A-Linkr---Rede-Social-de-Links?node-id=7%3A37",
      metaTitle: "Metadata not available",
      metaImage: "Metadata not available",
      metaDescription: "Metadata not available",
    },
  ];

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<SigninPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route
            path="/layout"
            element={<PostList loading={false} posts={posts} />}
          />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
}
