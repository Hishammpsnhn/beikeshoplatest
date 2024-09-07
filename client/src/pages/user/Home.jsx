import React, { useEffect } from "react";
import {  Typography, Box } from "@mui/material";
import Header from "../../components/header/Header1";
import Nav from "../../components/header/Nav";
import Carouse from "../../components/carousel/Carouse";
import HomeCategory from "../../components/home-cards/HomeCategory";
import Footer from "../../components/footer/Footer";
import ExampleCarouselImage from '../../public/images/banner/D-1.0-UHP-2307204-LA-z20-P1-tommy-mokobara-upto60.webp';
import Banner2 from '../../public/images/banner/D-1.0-UHP-2307204-LA-z20-P2-panash-trink-under799.webp';
import Banner3 from '../../public/images/banner/D-1.0-MHP-08082024-emb-z10-p1-GLITO-IVOC-MIN60.webp';
import Banner4 from '../../public/images/banner/D-1.0-MHP-08082024-emb-z10-p2-VEIRDO-NOBERO-UNDER699.webp';
import Banner5 from '../../public/images/banner/D-1.0-MHP-08082024-emb-z10-p1-GLITO-IVOC-MIN60.webp';
import Banner6 from '../../public/images/banner/D-1.0-MHP-08082024-emb-z10-p4-Thomasscott-Beyoung-Min50.webp';
import strip from '../../public/images/banner/M-21072024-TrendsSIS-fallwinter24strip.jpg';
import stripService from '../../public/images/banner/Icon Strip-Desktop.jpg';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Home() {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate()
  useEffect(() => {
    if (user?.isAdmin ) navigate("/dashboard");
  }, [navigate,user]);

 
  
  return (
    <>
  <Header />
  <Nav />
  
  {/* Carousel Section */}
  <Carouse 
    Banner1={Banner3} 
    Banner2={Banner2} 
    Banner3={ExampleCarouselImage} 
  />
  
  {/* Responsive Box with Typography */}
  <Box
    sx={{
      bgcolor: 'black',
      color: 'white',
      textAlign: 'center',
      py: 2,
      mt: 2,
      borderBottom: 5,
      fontSize: { xs: '1rem', md: '1.5rem' },  // Responsive font size
    }}
  >
    <Typography variant="h6">New Today, Gone Tomorrow</Typography>
  </Box>
  
  {/* Second Carousel */}
  <Carouse 
    Banner1={Banner6} 
    Banner2={Banner4} 
    Banner3={Banner5} 
  />
  
  {/* Responsive Image */}
  <Box sx={{ width: '100%', mt: 2 }}>
    <img 
      className="w-100" 
      src={strip} 
      alt="banner" 
      loading="lazy" 
      style={{ maxWidth: '100%', height: 'auto' }} // Responsive image styling
    />
  </Box>
  
  <HomeCategory />
  
  {/* Second Responsive Image */}
  <Box sx={{ width: '100%', mt: 2 }}>
    <img 
      className="w-100" 
      src={stripService} 
      alt="banner" 
      loading="lazy" 
      style={{ maxWidth: '100%', height: 'auto' }} // Responsive image styling
    />
  </Box>
  
  <Footer />
</>
  );
}

export default Home;
