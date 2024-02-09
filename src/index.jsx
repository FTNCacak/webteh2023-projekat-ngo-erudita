import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.scss';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './pages/Test';
import ContentContainer from './compontents/ContentContainer';
import ContactPage from './pages/ContactPage';
import AboutUs from './pages/AboutUs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* We implemented routing in order to change what was rendered */}
    
    <BrowserRouter>
    <ContentContainer>
      <Routes>
        <Route path="/" element={<Home />}>
           {/* <Route index element={<Home />} /> */}
          {/*<Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
        
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/o-nama" element={<AboutUs />} />
      </Routes>
    </ContentContainer>
    </BrowserRouter>
    
  </React.StrictMode>
);

