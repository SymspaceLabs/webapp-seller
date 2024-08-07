// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENT

// import ServiceCard1 from "../../../components/service-cards/service-card-1"; // API FUNCTIONS

// import api from "../../../utils/__api__/furniture-2";
// export default async function Section9() {
//   const services = await api.getServices();
//   return <Container>
//       <Grid container spacing={3} mt={8}>
//         {services.map(({
//         icon,
//         id,
//         title,
//         description
//       }) => <Grid item lg={3} sm={6} xs={12} key={id}>
//             <ServiceCard1 icon={icon} title={title} description={description} />
//           </Grid>)}
//       </Grid>
//     </Container>;
// }


import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import LazyImage from "../../../components/LazyImage";
import ThreeModel from '../../../components/ThreeModel';
import TShirtCanvas  from "../../../components/T-ShirtCanvas";
import HandBagCanvas  from "../../../components/HandBagCanvas";

export default function Section9() {
  return (
    <Grid sx={{background:'#1F1F1F'}}>
      <Container>
        <Box sx={{ flexGrow: 1, py: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ display:'flex', flexDirection:'column', gap:2  }}>
              <Box sx={{ display:'flex', flexDirection:'column', background:'#D5D5D5', p:5, borderRadius:'25px'}}>
                <Typography sx={{ fontFamily:'Helvetica', color:'#000', fontSize: 20, fontWeight:'bold' }} >Innovative and immersive experiences</Typography>
              </Box>
              <Box sx={{ display:'flex', flexDirection:'column', background:'#fff', p:5, borderRadius:'25px'}}>
                <Typography sx={{ fontFamily:'Helvetica', color:'#000', fontSize: 20, fontWeight:'bold' }} >Improve consumer confidence and convenience</Typography>
              </Box>
              <Box sx={{ display:'flex', flexDirection:'column', background:'#D5D5D5', p:5, borderRadius:'25px'}}>
                <Typography sx={{ fontFamily:'Helvetica', color:'#000', fontSize: 20, fontWeight:'bold' }} >Reduce manufacturing and inventory costs </Typography>
              </Box>
              <Box sx={{ display:'flex', flexDirection:'column', background:'#fff', p:5, borderRadius:'25px'}}>
                <Typography sx={{ fontFamily:'Helvetica', color:'#000', fontSize: 20, fontWeight:'bold' }} >Customizable AR content for marketing purposes</Typography>
              </Box>
              <Box sx={{ display:'flex', flexDirection:'column', background:'#D5D5D5', p:5, borderRadius:'25px'}}>
                <Typography sx={{ fontFamily:'Helvetica', color:'#000', fontSize: 20, fontWeight:'bold' }} >Awareness and assistance for underserved communities</Typography>
              </Box>
              <Box sx={{ display:'flex', flexDirection:'column', background:'#fff', p:5, borderRadius:'25px'}}>
                <Typography sx={{ fontFamily:'Helvetica', color:'#000', fontSize: 20, fontWeight:'bold' }} >Gauge consumer demand through AR Room</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ minHeight:'750px'}}>
                {/* <ThreeModel /> */}
                {/* <TShirtCanvas /> */}
                <HandBagCanvas />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Grid>
  );
}