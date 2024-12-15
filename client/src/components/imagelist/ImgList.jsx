import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Delete";

export default function TitlebarImageList({ src, handleDelete }) {
  const [clicked, setClicked] = React.useState(false);
  const BASE_URL = "";

  const handleClick = () => {
    setClicked(true);
    handleDelete(src);
  };

  return (
    <ImageListItem>
      <img
        src={`${BASE_URL}${src}`}
        alt="dfd"
        loading="lazy"
      />
      <ImageListItemBar
        actionIcon={
          <IconButton
            sx={{ color: clicked ? 'grey' : 'red' }} // Change color when clicked
            onClick={handleClick}
            disabled={clicked} // Disable after clicking
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </ImageListItem>
  );
}
