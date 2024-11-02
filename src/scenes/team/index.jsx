import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import axios from "axios";

import SpieContext from "../../context/SpieContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const { transactions, setDetails } = useContext(SpieContext);
  const navigate = useNavigate();

  console.log(`💬💬 Transactions: ${JSON.stringify(transactions)}`);

  const baseUrl =
    "https://cc12-2402-3a80-1fae-e914-88a9-13b7-58e3-d062.ngrok-free.app";

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "Tx ID", flex: 1 },
    {
      field: "from",
      headerName: "From",
      flex: 1,
    },
    {
      field: "to",
      headerName: "To",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "report",
      headerName: "Report",
      flex: 1,
      renderCell: ({ row: { to, from, id, amount, status, access } }) => {
        const handleClick = async () => {
          try {
            console.log("Tx ID:", id); // Log the "Tx ID" of the clicked row

            // 1. First API call: Transaction Analysis
            const transactionResponse = await axios.get(
              `${baseUrl}/transaction/${id}/analysis`,
              { headers: { "ngrok-skip-browser-warning": "true" } }
            );

            const { score: txScore = "N/A", severity: txSeverity = "N/A" } =
              transactionResponse.data;

            // 2. Second API call: Wallet Suspicion Scores
            const walletResponse = await axios.get(
              `${baseUrl}/wallet/${from}/suspicion_scores/`,
              { headers: { "ngrok-skip-browser-warning": "true" } }
            );

            const {
              normalized_score: walletTxScore = "N/A",
              details: {
                transaction_activity: {
                  frequency_score: walletTxAct = "N/A",
                } = {},
                malicious_interactions: {
                  malicious_score: walletMalInt = "N/A",
                } = {},
                contract_interactions: {
                  contract_score: walletContractInt = "N/A",
                } = {},
                cross_chain_activity: {
                  cross_chain_score: walletCCScore = "N/A",
                } = {},
                advanced_analytics: {
                  score: walletScore = "N/A",
                  severity: walletSeverity = "N/A",
                  entityType: walletEntityType = "N/A",
                  entityName: walletEntityName = "N/A",
                } = {},
              } = {},
            } = walletResponse.data;

            // 3. Third API call: Mule Suspicion Score
            let muleSus = "N/A";
            let balVelocity = "N/A";
            let iqr = "N/A";

            try {
              const muleSuspicionResponse = await axios.get(
                `${baseUrl}/wallet_balance/${from}/mule_suspicion_eth/`,
                { headers: { "ngrok-skip-browser-warning": "true" } }
              );

              // Check if the response contains the required data, otherwise use defaults
              if (
                muleSuspicionResponse.data &&
                !muleSuspicionResponse.data.error
              ) {
                const {
                  risk_level,
                  details: {
                    velocity: { value: velocityValue } = { value: "N/A" },
                    iqr_outliers_count: { count: iqrCount } = { count: "N/A" },
                  } = {},
                } = muleSuspicionResponse.data;

                muleSus = risk_level || "N/A";
                balVelocity = velocityValue;
                iqr = iqrCount;
              } else {
                console.warn("No balance changes found for this wallet.");
              }
            } catch (error) {
              console.warn(
                "Error fetching mule suspicion score. Defaulting to 'N/A'."
              );
            }

            // Create the object with the required properties
            const detailsObject = {
              hash: id,
              from,
              to,
              amount,
              txScore,
              txSeverity,
              walletScore,
              walletSeverity,
              walletEntityType,
              walletEntityName,
              walletTxScore,
              walletTxAct,
              walletMalInt,
              walletCCScore,
              walletContractInt,
              muleSus,
              balVelocity,
              iqr,
            };

            // Update the details in context
            setDetails(detailsObject);
            // Log the details object to verify
            console.log("Details Object:", detailsObject);
            navigate("/team");
          } catch (error) {
            console.error("Error fetching transaction details:", error);
          }
        };

        return (
          <Box
            width="60%"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              View Report
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="Dashboard" subtitle="Managing Web3 transactions" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={transactions.flat()} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
