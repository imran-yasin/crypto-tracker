import React, { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { TrendingCoins } from "../config/api";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { crasoleBox } from "/src/components/Home/crasoulMuiStyle.js";
function Crasoul() {
  const { currency, symbol } = CryptoState();
  const [tranding, setTranding] = React.useState([]);
  const navigate = useNavigate();
  const getTrandingCoins = async () => {
    try {
      const response = await axios.get(TrendingCoins(currency));
      setTranding(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTrandingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const items = tranding.map((item, index) => {
    let profit = item.price_change_percentage_24h >= 0;

    return (
      <Box
        onClick={() => {
          navigate(`/coinPage/${item?.id}`);
        }}
        key={index}
        sx={crasoleBox}
      >
        <img
          src={item.image}
          alt={item.name}
          width="150px"
          style={{
            cursor: "pointer",
          }}
        />
        <Typography variant="h6" color="white">
          {item.name}
        </Typography>

        <Typography sx={{ color: profit ? "green" : "red" }}>
          {profit && "+"} {item.price_change_percentage_24h.toFixed(2)}%
        </Typography>

        <Typography variant="h6" color="white">
          {symbol} {numberWithCommas(item.current_price)}
        </Typography>
      </Box>
    );
  });

  return (
    <>
      <AliceCarousel
        disableButtonsControls
        responsive={responsive}
        showIndicators={true}
        infinite
        mouseTracking
        disableDotsControls
        autoPlay
        autoPlayInterval={1000}
        animationDuration={1000}
        items={items}
      />
    </>
  );
}

export default Crasoul;
