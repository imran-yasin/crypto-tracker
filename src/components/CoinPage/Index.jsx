import React, { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinInfo from "./CoinInfo";
import {
  coinInfoContainer,
  coinInfoLeftSide,
} from "../CoinPage/coinPageMuiStyle";

const index = () => {
  const { id } = useParams();
  const { currency, symbol } = CryptoState();
  const [coinDetails, setCoinDetails] = useState([]);

  const getCoinDetails = async () => {
    const response = await axios.get(SingleCoin(id));
    setCoinDetails(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getCoinDetails();
  }, []);

  return (
    <>
      <Box sx={coinInfoContainer}>
        <Box sx={coinInfoLeftSide}>
          <img
            src={coinDetails?.image?.large}
            alt={coinDetails.name}
            width="130px"
          />
          <Typography variant="h4" component="h2">
            {coinDetails.name}
          </Typography>
          <Typography variant="body1" component="p">
            {coinDetails?.symbol?.toUpperCase()}
          </Typography>
          <Typography variant="body1" component="p">
            {coinDetails?.description?.en.split(".")[0]}
          </Typography>
          <Typography variant="h4" component="p">
            Coingecko Rank: {coinDetails?.coingecko_rank}
          </Typography>
        </Box>
        <Box>
          {/* right bar */}
          <CoinInfo coinDetails={coinDetails} />
        </Box>
      </Box>
    </>
  );
};

export default index;
