import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
  Box,
  Slider,
} from "@mui/material";
import "./SidebarProducts.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getProductByCategory,
} from "../../actions/categoryActions";
import { setSelectedCategory } from "../../reducers/productReducers";

function SidebarProducts({sort}) {
  const [priceRange, setPriceRange] = React.useState([20, 80]);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { selectedCategory } = useSelector((state) => state.products);

  console.log(selectedCategory)

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategory = (id) => {
    dispatch(setSelectedCategory(id))
    // dispatch(getProductByCategory(id,sort));
  };

  useEffect(() => {
    dispatch(getCategories());
    //setSelected(categories)
  }, []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductByCategory(selectedCategory,sort));
  }, [sort,selectedCategory]);

  return (
    <Sidebar className="sidebar-container">
      <Menu>
        <Box px={2} py={1}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Category
          </Typography>
        </Box>
        {categories.map((item, index) => (
          <MenuItem
            onClick={() => handleCategory(item._id)}
            key={index}
            style={{
              backgroundColor: selectedCategory === item._id ? " #D4499F" : "transparent",
              color: selectedCategory === item._id ? "white" : 'black',
            }}
          >
            {" "}
            {item.category}{" "}
          </MenuItem>
        ))}

        <SubMenu label={<Typography variant="body1">Accessories</Typography>}>
          <MenuItem> Watches</MenuItem>
          <MenuItem> Bags </MenuItem>
        </SubMenu>
        <Divider />

        <Box px={2} py={1}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Price
          </Typography>
        </Box>
        <Box px={2} py={1}>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={100}
            aria-labelledby="range-slider"
          />
        </Box>
        <Divider />

        <Box px={2} py={1}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Fabric
          </Typography>
        </Box>
        <MenuItem>
          <FormControlLabel control={<Checkbox />} label="Silk" />
        </MenuItem>
        <MenuItem>
          <FormControlLabel control={<Checkbox />} label="Chemical Fiber" />
        </MenuItem>
        <MenuItem>
          <FormControlLabel control={<Checkbox />} label="Cotton" />
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SidebarProducts;
