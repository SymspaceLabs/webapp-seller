// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container"; // LOCAL CUSTOM COMPONENT

// import BannerCard from "./banner-card"; // GLOBAL CUSTOM COMPONENT

// import LazyImage from "../../../components/LazyImage"; // IMPORT IMAGES

// import bannerOne from "../../../../public/assets/images/banners/banner-30.jpg";
// import bannerTwo from "../../../../public/assets/images/banners/banner-31.jpg";
// export default function Section4() {
//   return <Container>
//       <Grid container spacing={3} mt={6}>
//         <Grid item lg={6} md={6} xs={12}>
//           <BannerCard title="Bed Room" description="Up To 20% Off All Furniture On Store" ImageComponent={<LazyImage alt="bed room" src={bannerOne} />} />
//         </Grid>

//         <Grid item lg={6} md={6} xs={12}>
//           <BannerCard title="Dining deals" description="Up To 20% Off All Furniture On Store" ImageComponent={<LazyImage alt="dining room" src={bannerTwo} />} />
//         </Grid>
//       </Grid>
//     </Container>;
// }

import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import LazyImage from "../../../components/LazyImage"; // LOCAL CUSTOM COMPONENTS

export default function Section2() {
  return (
    <Grid sx={{background:'#EDEDED', py:10, position:'relative'}}>
      <FloatingImage1 />
      <FloatingImage2 />

      <Container>
        <Box sx={{ textAlign: 'center', py: 8, display:'flex', flexDirection:'column', gap:5 }}>
        <Typography sx={{ fontFamily: 'Helvetica', color: '#4E4E4E', fontSize: { xs: 24, sm: 32, md: 48, lg: 60, xl: 72 }, fontWeight: 'bold', }} >
          Convenient & Comfortable
        </Typography>
          <Typography sx={{ fontFamily:'Helvetica', color:'#909090', fontSize: 16 }}>
          Explore products from the comfort of your home to conveniently and confidently shop through Augmented Reality          </Typography>
          <Box>
            <Button sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color:'#fff', background:'#000', borderRadius:'50px', py:2, px:7.5,}}>
              Shop
            </Button>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
}


export const FloatingImage1 = () => {

  return (
    <Box sx={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-60%) rotate(10deg)', zIndex: 10, width: '40%', height: 'auto', display:{sm:'none', md:'block'} }} >
      <LazyImage
        width={500}
        height={500}
        src="/assets/images/iphone2.png"
        alt="iphone"
      />
    </Box>
  );
};

export const FloatingImage2 = () => {
  return (
    <Box sx={{
      position: 'absolute',
      top: '75%', 
      right: 50,
      transform: 'translateY(-50%)',
      zIndex: 10,
      width: '25%',     
      height: 'auto',
      transform: 'translateY(-50%) rotate(10deg)', 
      display:{sm:'none', md:'block'}
    }}
    >
      <LazyImage
        width={400}
        height={400}
        src="/assets/images/rayBand.png"
        alt="iphone"
      />
    </Box>
  );
};
