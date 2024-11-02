import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import TrafficIcon from "@mui/icons-material/Traffic";
import Security from "@mui/icons-material/Security";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import GppGoodIcon from "@mui/icons-material/GppGood";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PolicyIcon from "@mui/icons-material/Policy";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

import { useContext, useEffect, useState } from "react";
import SpieContext from "../../context/SpieContext";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { details } = useContext(SpieContext);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Analytics" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}

      {/* 1 row */}
      <Box
        display="flex"
        // flexDirection='row'
        // flexWrap='wrap'
        gap="20px"
        justifyContent="space-between"
      >
        {/* ROW 1 */}
        <Box
          flex="1 1 calc(75% - 20px)" // 3-column span equivalent (taking 75% of the row width)
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingTop="25px"
          paddingBottom="25px"
          minWidth="250px" // Optional: sets a minimum width to avoid shrinking too small on narrow screens
        >
          <StatBox
            title={`${details.txScore} ${details.txSeverity}`}
            subtitle="Transaction Severity Score"
            progress={details.txScore/100}
            // increase='+14%'
            icon={
              <Security
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={
              details.from.slice(0, 5) +
              "..." +
              details.from.slice(-3)
            }
            subtitle="From"
            progress="0"
            // increase='+21%'
            icon={
              <SendIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={details.amount}
            subtitle="Amount"
            progress="0"
            // increase='+5%'
            icon={
              <MonetizationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={
              details.to.slice(0, 5) +
              "..." +
              details.to.slice(-3)
            }
            subtitle="To"
            progress="0"
            // increase='+43%'
            icon={
              <PersonIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>

      {/* 2nd row */}
      <Header title="Advanced Wallet Analytics" />
      <Box
        display="flex"
        // flexDirection='row'
        // flexWrap='wrap'
        gap="20px"
        justifyContent="space-between"
      >
        {/* ROW 1 */}
        <Box
          flex="1 1 calc(75% - 20px)" // 3-column span equivalent (taking 75% of the row width)
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingTop="25px"
          paddingBottom="25px"
          minWidth="250px" // Optional: sets a minimum width to avoid shrinking too small on narrow screens
        >
          <StatBox
            title={details.walletScore}
            subtitle="Wallet Score"
            progress={details.walletScore/100}
            // increase='+14%'
            icon={
              <AddModeratorIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={details.walletSeverity}
            subtitle="Wallet Severity"
            progress={details.walletScore/100}
            // increase='+21%'
            icon={
              <GppGoodIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={details.walletEntityType ? details.walletEntityType : "NULL"}
            subtitle="Entity Type"
            progress="0"
            // increase='+5%'
            icon={
              <GppMaybeIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={details.walletEntityName ? details.walletEntityName : "NULL"}
            subtitle="Entity Name"
            progress="0"
            // increase='+43%'
            icon={
              <LocalPoliceIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>

      {/* 3rd row */}
      <Header title="Wallet Analysis (Transactions)" />
      <Box
        display="flex"
        // flexDirection='row'
        // flexWrap='wrap'
        gap="20px"
        justifyContent="space-between"
      >
        {/* ROW 1 */}
        <Box
          flex="1 1 calc(75% - 20px)" // 3-column span equivalent (taking 75% of the row width)
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingTop="25px"
          paddingBottom="25px"
          minWidth="250px" // Optional: sets a minimum width to avoid shrinking too small on narrow screens
        >
          <StatBox
            title={details.walletTxScore.toFixed(2)}
            subtitle="Wallet Transaction Score"
            progress={details.walletTxScore/100}
            // increase='+14%'
            icon={
              <VerifiedUserIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={details.walletTxAct}
            subtitle="Transaction Activity Score"
            progress={details.walletTxAct == "N/A" ? "0" : details.walletTxAct/5}
            // increase='+21%'
            icon={
              <PolicyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={details.walletMalInt}
            subtitle="Malicious Interaction Score"
            progress={details.walletMalInt == "N/A" ? "0" : details.walletMalInt/5}
            // increase='+5%'
            icon={
              <HealthAndSafetyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={details.walletCCScore}
            subtitle="Cross-Chain Activity Score"
            progress={details.walletCCScore == "N/A" ? "0" : details.walletCCScore/5}
            // increase='+43%'
            icon={
              <SafetyCheckIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>

      {/* 4rd row */}
      <Header title="Wallet Analysis (Balance)" />
      <Box
        display="flex"
        // flexDirection='row'
        // flexWrap='wrap'
        gap="20px"
        justifyContent="space-between"
      >
        {/* ROW 1 */}
        <Box
          flex="1 1 calc(75% - 20px)" // 3-column span equivalent (taking 75% of the row width)
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingTop="25px"
          paddingBottom="25px"
          minWidth="250px" // Optional: sets a minimum width to avoid shrinking too small on narrow screens
        >
          <StatBox
            title={details.muleSus}
            subtitle="Mule Suspicion"
            progress="0"
            // increase='+14%'
            icon={
              <AssuredWorkloadIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={details.balVelocity}
            subtitle="Balance Velocity"
            progress={details.balVelocity == "N/A" ? "0" : details.balVelocity/5}
            // increase='+21%'
            icon={
              <PrivacyTipIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={details.walletContractInt}
            subtitle="Contract-Interaction score"
            progress={details.walletContractInt == "N/A" ? "0" : details.walletContractInt/5}
            // increase='+5%'
            icon={
              <AdminPanelSettingsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          flex="1 1 calc(75% - 20px)"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minWidth="250px"
        >
          <StatBox
            title={details.iqr}
            subtitle="Interquartile Balance Count (IQR)"
            progress={details.iqr == "N/A" ? "0" : details.iqr/5}
            // increase='+43%'
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
