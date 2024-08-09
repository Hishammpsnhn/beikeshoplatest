import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import img from "../../public/images/products/nninw_400.webp";
import { oneProduct } from "../../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ProductCard({ name, price, image, id }) {
  const navgate = useNavigate();
  const dispatch = useDispatch();

  // const handleDetail = () => {
  //   oneProduct(id);
  //   navgate("/productDetails");
  //   dispatch(oneProduct(id));
  // };
  return (
    <Card sx={{ maxWidth: 300, m: 2 }}>
      <CardActionArea>
        <Link to={`/productDetails/${id}`}>
          <CardMedia
            component="img"
            height="250"
            sx={{objectFit:'contain'}}
            image={image}
            alt="Product image"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
          {name.length > 32 ? `${name.substring(0, 32)}...` : name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                color: "primary.main",
                fontWeight: "bold",
                mr: 1,
              }}
              variant="body1"
            >
              {price}
            </Typography>
            <Typography sx={{ textDecoration: "line-through" }}>$45</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
