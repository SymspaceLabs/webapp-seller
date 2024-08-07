// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS

// import { H3, Paragraph } from "../../../components/Typography";
// import ProductCard12 from "../../../components/product-cards/product-card-12"; // API FUNCTIONS

// import api from "../../../utils/__api__/furniture-2";
// export default async function Section3() {
//   const products = await api.getNewArrivalProducts();
//   return <Container>
//       <Box mt={8} mb={4} textAlign="center">
//         <H3 fontSize={{
//         sm: 30,
//         xs: 27
//       }}>New Arrivals</H3>
//         <Paragraph color="grey.600" fontSize={{
//         sm: 16,
//         xs: 14
//       }}>
//           There are many variations passages
//         </Paragraph>
//       </Box>

//       <Grid container spacing={3}>
//         {products.map(product => <Grid item lg={3} md={4} sm={6} xs={12} key={product.id}>
//             <ProductCard12 product={product} />
//           </Grid>)}
//       </Grid>
//     </Container>;
// }

import React from 'react';
import { Container, Grid } from '@mui/material';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import LazyImage from "../../../components/LazyImage";

export default function Section11() {
  const cardsData1 = [
    { title: '90%', description: '90%+ of Americans use/would use AR for e-commerce' },
    { title: '90%', description: '94% conversion rate for products purchased through AR/VR ads' },
    { title: '90%', description: '98% of Americans who used AR while shopping found it helpful' },
  ];

  return (
    <Grid sx={{ background: '#1F1F1F', py: 10 }}>
      <Container>
        <Grid container spacing={3}>
          {cardsData1.slice(0, 3).map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomCard1 number={card.title} description={card.description} />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={6}>
            <CustomCard2 />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CustomCard3 />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export const CustomCard1 = ({ number, description }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2, borderRadius: '50px' }}>
      <CardContent>
        <Box sx={{ px:5, pt:20, pb:5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap:'30px' }} >
          <Typography component="div" sx={{ fontFamily:'Helvetica', color:'#000', fontSize: 128, fontWeight:'bold' }}>
            {number}
          </Typography>
          <Typography sx={{ fontFamily:'Helvetica', color:'#909090', fontSize: 24, fontWeight:'bold', textAlign:'center' }}>
            {description}
          </Typography>
          <Button variant="outlined" sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', mt:2, borderRadius:'50px', px:5, py:2, fontSize: 12 }}>Learn More</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
export const CustomCard2 = () => {
  return (
    <Card sx={{ minWidth: 275, mb: 2, borderRadius: '50px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px', pt:5 }}>
        <Typography variant="h1" component="div" sx={{ fontFamily: 'Helvetica', color: '#000', fontSize: 72, fontWeight: 'bold' }}>AR Visuals</Typography>
        <Typography variant="body2" sx={{  maxWidth: '500px', fontFamily: 'Helvetica', color: '#909090', fontSize: '14px', fontWeight: 'bold', textAlign: 'justify' }}>
          We create unparalleled AR experiences for our clients. Share your vision and our 3D artists will bring an AR animation to reality for your community to experience your brand like never before. AR Visuals provide businesses and consumers with an immersive medium for marketing. Symspace, Instagram, and Facebook users are able to augment 3D illustrations on their respective application over specified target markers. Conversion rates for AR advertising have been reported to be as high as 25%, which is more than 10 times higher than traditional ads. Improve your marketing today through our AR Visuals service.
        </Typography>
        <Box sx={{display:'flex', width:'100%',  maxWidth: '500px', }}>
          <Button variant="outlined" sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', mt: 2, borderRadius: '50px', px: 5, py: 2, fontSize: 12 }}>Contact Us</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export const CustomCard3 = () => {
  return (
    <Card sx={{ minWidth: 275, borderRadius: '50px', display: 'flex', flexDirection: 'column', height: 550, overflow: 'hidden' }}>
      <Box sx={{ position: 'relative', width: '100%', height: 550, overflow: 'hidden' }}>
        <video
          width={292}
          height={195}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          autoPlay loop muted
        >
          <source src="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/646e4fcefb0291863787d1a7_AR_Visuals_Spaceman-transcode.webm" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
    </Card>
  );
};


// export const CustomCard3 = () => {
//   return (
//     <Card sx={{ minWidth: 275, borderRadius: '50px', display: 'flex', flexDirection: 'column', height: '100%' }}>
//       <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <video width={292} height={195} autoPlay loop muted >
//           <source src="https://uploads-ssl.webflow.com/64694132a19474ee2218a9e6/646e4fcefb0291863787d1a7_AR_Visuals_Spaceman-transcode.webm" type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </Box>
//     </Card>
//   );
// };

// export const CustomCard3 = () => {
//   return (
//     <Card sx={{ minWidth: 275, borderRadius: '50px', display: 'flex', flexDirection: 'column', height: '100%' }}>
//       <LazyImage
//         alt="model"
//         width={292}
//         height={195}
//         src="/assets/images/landing/landing-1.png"
//         style={{ flex: 1 }}
//       />
//     </Card>
//   );
// };
