import React, { createContext, useState, useEffect } from "react";

import "eventsource-polyfill";
import axios from "axios";

const SpieContext = createContext();

// web-scokets
const webSocketResponse = {
  result: [
    {
      from: "0xe0bd13bae07c14344a3eeec5ab6ab56b789f2fc2",
      to: "0x673932784835cc48710a5196e4458ffc5e2b9209",
      value_in_eth: 7.17965834212313,
      hash: "0x38246823826d55d0f0ed580eee0adf8d33408164908d0c15e4b422a6e1e6e498",
    },
    {
      from: "0xaba3a32f09b1167ee2da25dbb78c96d553bde127",
      to: "0xeba88149813bec1cccccfdb0dacefaaa5de94cb1",
      value_in_eth: 6.997692,
      hash: "0x145458bb8e35cb08ba8813902688ecb695d0d34df23b631ad003492096303008",
    },
  ],
};

export const baseUrl =
  "https://cc12-2402-3a80-1fae-e914-88a9-13b7-58e3-d062.ngrok-free.app";

export const SpieProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [details, setDetails] = useState({});

  const formatTransaction = async (transaction) => {
    try {
      const analysisResponse = await axios.get(
        `${baseUrl}/transaction/${transaction.hash}/analysis`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const analysisData = analysisResponse.data;

      // Map severity to status
      let status;
      switch (analysisData.severity) {
        case "LOW_RISK":
          status = "LOW";
          break;
        case "MEDIUM_RISK":
          status = "MEDIUM";
          break;
        case "HIGH_RISK":
          status = "HIGH";
          break;
        default:
          status = "UNKNOWN";
      }

      return {
        id: transaction.hash,
        from: transaction.from,
        to: transaction.to,
        status,
        amount: `${transaction.value_in_eth} ETH`,
        access: "admin",
      };
    } catch (error) {
      console.error("Error formatting transaction:", error);
      return null;
    }
  };

  const fetchLatestTransactions = async () => {
    console.log("Fetching latest transactions");
    try {
      // Get the latest response data
      const response = await axios.get(`${baseUrl}/latest_response`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      // Process and format each transaction
      const formattedTransactions = await Promise.all(
        response.data.transactions.map((transaction) =>
          formatTransaction(transaction)
        )
      );

      // Filter out null values (in case of formatting errors)
      const validTransactions = formattedTransactions.filter((t) => t !== null);

      // Add only new transactions by checking for duplicates
      setTransactions((prevTransactions) => {
        const newTransactions = validTransactions.filter(
          (newTransaction) =>
            !prevTransactions.some((prev) => prev.id === newTransaction.id)
        );
        return [...prevTransactions, ...newTransactions];
      });

      console.log("Updated transactions:", validTransactions);
    } catch (error) {
      console.error("Error fetching latest transactions:", error);
    }
  };

  useEffect(() => {
    // Set up polling every 5 seconds
    const intervalId = setInterval(fetchLatestTransactions, 5000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SpieContext.Provider
      value={{
        transactions,
        setTransactions,
        formatTransaction,
        details,
        setDetails,
      }}
    >
      {children}
    </SpieContext.Provider>
  );
};

export default SpieContext;
