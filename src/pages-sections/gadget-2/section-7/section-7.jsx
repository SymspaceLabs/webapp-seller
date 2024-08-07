"use client";

import { Grid, Box, Card, CardContent, Container, Typography, Button } from '@mui/material';
import FlexBox from "../../../components/flex-box/flex-box";
import LazyImage from "../../../components/LazyImage";
import Link from "next/link";
import { calculateDiscount, currency } from "../../../lib"; // STYLED COMPONENTS
import { useState, useEffect } from "react";

import api from "../../../utils/__api__/furniture-2";
export default async function Section7() {
  // const services = await api.getServices();
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const products = await api.getNewArrivalProducts();
      setProducts(products);
    } catch (error) {
      console.error("Error during fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return  <Box sx={{py:5}}>
    <Container>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card sx={{background:'#BDBDBD', px:2, boxShadow: "inset -5px -5px 20px 1px rgba(255, 255, 255, 0.25), inset 5px 5px 20px 1px rgba(255, 255, 255, 0.25)", borderRadius:"50px" }}>
            <CardContent>
              <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: 36, fontWeight: 700, py:2 }} variant="h5" component="div">
                Selected for you
              </Typography>
              <Grid container spacing={2}>
                {products.slice(0, 4).map((product) => (
                  <Grid item lg={6} md={6} sm={6} xs={12} key={product.id}>
                    <Link href={`/products/${product.slug}`} passHref>
                      <FlexBox
                        flexDirection="column"
                        bgcolor="rgba(255, 255, 255, 0.1)"
                        borderRadius={3}
                        mb={2}
                        sx={{ userSelect: 'text', textDecoration: 'none' }}
                      >
                        <Box sx={{ maxHeight: 150, mt: -2, mb: '25px' }}>
                          <LazyImage
                            alt={product.title}
                            width={100}
                            height={100}
                            src={product.thumbnail}
                          />
                        </Box>

                        <Box sx={{ px: 4, pb: 1 }}>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "18px", fontWeight: 500 }}>
                            {product.title}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "16px", fontWeight: 500 }}>
                            {product.brand}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "20px", fontWeight: 700 }}>
                            {calculateDiscount(product.price, product.discount)}
                          </Typography>
                        </Box>
                      </FlexBox>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <FlexBox justifyContent="center">
                <Button sx={{ background:'#fff', fontFamily: 'Elemental End', textTransform: 'lowercase', mt: 2, borderRadius: '50px', px: 5, py: 2, fontSize: 16 }}>Contact Us</Button>
              </FlexBox>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{background:'#BDBDBD', px:2, boxShadow: "inset -5px -5px 20px 1px rgba(255, 255, 255, 0.25), inset 5px 5px 20px 1px rgba(255, 255, 255, 0.25)", borderRadius:"50px" }}>
            <CardContent>
              <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: 36, fontWeight: 700, py:2 }} variant="h5" component="div">
                Selected for you
              </Typography>
              <Grid container spacing={2}>
                {products.slice(0, 4).map((product) => (
                  <Grid item lg={6} md={6} sm={6} xs={12} key={product.id}>
                    <Link href={`/products/${product.slug}`} passHref>
                      <FlexBox
                        flexDirection="column"
                        bgcolor="rgba(255, 255, 255, 0.1)"
                        borderRadius={3}
                        mb={2}
                        sx={{ userSelect: 'text', textDecoration: 'none' }}
                      >
                        <Box sx={{ maxHeight: 150, mt: -2, mb: '25px' }}>
                          <LazyImage
                            alt={product.title}
                            width={100}
                            height={100}
                            src={product.thumbnail}
                          />
                        </Box>

                        <Box sx={{ px: 4, pb: 1 }}>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "18px", fontWeight: 500 }}>
                            {product.title}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "16px", fontWeight: 500 }}>
                            {product.brand}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "20px", fontWeight: 700 }}>
                            {calculateDiscount(product.price, product.discount)}
                          </Typography>
                        </Box>
                      </FlexBox>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <FlexBox justifyContent="center">
                <Button sx={{ background:'#fff', fontFamily: 'Elemental End', textTransform: 'lowercase', mt: 2, borderRadius: '50px', px: 5, py: 2, fontSize: 16 }}>Contact Us</Button>
              </FlexBox>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{background:'#BDBDBD', px:2, boxShadow: "inset -5px -5px 20px 1px rgba(255, 255, 255, 0.25), inset 5px 5px 20px 1px rgba(255, 255, 255, 0.25)", borderRadius:"50px" }}>
            <CardContent>
              <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: 36, fontWeight: 700, py:2 }} variant="h5" component="div">
                Selected for you
              </Typography>
              <Grid container spacing={2}>
                {products.slice(0, 4).map((product) => (
                  <Grid item lg={6} md={6} sm={6} xs={12} key={product.id}>
                    <Link href={`/products/${product.slug}`} passHref>
                      <FlexBox
                        flexDirection="column"
                        bgcolor="rgba(255, 255, 255, 0.1)"
                        borderRadius={3}
                        mb={2}
                        sx={{ userSelect: 'text', textDecoration: 'none' }}
                      >
                        <Box sx={{ maxHeight: 150, mt: -2, mb: '25px' }}>
                          <LazyImage
                            alt={product.title}
                            width={100}
                            height={100}
                            src={product.thumbnail}
                          />
                        </Box>

                        <Box sx={{ px: 4, pb: 1 }}>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "18px", fontWeight: 500 }}>
                            {product.title}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "16px", fontWeight: 500 }}>
                            {product.brand}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "20px", fontWeight: 700 }}>
                            {calculateDiscount(product.price, product.discount)}
                          </Typography>
                        </Box>
                      </FlexBox>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <FlexBox justifyContent="center">
                <Button sx={{ background:'#fff', fontFamily: 'Elemental End', textTransform: 'lowercase', mt: 2, borderRadius: '50px', px: 5, py: 2, fontSize: 16 }}>Contact Us</Button>
              </FlexBox>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
  ;
}