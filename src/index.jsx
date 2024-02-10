import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.scss";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContentContainer from "./compontents/ContentContainer";
import ContactPage from "./pages/ContactPage";
import AboutUs from "./pages/AboutUs";
import ProjectPage from "./pages/ProjectPage";
import SingleProjectPage from "./pages/SingleProjectPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import PageNotFound from "./pages/PageNotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* We implemented routing in order to change what was rendered */}

    <BrowserRouter>
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/o-nama" element={<AboutUs />} />
          <Route path="/tim/:projectUrl" element={<TeamMemberPage />} />
          <Route path="/projekti" element={<ProjectPage />} />
          <Route path="/projekti/:projectUrl" element={<SingleProjectPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ContentContainer>
    </BrowserRouter>
  </React.StrictMode>
);
