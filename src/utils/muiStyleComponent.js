import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    background: {
      default: "#ff00ff",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});
