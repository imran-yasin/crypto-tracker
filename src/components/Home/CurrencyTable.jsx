import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Box, TextField, LinearProgress } from "@mui/material";

import axios from "axios";
import { CoinList } from "../config/api";
import { CryptoState } from "../../CryptoContext";
import {
  mainTypography,
  // currencyTableHeader,
  tableCoinBox,
  tableRowStyle,
} from ".././Header/headerMuiStyle";
const CurrencyTable = () => {
  const navigate = useNavigate();
  const { currency, symbol } = CryptoState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [coinData, setCoinData] = useState([]);
  const [searchCoin, setSearchCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCoinData = async () => {
    try {
      const response = await axios.get(CoinList(currency));
      setCoinData(response.data);
      console.log(response.data, "coin data in table");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getCoinData();
    setTimeout(() => setLoading(false), 1500);
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log(searchCoin, "search coin");

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  // const convertToMillionAbbreviation = (num) => {
  //   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  return (
    <>
      <Box
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
        <Typography sx={mainTypography} variant="BoldText">
          Currency Prices by Market cap
        </Typography>
      </Box>
      <Box mb={3}>
        <TextField
          error
          style={{
            outlineColor: "red",
            borderColor: "red",
          }}
          fullWidth
          id="outlined-basic"
          label="Search a Coin"
          variant="outlined"
          onChange={(e) => setSearchCoin(e.target.value)}
        />
      </Box>

      <TableContainer sx={{ maxHeight: 440 }}>
        {loading ? (
          <LinearProgress />
        ) : (
          <>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Coin</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>24h Change</TableCell>
                  <TableCell>Market Cap</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coinData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .filter((coin) => {
                    return (
                      coin.name.toLowerCase().includes(searchCoin) ||
                      coin.symbol.toLowerCase().includes(searchCoin)
                    );
                  })
                  .map((coin, index) => {
                    let profit = coin.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        onClick={() => {
                          navigate(`/coinPage/${coin.id}`);
                        }}
                        key={coin.id}
                        sx={tableRowStyle}
                        style={
                          index % 2
                            ? { background: "white" }
                            : { background: "#F5F5F5" }
                        }
                      >
                        <TableCell>
                          <Box sx={tableCoinBox}>
                            <img
                              src={coin.image}
                              alt={coin.name}
                              width="40px"
                            />
                            <Box>
                              <Typography variant="h6">
                                {coin.symbol.toUpperCase()}
                              </Typography>
                              <Typography variant="body2" color="grey">
                                {coin.name}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {symbol} {numberWithCommas(coin.current_price)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            style={{ color: profit ? "green" : "red" }}
                          >
                            {profit && "+"}
                            {coin.price_change_percentage_24h.toFixed(2)}%
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {symbol}{" "}
                            {numberWithCommas(
                              coin.market_cap.toString().slice(0, 6)
                            )}{" "}
                            M
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={coinData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};
export default CurrencyTable;
