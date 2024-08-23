import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addToWishlist,
  removeItemWishlist,
} from "../../actions/wishlistAction";
import "./productCard.css";

function ProductCard({ name, price, image, id, wishlist, offer }) {
  const [wishlistAction, setWishlistAction] = useState(wishlist);

  useEffect(() => {
    setWishlistAction(wishlist);
  }, [wishlist]);

  const handleWishlist = () => {
    addToWishlist(id);
    setWishlistAction(true);
  };

  const handleWishlistRemove = () => {
    removeItemWishlist(id);
    setWishlistAction(false);
  };

  return (
    <Card sx={{ maxWidth: 300, m: 2, position: "relative" }}>
      <CardActionArea>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
            display: "none",
            "&:hover": {
              display: "flex",
            },
          }}
          className="wishlist-icon"
        >
          <IconButton
            onClick={wishlistAction ? handleWishlistRemove : handleWishlist}
          >
            {wishlistAction ? (
              <FavoriteIcon sx={{ color: "#461246" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "#461246" }} />
            )}
          </IconButton>
        </Box>

        <Link to={`/productDetails/${id}`}>
          <CardMedia
            component="img"
            height="250"
            sx={{ objectFit: "contain" }}
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
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                mr: 1,
              }}
              variant="body1"
            >
              {Math.floor(price - price * (offer / 100))}
            </Typography>
            {offer > 0 && (
              <Typography sx={{ textDecoration: "line-through" }}>
                {price}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
