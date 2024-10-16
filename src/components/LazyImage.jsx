"use client";

import Image from "next/image";
import styled from "@mui/material/styles/styled";
const LazyImage = styled(Image)({
  width: "100%",
  height: "auto"
});
export default LazyImage;