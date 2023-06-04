import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/muiStyleComponent";
import GlobalStyles from "@mui/material/GlobalStyles";
import CryptoContext from "./CryptoContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#14161a", color: "white" },
        }}
      />
      <CryptoContext>
        <App />
      </CryptoContext>
    </ThemeProvider>
  </BrowserRouter>
);
