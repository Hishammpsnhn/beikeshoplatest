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

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 500,
    label: '500',
  },
  {
    value: 1000,
    label: '1000',
  },
  {
    value: 1500,
    label: '1500',
  },
  {
    value: 2000,
    label: '2000',
  },
];

function SidebarProducts({ sort }) {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { selectedCategory } = useSelector((state) => state.products);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleCategory = (id) => {
    dispatch(setSelectedCategory(id));
    // dispatch(getProductByCategory(id, sort));
  };

  function valuetext(value) {
    return `${value}`;
  }

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProductByCategory(selectedCategory, sort));
  }, [dispatch, sort, selectedCategory]);

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
              backgroundColor: selectedCategory === item._id ? "#D4499F" : "transparent",
              color: selectedCategory === item._id ? "white" : 'black',
            }}
          >
            {item.category}
          </MenuItem>
        ))}

        <SubMenu label={<Typography variant="body1">Accessories</Typography>}>
          <MenuItem>Watches</MenuItem>
          <MenuItem>Bags</MenuItem>
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
            aria-label="Price Range"
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            step={10}
            min={0}
            max={2000}
            marks={marks}
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

