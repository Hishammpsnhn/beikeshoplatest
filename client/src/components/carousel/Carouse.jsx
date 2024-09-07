import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper} from "@mui/material";

function Carouse({ Banner1, Banner2, Banner3 }) {
  const items = [
    { img: Banner1, alt: "First slide" },
    { img: Banner2, alt: "Second slide" },
    { img: Banner3, alt: "Third slide" },
  ];

  return (
    <Carousel
      animation="slide"
      interval={3000}
      indicators={false}
    >
      {items?.map((item, index) => (
        <Paper key={index} elevation={3} style={{ height: '100%' }}>
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={item.img}
              alt={item.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
           
          </div>
        </Paper>
      ))}
    </Carousel>
  );
}

export default Carouse;
