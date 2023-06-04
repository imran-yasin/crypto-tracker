import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  AppBar,
  Toolbar,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  headerMaintainer,
  headerSelector,
  headerHeight,
  headerTitle,
  navBar,
} from ".././Header/headerMuiStyle";
import { CryptoState } from "../..//CryptoContext";
const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();
  const handleHomePage = () => {
    navigate("/");
  };
  return (
    <div>
      <AppBar position="static" sx={navBar}>
        <Box sx={headerMaintainer}>
          <Box>
            <Toolbar sx={headerHeight}>
              <Typography
                sx={headerTitle}
                onClick={() => {
                  handleHomePage();
                }}
                variant="h6"
                component="div"
              >
                Crypto Tracker App
              </Typography>
            </Toolbar>
          </Box>
          <Box>
            <FormControl sx={headerSelector}>
              <InputLabel id="demo-simple-select-label">
                Select Curreny
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select Curreny"
                variant="outlined"
                value={currency}
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
              >
                <MenuItem value={"PKR"}>
                  <Typography>PKR</Typography>
                </MenuItem>
                <MenuItem value={"USD"}>
                  <Typography>USD</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </AppBar>
    </div>
  );
};

export default Header;
