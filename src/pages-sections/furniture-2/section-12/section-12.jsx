"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Link from "next/link";
import { H3, Paragraph } from "../../../components/Typography";
import { FlexBox } from "../../../components/flex-box";
import LazyImage from "../../../components/LazyImage";
import { Typography, Tab } from "@mui/material";
import Tabs from '@mui/material/Tabs';
import api from "../../../utils/__api__/furniture-2";
import { calculateDiscount, currency } from "../../../lib"; // STYLED COMPONENTS

export default function Section12() {
  const [activeTab, setActiveTab] = useState("newArrival");
  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]);

  const categories = [
    { id: 1, title: "New Arrival", slug: "newArrival" },
    { id: 2, title: "Best Seller", slug: "bestSeller" },
    { id: 3, title: "Featured products", slug: "featured" },
  ];

  

  const getAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data); // Update the state with the fetched data
      }
    } catch (error) {
      console.error("Error during fetching products:", error);
    }
  };

  const getAllProducts2 = async () => {
    try {
      
      const products1 = await api.getNewArrivalProducts();
      setProducts1(products1);
    } catch (error) {
      console.error("Error during fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
    getAllProducts2();
  }, []);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Grid sx={{ background: "#1F1F1F", py: 25 }}>
      <Container>
        <Box sx={{ color: "#fff" }} py={4} textAlign="center">

          {/* Tab selector here */}
          <Box mb={4} overflow="hidden">
            <Tabs textColor="white" indicatorColor="primary" value={activeTab} onChange={handleChange} >
              {categories.map((item) => (
                <Tab sx={{ textTransform: 'none' }} label={item.title} value={item.slug} />
              ))}
            </Tabs>
          </Box>

        </Box>

        <Grid container spacing={3}>
          {products1.map((product) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={product.id}>
              <Link href={`/products/${product.slug}`}>
                <FlexBox
                  flexDirection="column"
                  bgcolor="rgba(255, 255, 255, 0.1)"
                  borderRadius={3}
                  mb={2}
                >
                  <LazyImage
                    alt={product.title}
                    width={380}
                    height={379}
                    src={product.thumbnail}
                  />
                  <Box sx={{ px: 4, pb: 4 }}>
                    <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "17px", fontWeight: 600 }} >
                      {product.title}
                    </Typography>
                    <Typography sx={{ fontFamily: 'Helvetica', color: "#BDBDBD", fontSize: "17px", fontWeight: 500 }} >
                      {product.brand}
                    </Typography>
                    <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "17px", fontWeight: 700 }} >
                      {calculateDiscount(product.price, product.discount)}
                    </Typography>
                  </Box>
                </FlexBox>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item lg={3} md={4} sm={6} xs={12} key={product.id}>
              <Link href={`/products/${product.id}`}>
                <FlexBox
                  flexDirection="column"
                  bgcolor="rgba(255, 255, 255, 0.1)"
                  borderRadius={3}
                  mb={2}
                >
                  <LazyImage
                    alt={product.name}
                    width={380}
                    height={379}
                    src={product.images}
                  />
                  <Box sx={{ px: 4, pb: 4 }}>
                    <Typography
                      sx={{ color: "#fff", fontSize: "17px", fontWeight: 700 }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      sx={{ color: "#fff", fontSize: "17px", fontWeight: 700 }}
                    >
                      {product.price}
                    </Typography>
                  </Box>
                </FlexBox>
              </Link>
            </Grid>
          ))}
        </Grid> */}
      </Container>
    </Grid>
  );
}
