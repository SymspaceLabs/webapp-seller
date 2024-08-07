// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container"; // GLOBAL CUSTOM COMPONENT

// import LazyImage from "../../../components/LazyImage"; // LOCAL CUSTOM COMPONENTS

// import Banner1 from "./banner-1";
// import Banner2 from "./banner-2"; // IMPORT IMAGES

// import banner1 from "../../../../public/assets/images/banners/banner-33.jpg";
// import banner2 from "../../../../public/assets/images/banners/banner-34.jpg";
// import banner3 from "../../../../public/assets/images/banners/banner-35.jpg";
// import banner4 from "../../../../public/assets/images/banners/banner-36.jpg";
// export default function Section6() {
//   return <Container>
//       <Grid container spacing={3} mt={6}>
//         {
//         /* COUNT DOWN BANNER */
//       }
//         <Grid item lg={7} md={6} xs={12}>
//           <Banner1 />
//         </Grid>

//         {
//         /* OFFICE TABLE BANNER */
//       }
//         <Grid item lg={5} md={6} xs={12}>
//           <Banner2 title="Office Table" ImageComponent={<LazyImage src={banner1} alt="banner" />} />
//         </Grid>

//         {
//         /* SOFA STYLE BANNER */
//       }
//         <Grid item lg={3} md={6} xs={12}>
//           <Banner2 isContentCenter ImageComponent={<LazyImage src={banner2} alt="banner" />} title={<>
//                 Sofa style <br /> 2024
//               </>} />
//         </Grid>

//         {
//         /* LIGHTING BANNER */
//       }
//         <Grid item lg={6} md={6} xs={12}>
//           <Banner2 title="Lighting" ImageComponent={<LazyImage src={banner3} alt="banner" />} />
//         </Grid>

//         {
//         /* SALE UP BANNER */
//       }
//         <Grid item lg={3} md={6} xs={12}>
//           <Banner2 ImageComponent={<LazyImage src={banner4} alt="banner" />} title={<>
//                 sale up to <br /> 30% off
//               </>} />
//         </Grid>
//       </Grid>
//     </Container>;
// }

import { Box, Typography, Button, Grid, Container, Hidden } from '@mui/material';
import LazyImage from "../../../components/LazyImage"; // LOCAL CUSTOM COMPONENTS
export default function Section7() {
  return (
<Grid sx={{ background: '#1F1F1F', pt:10, pb: 20, height: '100%' }}>
  <Container sx={{ height: '100%' }}>
      <Grid container alignItems="stretch" spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: '10px' }}>
            {/* CARD 1 */}
            <Box sx={{ pt: 5.5, pb: 5.5, px: 4, pr: 6, width: '100%', height: '100%', bgcolor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '50px', gap:2 }}>
              <Box sx={{ p: 0 }}>
                <LazyImage
                  alt="Image"
                  width={150}
                  height={150}
                  src="/assets/images/card/tree.png"
                />
              </Box>
              <Box sx={{ width: 200, height: 143, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 2 }}>
                <Typography sx={{ lineHeight:1, alignSelf: 'stretch', color: 'black', fontSize: { xs: 20, sm: 32, md: 40, lg: 40, xl: 40 }, fontFamily: 'Helvetica', fontWeight: 700, wordWrap: 'break-word' }}>
                  Environmental Impact
                </Typography>
                <Typography sx={{ alignSelf: 'stretch', color: '#909090', fontSize: { xs: 12, sm: 12, md: 14 }, fontFamily: 'Helvetica', fontWeight: 700, lineHeight: { xs: 1, sm: 1.5 }, wordWrap: 'break-word' }}>
                  Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
                </Typography>
              </Box>
            </Box>


            <Box sx={{ width: '100%', display: { xs: 'block', md: 'flex' }, justifyContent: 'flex-start', alignItems: 'flex-start', gap: '10px', mt: { xs: 2, md: 0 } }}>
              
              {/* CARD 2 */}
              <Box sx={{ width: '100%', pt: 5.5, pb: 5.5, px: 4, pr: 6, height: '100%', bgcolor: '#EDEDED', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, borderRadius: '50px', mb: { xs: 2, md: 0 } }}>

                <Box sx={{ p: 0 }}>
                  <LazyImage
                    alt="Image"
                    width={94}
                    height={94}
                    src="/assets/images/card/cursor.png"
                  />
                </Box>
                <Box sx={{ height: 143, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ lineHeight:1, alignSelf: 'stretch', color: '#000', fontSize: { xs: 20, md: 25 }, fontFamily: 'Helvetica', fontWeight: 700, wordWrap: 'break-word' }}>
                    Website Integration
                  </Typography>
                  <Typography sx={{ alignSelf: 'stretch', color: '#909090', fontSize: { xs: 12, sm: 12, md: 14 }, fontFamily: 'Helvetica', fontWeight: 700, lineHeight: { xs: 1, sm: 1.5 }, wordWrap: 'break-word' }} >
                    Computational audio. Listen, it's powerful
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: '100%', pt: 5.5, pb: 5.5, px: 4, pr: 6, height: '100%', bgcolor: '#353535', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50px', gap: 1  }}>
                <Box sx={{ p: 0 }}>
                  <LazyImage
                    alt="Image"
                    width={147.13}
                    height={158.26}
                    src="/assets/images/card/mobile.png"
                  />
                </Box>
                <Box sx={{ width: '100%', height: 144, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ lineHeight:1, alignSelf: 'stretch', color: '#fff', fontSize: { xs: 20, md: 25 }, fontFamily: 'Helvetica', fontWeight: 700, wordWrap: 'break-word' }}>
                    Application Integration
                  </Typography>
                  <Typography  sx={{ alignSelf: 'stretch', color: '#909090', fontSize: { xs: 12, sm: 12, md: 14 }, fontFamily: 'Helvetica', fontWeight: 700, lineHeight: { xs: 1, sm: 1.5 }, wordWrap: 'break-word' }}>
                    An immersive way to experience entertainment
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Box sx={{display:'flex', flexDirection:'column', height:'100%', bgcolor:'#fff', borderRadius: '50px', justifyContent:'center' }}>
            <Box sx={{ pt: 5.5, pb: 5.5, px: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2 }}>
                  <Typography sx={{ lineHeight:1, alignSelf: 'stretch', color: 'black', fontSize: { xs: 20, sm: 32, md: 40}, fontFamily: 'Helvetica', fontWeight: 700, wordWrap: 'break-word' }}>
                    Underserved<br />Customers
                  </Typography>
                  <Typography  sx={{ alignSelf: 'stretch', color: '#909090', fontSize: { xs: 12, sm: 12, md: 18 }, fontFamily: 'Helvetica', fontWeight: 700, lineHeight: { xs: 1, sm: 1.5 }, wordWrap: 'break-word' }}>
                    The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.
                  </Typography>
                </Box>
                <Button sx={{ width: '75%', py:1, borderRadius: 50, border: '1px black solid', justifyContent: 'center', alignItems: 'center', }}>
                  <Typography sx={{ textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Elemental End', textTransform: 'lowercase', fontWeight: 700, lineHeight: '24px', wordWrap: 'break-word' }}>
                    Learn More
                  </Typography>
                </Button>
              </Box>
              <Box sx={{ width: '100%' }}>
                <LazyImage
                  alt="Image"
                  width={200}
                  height={200}
                  src="/assets/images/card/wheelchair.png"
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
  </Container>
</Grid>

  );
}
