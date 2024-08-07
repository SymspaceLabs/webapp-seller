"use client";

import Content from "./content"; // API FUNCTIONS
import { useState, useEffect } from "react";

// import api from "../../../utils/__api__/gadget-2";
import api from "../../../utils/__api__/furniture-2";

export default async function Section5() {
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
  

  return <Content products={products} />;
}
