import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StatBox from "../../components/admin/statsBox/StatBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BarChart from "../../components/admin/barchart/BarChart";
import AdminSubHeader from "../../components/admin/Header/AdminSubHeader";


// import {
//   adminDashboard,
//   adminDashboardBooking,
//   sellerDashboard,
//   sellerDashboardOrders,
// } from '../actions/dashboardAction'
// import BasicModal from '../components/Model'

const Dashboard = () => {
  // const user = useSelector((state) => state.user.user)
  const {  isAuthenticated,user } = useSelector((state) => state.auth);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!user?.isAdmin || !isAuthenticated) navigate("/");
  }, [dispatch]);

  return (
    <>
      <Box m="20px" width="100%">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <AdminSubHeader
            title="DASHBOARD"
            subtitle="Welcome to your dashboard"
          />

          <Box>
            <Button
              sx={{
                backgroundColor: "#461246",
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
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="150px"
          // gap="20px"
          columnGap="20px"
          rowGap="40px"
        >
          {/* ROW 1 */}

          <Box
            gridColumn="1 / 5"
            backgroundColor={"#461246"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleOpen()}
          >
            <StatBox />
          </Box>
          <Box
            gridColumn="5 / 9"
            backgroundColor={"#461246"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleOpen()}
          >
            <StatBox />
          </Box>
          <Box
            gridColumn="9 / 13"
            backgroundColor={"#461246"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleOpen()}
          >
            <StatBox />
          </Box>

          {/* ROW 2 */}

          <Box
            gridColumn="2 / 11"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6" fontWeight="bold" color={"#461246"}>
                  Sales Perfomance
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlinedIcon
                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="300px" m="-20px 0 0 0">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
