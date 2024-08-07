"use client"

import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton"; // MUI ICON COMPONENT
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import PersonOutline from "@mui/icons-material/PersonOutline"; // CUSTOM ICON COMPONENT
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlined from "../../../icons/ShoppingBagOutlined"; // GLOBAL CUSTOM HOOK

import useCart from "../../../hooks/useCart"; // ==============================================================
import { useRouter } from "next/navigation";

import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext'; // Adjust the path as needed

// ==============================================================
export default function LoginCartButtons({ toggleDialog, toggleSidenav }) {
  const { state } = useCart();
  const ICON_COLOR = { color: "grey.600" };
  const { isAuthenticated, login, logout } = useAuth();

  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    handleMenuClose();
    toggleDialog();
  };

  const handleProfile = () => {
    handleMenuClose();
    router.push('/profile');
  }

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <div>
      <IconButton onClick={toggleDialog}>
        <FavoriteBorderIcon sx={ICON_COLOR} />
      </IconButton>

      <Badge badgeContent={state.cart.length} color="primary">
        <IconButton onClick={toggleSidenav}>
          <ShoppingBagOutlined sx={ICON_COLOR} />
        </IconButton>
      </Badge>

      <IconButton onClick={handleMenuClick}>
        <PersonOutline sx={ICON_COLOR} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}>
      
          {!isAuthenticated ?
            <>
              <MenuItem onClick={handleLogin}>Login or Sign up</MenuItem>
            </> :
            <>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          }
        
      </Menu>
    </div>
  );
}
