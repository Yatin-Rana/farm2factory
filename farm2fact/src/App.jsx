// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import AboutUs from './components/AboutUs';
import FarmerDashboard from './components/FarmerDashboard';
import AddProduce from './components/AddProduce';
import FarmerCrops from './components/FarmerCrops';
import FactoryDashboard from './components/FactoryDashboard';
import FarmerLogin from './pages/FarmerLogin';
import FactoryLogin from './pages/FactoryLogin';
import BoughtCrops from './components/BoughtCrops';

// Layout component to wrap the Navbar and content


const App = () => {
  return (
    <Router>
      <Routes>
        
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/farmer-login" element={<FarmerLogin/>} />
          <Route path="/factory-login" element={<FactoryLogin/>} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/add-produce" element={<AddProduce />} />
          <Route path="/farmer-crops" element={<FarmerCrops />} />
          <Route path="/factory-dashboard" element={<FactoryDashboard />} />
          <Route path="/bought-crops" element={<BoughtCrops />} />
        
      </Routes>
    </Router>
  );
};

export default App;
