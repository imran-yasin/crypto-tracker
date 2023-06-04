import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Header from "../Pages/Header";
import CoinPage from "../Pages/CoinPage";
const index = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coinPage/:id" element={<CoinPage />} />
      </Routes>
    </div>
  );
};

export default index;
