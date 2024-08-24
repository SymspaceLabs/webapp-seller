import Box from "@mui/material/Box";
import Container from "@mui/material/Container"; // Local CUSTOM COMPONENTS

import LeftContent from "./left-content";
import RightContent from "./right-content"; // STYLED COMPONENTS

import { StyledToolBar, DashboardNavbarRoot } from "./styles";
export default function DashboardNavbar() {
  return <DashboardNavbarRoot position="sticky">
      <Container maxWidth="xl">
        <StyledToolBar disableGutters>
          <LeftContent />
          <Box flexGrow={1} />
          <RightContent />
        </StyledToolBar>
      </Container>
    </DashboardNavbarRoot>;
}