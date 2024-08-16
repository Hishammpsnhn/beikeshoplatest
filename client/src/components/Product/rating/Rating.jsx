import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { addOrUpdateRating } from "../../../actions/productActions";

const labels = {
  1: "Useless",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({ userId, productId,userRating }) {
  const [value, setValue] = React.useState(userRating?.rating);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          addOrUpdateRating(productId, userId, newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        // Customizing star colors
        sx={{
          "& .MuiRating-iconFilled": {
            color: "#902F90", // Color for filled stars
          },
          "& .MuiRating-iconHover": {
            color: "#902F90", // Color for stars when hovered
          },
          "& .MuiRating-iconEmpty": {
            color: "#F1CBF1", // Color for empty stars
          },
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
