// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENTS

// import { H3, Paragraph } from "../../../components/Typography"; // LOCAL CUSTOM COMPONENT

// import TestimonialCard from "./testimonial-card"; // API FUNCTIONS

// import api from "../../../utils/__api__/furniture-2";
// export default async function Section7() {
//   const testimonials = await api.getTestimonial();
//   return <Box bgcolor="grey.50" mt={10} pt={8} pb={30}>
//       <Container>
//         <Box mb={5} textAlign="center">
//           <H3 fontSize={{
//           sm: 30,
//           xs: 27
//         }}>Testimonial</H3>
//           <Paragraph color="grey.600" fontSize={{
//           sm: 16,
//           xs: 14
//         }}>
//             There are many variations passages
//           </Paragraph>
//         </Box>

//         <Grid container spacing={3}>
//           {testimonials.map(item => <Grid item md={4} xs={12} key={item.id}>
//               <TestimonialCard testimonial={item} />
//             </Grid>)}
//         </Grid>
//       </Container>
//     </Box>;
// }

import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import LazyImage from "../../../components/LazyImage"; // LOCAL CUSTOM COMPONENTS

export default function Section6() {
  return (
    <Grid sx={{ background: '#1F1F1F' }}>
      <Container>
        <Box sx={{ flexGrow: 1, py: 8 }}>
          <Grid container spacing={4} alignItems="stretch" style={{ height: '100%' }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start', gap:4 }}>
                <Typography sx={{ fontFamily: 'Helvetica', color: '#fff', fontSize: 72, fontWeight: 'bold' }}>
                  Realistic 3D Products
                </Typography>
                <Typography sx={{ fontFamily: 'Helvetica', color: '#fff', fontSize: 16 }}>
                  Generate high-quality 3D models of any dynamic or static product from <br></br> text-prompts, images, weblinks, and object scans. These 3D products are <br></br> then bridged to our immersive AR marketplace.
                </Typography>
                <Box sx={{ display: 'flex', pt: 5 }}>
                  <Button variant="outlined" sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', borderRadius: '50px', py: 2, px: 7.5 }}>
                    Partners
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LazyImage
                  width={650}
                  height={650}
                  src="/assets/images/dashboard.png"
                  alt="iphone"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>

  );
}
