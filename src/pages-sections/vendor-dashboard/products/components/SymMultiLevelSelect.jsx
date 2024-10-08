import React, { useState, useMemo } from "react";
import { TextField, Menu, MenuItem, Box } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const SymMultiLevelSelect = ({ onCategorySelect }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const [subSubAnchorEl, setSubSubAnchorEl] = useState(null);
  const [activeCategoryPath, setActiveCategoryPath] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const categories = useMemo(() => [
    {
      name: 'Clothing, Shoes & Accessories',
      subcategories: [
        { name: 'Dresses', subcategoryItems: [{ name: 'Casual Dresses' }, { name: 'Formal Dresses' }, { name: 'Tank tops' }, { name: 'Summer Dresses' }] },
        { name: 'Tops', subcategoryItems: [{ name: 'Blouses' }, { name: 'T-Shirts' }, { name: 'Tank tops' }, { name: 'Sweaters' }, { name: 'Cardigans' }] },
        { name: 'Shirts', subcategoryItems: [{ name: 'Casual Shirts' }, { name: 'Dress Shirts' }, { name: 'T-Shirts' }, { name: 'Polo Shirts' }] },
      ],
    },
    {
      name: 'Electronics',
      subcategories: [
        { name: 'Mobile Phones & Accessories', subcategoryItems: [{ name: 'Smartphones' }, { name: 'Cases & Covers' }, { name: 'Screen Protectors' }] },
        { name: 'Computers & Accessories', subcategoryItems: [{ name: 'Laptops' }, { name: 'Desktops' }, { name: 'Monitors' }] },
      ],
    },
  ], []);

  const handleInputClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSubAnchorEl(null);
    setSubSubAnchorEl(null);
    setActiveCategoryPath([]); // Reset active path when opening
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubAnchorEl(null);
    setSubSubAnchorEl(null);
    setActiveCategoryPath([]);
  };

  const handleCategoryClick = (event, category) => {
    const newPath = [category];
    setActiveCategoryPath(newPath);
    setSubAnchorEl(event.currentTarget);
    setSubSubAnchorEl(null);
  };

  const handleSubcategoryClick = (event, subcategory) => {
    const newPath = [...activeCategoryPath, subcategory];
    setActiveCategoryPath(newPath);
    setSubSubAnchorEl(event.currentTarget);
  };

  const handleSelect = (item) => {
    setInputValue(item.name);
    onCategorySelect(item);
    handleClose();
  };

  const getSubcategories = () => {
    if (activeCategoryPath.length > 0) {
      return activeCategoryPath[0].subcategories;
    }
    return [];
  };

  const getSubcategoryItems = () => {
    if (activeCategoryPath.length > 1) {
      return activeCategoryPath[1].subcategoryItems;
    }
    return [];
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        InputProps={{
          style: { backgroundColor: 'white', color: '#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px' },
        }}
        placeholder="Select a category"
        value={inputValue}
        onClick={handleInputClick}
        fullWidth
        readOnly
      />

      {/* First Level Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { width: '300px' } }}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={index}
            onClick={(event) => handleCategoryClick(event, category)}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {category.name}
            {category.subcategories.length > 0 && <ChevronRightIcon />}
          </MenuItem>
        ))}
      </Menu>

      {/* Second Level Menu */}
      <Menu
        anchorEl={subAnchorEl}
        open={Boolean(subAnchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { width: '300px' } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {getSubcategories().map((subcategory, index) => (
          <MenuItem
            key={index}
            onClick={(event) => handleSubcategoryClick(event, subcategory)}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {subcategory.name}
            {subcategory.subcategoryItems.length > 0 && <ChevronRightIcon />}
          </MenuItem>
        ))}
      </Menu>

      {/* Third Level Menu */}
      <Menu
        anchorEl={subSubAnchorEl}
        open={Boolean(subSubAnchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { width: '300px' } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {getSubcategoryItems().map((item, index) => (
          <MenuItem key={index} onClick={() => handleSelect(item)}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SymMultiLevelSelect;
