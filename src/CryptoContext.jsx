import React, { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("PKR");
  const [symbol, setSymbol] = useState("PKR");

  useEffect(() => {
    if (currency === "PKR") setSymbol("PKR");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};

// import React, { createContext, useContext, useEffect, useState } from "react";

// const Crypto = createContext();

// const CryptoContext = ({ children }) => {
//   const [currency, setCurrency] = useState("USD");
//   const [symbol, setSymbol] = useState("$");

//   useEffect(() => {
//     if (currency === "USD") setSymbol("$");
//     else if (currency === "PKR") setSymbol("PKR");
//   }, [currency]);

//   return (
//     <Crypto.Provider value={(currency, symbol, setCurrency)}>
//       {children}
//     </Crypto.Provider>
//   );
// };

// export default CryptoContext;

// export const CryptoState = () => {
//   return useContext(Crypto);
// };
