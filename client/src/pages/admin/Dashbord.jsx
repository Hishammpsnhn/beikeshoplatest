import React from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import StatBox from "../../components/admin/statsBox/StatBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminSubHeader from "../../components/admin/Header/AdminSubHeader";
import LineChart from "../../components/admin/barchart/BarChart";
import {
  getTopCategories,
  getTopProduct,
} from "../../actions/dashboard";
import TopModal from "../../components/admin/modalTop/TopModal";
import PieGraph from "../../components/pieGraph/PieGraph";


const Dashboard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openProduct, setOpenProduct] = useState(false);
  const handleOpenProduct = () => setOpenProduct(true);
  const [openCategory, setOpenCategory] = useState(false);
  const handleOpenCategory = () => setOpenCategory(true);
  const [sort, setSort] = React.useState("week");
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSort(event.target.value);
  };

  const handleStateProduct = async () => {
    setData([]);
    const data = await getTopProduct();
    if (data) {
      setData(data);
    }
  };
  const handleStateCategory = async () => {
    setData([]);
    const data = await getTopCategories();
    if (data) {
      setData(data);
    }
  };

  useEffect(() => {
    if (!user?.isAdmin || !isAuthenticated) navigate("/");
  }, [dispatch,user,isAuthenticated,navigate]);

  return (
    <>
      <Box m="20px" width="100% " sx={{maxHeight:'100vh',overflowY:'scroll'}}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <AdminSubHeader
            title="DASHBOARD"
            subtitle="Welcome to your dashboard"
          />

          <Box>
            {/* <Button
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
            </Button> */}
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
            gridColumn="1 / 6"
            backgroundColor={"#461246"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => {
              handleOpenProduct();
              handleStateProduct();
            }}
          >
            <StatBox title={"Top 10 Product"} />
          </Box>
          <Box
            gridColumn="6 / 11"
            backgroundColor={"#461246"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => {
              handleOpenCategory();
              handleStateCategory();
            }}
          >
            <StatBox title={"Top 10 Category"} />
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
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sort}
                      label="Sort"
                      size="small"
                      onChange={handleChange}
                    >
                      <MenuItem value="week">Weekly</MenuItem>
                      <MenuItem value="month">Monthly</MenuItem>
                      <MenuItem value="year">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
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
              {/* <BarChart isDashboard={true} /> */}
              <LineChart isDashboard={true} sort={sort} />
              <PieGraph/>
            </Box>
          </Box>
        </Box>
      </Box>
      <TopModal
        open={openProduct}
        setOpen={setOpenProduct}
        handleOpen={handleOpenProduct}
        product={true}
        products={data}
      />
      <TopModal
        open={openCategory}
        setOpen={setOpenCategory}
        handleOpen={handleOpenCategory}
        products={data}
      />
    </>
  );
};

export default Dashboard;
