import React from "react";
import { Box, ThemeProvider, createTheme, Typography } from "@mui/material";
import LineChart from "./LineChart";
import "../styles/DashBoard.css";
import DataTable from "./DataTable";
import ProductTable from "./DataTable";
import PieChart from "./PieChart";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007FFF",
      dark: "#0066CC",
    },
    secondary: {
      main: "#FF5722",
      dark: "#E64A19",
    },
    info: {
      main: "#00BCD4",
      dark: "#0097A7",
    },
    success: {
      main: "#4CAF50",
      dark: "#388E3C",
    },
  },
});

const DashBoard: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="dashboard mt-3">
          <h1 className="dashboard-heading mt-3">Dashboard</h1>
          <div className="dashboard-content">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                overflowX: "auto",
              }}
            >
              <Box
                sx={{
                  bgcolor: theme.palette.primary.main,
                  color: "white",
                  borderRadius: 1,
                  p: 2,
                  boxShadow: 1,
                  minWidth: 200, // Ensuring minimum width
                  flexShrink: 0, // Prevent shrinking
                }}
              >
                <Typography variant="h6">Total Product</Typography>
                <Typography variant="body2">+1</Typography>
              </Box>

              <Box
                sx={{
                  bgcolor: theme.palette.secondary.main,
                  color: "white",
                  borderRadius: 1,
                  p: 2,
                  boxShadow: 1,
                  minWidth: 200, // Ensuring minimum width
                  flexShrink: 0, // Prevent shrinking
                }}
              >
                <Typography variant="h6">Total Expense</Typography>
                <Typography variant="body2">3000</Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: theme.palette.info.main,
                  color: "white",
                  borderRadius: 1,
                  p: 2,
                  boxShadow: 1,
                  minWidth: 200, // Ensuring minimum width
                  flexShrink: 0, // Prevent shrinking
                }}
              >
                <Typography variant="h6">Total Customer</Typography>
                <Typography variant="body2">+2</Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: theme.palette.success.main,
                  color: "white",
                  borderRadius: 1,
                  p: 2,
                  boxShadow: 1,
                  minWidth: 200, // Ensuring minimum width
                  flexShrink: 0, // Prevent shrinking
                }}
              >
                <Typography variant="h6">Total Profit</Typography>
                <Typography variant="body2">500</Typography>
              </Box>
              <Box
                sx={{
                  bgcolor: theme.palette.success.main,
                  color: "white",
                  borderRadius: 1,
                  p: 2,
                  boxShadow: 1,
                  minWidth: 150, // Ensuring minimum width
                  flexShrink: 0, // Prevent shrinking
                }}
              >
                <Typography variant="h6">Total Supplier</Typography>
                <Typography variant="body2">500</Typography>
              </Box>
            </Box>
          </div>
          <div className="container-fluid mt-5">
            <div className="row d-flex justify-content-between mr-5">
              <div
                className="col-md-6 mt-3  "
      
              >
                <LineChart />
              </div>
              <div className=" row col-md-6 mt-3 d-flex align-item-center justify-content-center flex-column" >
                <div className="col-6">
                  <PieChart />
                </div>
                <div className="col-6">
                  <ProductTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default DashBoard;
