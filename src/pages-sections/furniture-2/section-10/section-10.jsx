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
import { Box, Container, Typography, Button, Grid } from '@mui/material';

export default function Section3() {
  return (
    <Grid sx={{background:'#1F1F1F'}}>
      <Container>
        <Box sx={{ display:'flex', flexDirection:'column', gap:3, alignItems: 'center', py: 8 }}>
          <Typography sx={{ width:'100%', maxWidth: 1200, fontFamily:'Helvetica', color:'#fff', fontSize: 72, fontWeight:'bold',  textAlign:'left'  }} >
            Our Focus
          </Typography>
          <Typography sx={{ maxWidth: 1200, fontFamily:'Helvetica', color:'#fff', fontSize: 16 }}>
            We empower individuals with Augmented Reality, while equipping brands with resources to showcase their products in unimaginable ways. Our goal is to revolutionize the end-to-end e-commerce process by creating 3D assets of retail products and enabling consumers to augment these products with enhanced AR functionalities. We offer a sustainable solution that delivers immersive, hyper-realistic, and seamless 3D models coupled with unparalleled AR experiences. Through cutting-edge technologies such as artificial intelligence and augmented reality, we are positioned to transform mere imagination into tangible simulations of reality.
          </Typography>
          <Box sx={{  width:'100%', maxWidth: 1200 }}>
            <Button variant="outlined" sx={{  fontFamily: 'Elemental End', textTransform: 'lowercase', color:'#fff', borderRadius:'50px', py:2, px:7.5 }}>
              Partner
            </Button>
          </Box>
        </Box>
      </Container>
    </Grid>

  );
}
