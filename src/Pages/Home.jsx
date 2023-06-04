import { CurrencyBitcoin } from "@mui/icons-material";
import React from "react";
import CurrencyTable from "../components/Home/CurrencyTable";
import Index from "../components/Home/Index";
const Home = () => {
  return (
    <div>
      <Index />
      <CurrencyTable />
    </div>
  );
};

export default Home;
