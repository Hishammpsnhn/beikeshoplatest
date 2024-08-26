import React, { useEffect, useState } from "react";
import SidebarProducts from "../../components/sidebar/SidebarProducts";
import RangeSlider from "../../components/slider/RangeSlider";
import ProductCard from "../../components/card/ProductCard";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../components/header/Nav";
import Header from "../../components/header/Header1";
import { getProductByCategory } from "../../actions/categoryActions";
import {
  getProductsByName,
  getProductsList,
} from "../../actions/productActions";
import { getWishlist } from "../../actions/wishlistAction";
import { fetchProductSuccess } from "../../reducers/productReducers";
import debounce from "lodash/debounce";

function Products() {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [query, setQuery] = useState("");
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { products, loading, error } = useSelector((state) => state.products);
  const { selectedCategory } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  let sidebarWidth;
  if (isTablet) {
    sidebarWidth = 250;
  } else if (isLargeScreen) {
    sidebarWidth = 350;
  }

  const [sort, setSort] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  useEffect(() => {
    if (!selectedCategory) {
      dispatch(getProductsList(sort));
    }
  }, [sort]);
  useEffect(() => {
    setSort("");
  }, [selectedCategory]);

  useEffect(() => {
    const fetch = async () => {
      if (user) {
        const data = await getWishlist();
        if (data) {
          setData(data.items);
        }
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const debouncedFetch = debounce((query) => {
      dispatch(getProductsByName(query));
    }, 500);
    if (query) debouncedFetch(query);

    return () => {
      debouncedFetch.cancel();
    };
  }, [query, dispatch]);

  return (
    <>
      <Header />
      <Nav />
      <Box sx={{ display: "flex" }}>
        {!isPhone && (
          <Box sx={{ flex: `0 0 ${sidebarWidth}px`, padding: 2 }}>
            <SidebarProducts sort={sort} />
          </Box>
        )}
        <Box sx={{ flex: 1, padding: 2 }}>
          <Box display="flex" justifyContent="space-between">
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Sort</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={sort}
                label="sort"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"popular"}>Popularity</MenuItem>
                <MenuItem value={"lowToHigh"}>Price: Low to High</MenuItem>
                <MenuItem value={"highToLow"}>Price: High to Low</MenuItem>
                <MenuItem value={"aToZ"}>Name: A to Z</MenuItem>
                <MenuItem value={"zToA"}>Name: Z to A</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ m: 1, minWidth: 120 }}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              size="small"
              placeholder="search..."
            />
          </Box>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {loading ? (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width={300}
                      height={250}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={300}
                    />
                  </Grid>
                ))}
              </>
            ) : (
              <>
                {products.map((item, index) => {
                  const isInWishlist = data.some(
                    (wishlistItem) => wishlistItem._id === item._id
                  );
                  console.log(isInWishlist);

                  return (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                      <ProductCard
                        image={item?.images[0]}
                        name={item.name}
                        price={item.sizes[0].price}
                        id={item._id}
                        offer={item.offer}
                        wishlist={isInWishlist}
                      />
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Products;
