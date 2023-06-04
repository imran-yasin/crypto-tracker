import React from "react";
import { Typography, Box } from "@mui/material";
import "./home.css";
import Crasoul from "./Crasoul";

const Index = () => {
  return (
    <>
      <Box className="bgImgContainer">
        <Box>
          <Typography
            variant="h2"
            align="center"
            color="white"
            sx={{ fontWeight: "bold", fontSize: "3rem", padding: "2rem" }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="white"
            gutterBottom
            mb={5}
          >
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
          <Crasoul />
        </Box>
      </Box>
    </>
  );
};

export default Index;
