import React, { useState } from "react";
import { Autocomplete, TextField, Menu, MenuItem, Box, Card, Typography, Button, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Tooltip, IconButton, Chip, Dialog, DialogTitle,  DialogContent, DialogActions, } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";

import { MuiColorInput } from 'mui-color-input'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FlexBox } from "../../../components/flex-box";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProductVariantsTable from './components/product-variants';
import SymTextField from './components/SymTextField';
import SymRadioButton from './components/SymRadioButton';

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.array().min(1).required("Category is required!"),
  description: yup.string().required("Description is required!"),
  status: yup.string().required("Status is required!")
});

const baseColors = [
  { name: 'Red', hex: '#f44336' },
  { name: 'Blue', hex: '#2196f3' },
  { name: 'Green', hex: '#4caf50' },
];

const baseSizes = [
  { name: 'S' },
  { name: 'M' },
  { name: 'L' },,
  { name: 'XL' },
  { name: 'XXL' },
];

const ageGroups = [
  { name: '0-6 months'   },
  { name: '6-12 months'  },
  { name: 'Adults' },
  { name: 'All ages' },
];

const genders = [
  { name: 'Male'   },
  { name: 'Female' },
  { name: 'Unisex' },
];

const ProductForm1 = props => {
  const { initialValues, handleFormSubmit } = props;

  const [value, setValue] = useState('');
  const [chipData2, setChipData2] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // State to handle dialog visibility
  const [newColor, setNewColor] = useState('');

  const [color, setColor] = useState('#ffffff');
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
 
  const handleAddCustomColor = () => {
    if (newColor && color) {
      const customColor = { name: newColor, hex: color };
      setChipData2((prevChipData) => [
        ...prevChipData,
        customColor
      ]);
      // Also update selectedColors for Autocomplete
      setSelectedColors((prevSelected) => [
        ...prevSelected,
        customColor
      ]);
      handleDialogClose();
    }
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewColor('');
    setColor('#ffffff');
  };


  const handleColorChange = (newColor) => {
    setColor(newColor);
  };
  
  const handleBaseColorChange = (event) => {
    const selectedColor = baseColors.find(color => color.name === event.target.value);
    if (selectedColor) {
      setColor(selectedColor.hex);
    }
  };


  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={VALIDATION_SCHEMA}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} sx={{pr: 4}}>
            
            {/*Left Card STARTS*/}
            <Grid item sm={8} xs={12}>
              <Card sx={{ p: 6, background: 'transparent' }}>
                <Grid container spacing={3}>

                  {/* Product Name */}
                  <Grid item sm={12} xs={12}>
                    <SymTextField
                      label="Product Name"
                      name="name"
                      placeholder="Enter product name"
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>

                  {/* Product Type */}
                  <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
                    <SymRadioButton
                        label="Product Type"
                        name="productType"
                        id="product-type-label"
                        value="static"
                        options={[
                          { value:"static", label:"Static" },
                          { value:"dynamic", label:"Dynamic" },
                        ]}
                    />
                    {/* <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', gap: 5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormLabel id="product-type-label" sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff' }}>
                          Product Type
                        </FormLabel>
                        <Tooltip title="Select the product type">
                          <IconButton>
                            <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <RadioGroup row aria-labelledby="product-type-label" name="productType">
                        <FormControlLabel value="static" control={<Radio />} label="Static" />
                        <FormControlLabel value="dynamic" control={<Radio />} label="Dynamic" />
                      </RadioGroup>
                    </FormControl> */}
                  </Grid>

                  {/* Dimensions */}
                  <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
                    <SymTextField
                      label="Dimensions"
                      name="dimensions"
                      placeholder="Enter dimensions"
                      value={values.dimensions}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.dimensions && !!errors.dimensions}
                      helperText={touched.dimensions && errors.dimensions}
                    />
                  </Grid>

                  {/* Category */}
                  <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap:2  }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', minWidth:'250px' }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1 }}>
                          Product Category
                        </Typography>
                        <Tooltip title="Choose a category for the product">
                          <IconButton>
                            <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>

                      <MultiLevelAutocomplete />
                    </Box>
 
                  </Grid>

                  {/* Category Tags */}
                  <Grid item sm={12} xs={12} sx={{ mt: 5 }}>
                    <FlexBox gap={1} flexDirection="column">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1 }}>
                          Category Tags
                        </Typography>
                        <Tooltip title="Choose a category for the product">
                          <IconButton>
                            <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    
                      {/* Age group */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap:2 }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1, minWidth:'100px' }}>
                          Age group
                        </Typography>
                        <Autocomplete 
                          multiple
                          freeSolo 
                          options={ageGroups.map((option) => option.name)} value={selectedAgeGroup.map((ageGroup) => ageGroup.name)}
                          onChange={(event, newValue) => {
                            const updatedAgeGroups = newValue.map((name) => {
                              const ageGroupObj = ageGroups.find((ageGroup) => ageGroup.name === name) ||
                                              chipData2.find((ageGroup) => ageGroup.name === name);
                              return ageGroupObj || { name };
                            });
                            setSelectedAgeGroup(updatedAgeGroups);
                          }}
                          renderTags={(value, getTagProps) =>
                            selectedAgeGroup.map((option, index) => (
                              <Chip
                                label={option.name}
                                {...getTagProps({ index })}
                                onDelete={getTagProps({ index }).onDelete}
                                color="info"
                                variant="outlined"
                                sx={{ color: 'grey' }}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Select Age group"
                              sx={{ width: '500px' }}
                              InputProps={{
                                ...params.InputProps,
                                style: {
                                  backgroundColor: 'white',
                                },
                              }}
                              InputLabelProps={{
                                style: { color: 'black' },
                              }}
                            />
                          )}
                        />
                      </Box>
                      
                      {/* Gender */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap:2 }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1, minWidth:'100px' }}>
                            Gender
                        </Typography>
                        <Autocomplete 
                          multiple
                          freeSolo
                          options={genders.map((option) => option.name)} value={selectedGender.map((gender) => gender.name)}
                          onChange={(event, newValue) => {
                            const updatedGenders = newValue.map((name) => {
                              const genderObj = genders.find((gender) => gender.name === name) ||
                                              chipData2.find((gender) => gender.name === name);
                              return genderObj || { name };
                            });
                            setSelectedGender(updatedGenders);
                          }}
                          renderTags={(value, getTagProps) =>
                            selectedGender.map((option, index) => (
                              <Chip
                                label={option.name}
                                {...getTagProps({ index })}
                                onDelete={getTagProps({ index }).onDelete}
                                color="info"
                                variant="outlined"
                                sx={{ color: 'grey' }}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Select Gender"
                              sx={{ width: '500px' }}
                              InputProps={{
                                ...params.InputProps,
                                style: {
                                  backgroundColor: 'white',
                                },
                              }}
                              InputLabelProps={{
                                style: { color: 'black' },
                              }}
                            />
                          )}
                        />

                      </Box>
                    </FlexBox>
                  </Grid>


                  {/* Description */}
                    <Grid item xs={12} sx={{ mt: 2.5 }}>
                      <FormControl sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <FormLabel sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1, }}>
                            Description
                          </FormLabel>
                          <Tooltip title="Provide a detailed description of the product">
                            <IconButton>
                              <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <ReactQuill
                          theme="snow"
                          value={value}
                          onChange={setValue}
                          style={{ height: '150px',
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: '8px',
                            border:'1px solid transparent'
                          }}
                        />
                      </FormControl>
                    </Grid>

                  {/* Product Variant */}
                  <Grid item sm={12} xs={12} sx={{ mt: 5 }}>
                    <FlexBox gap={1} flexDirection="column">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1 }}>
                          Product Variant
                        </Typography>
                        <Tooltip title="Choose a category for the product">
                          <IconButton>
                            <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    
                      {/* Colour */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap:2 }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1, minWidth:'100px' }}>
                          Colour
                        </Typography>
                        <Autocomplete
                          multiple
                          freeSolo
                          options={baseColors.map((option) => option.name)} // Options as array of strings
                          value={selectedColors.map((color) => color.name)} // Use only names as value for Autocomplete
                          onChange={(event, newValue) => {
                            const updatedColors = newValue.map((name) => {
                              const colorObj = baseColors.find((color) => color.name === name) ||
                                              chipData2.find((color) => color.name === name); // Handle custom colors
                              return colorObj || { name, hex: '' }; // Handle custom (freeSolo) entries
                            });
                            setSelectedColors(updatedColors); // Update the full color objects
                          }}
                          renderTags={(value, getTagProps) =>
                            selectedColors.map((option, index) => (
                              <Chip
                                label={
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Box
                                      sx={{
                                        width: 18,
                                        height: 18,
                                        borderRadius: '50%',
                                        bgcolor: option.hex || 'transparent', // Use hex color
                                        marginRight: 1,
                                      }}
                                    />
                                    {option.name} {/* Display color name */}
                                  </Box>
                                }
                                {...getTagProps({ index })}
                                onDelete={getTagProps({ index }).onDelete}
                                color="info"
                                variant="outlined"
                                sx={{ color: 'grey' }}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Select Colors"
                              sx={{ width: '500px' }}
                              InputProps={{
                                ...params.InputProps,
                                style: {
                                  backgroundColor: 'white',
                                },
                              }}
                              InputLabelProps={{
                                style: { color: 'black' },
                              }}
                            />
                          )}
                        />
                        <Button onClick={handleOpenDialog} sx={{ color:'#fff', fontFamily:'Elemental End', textTransform:'lowercase', padding: '5px 20px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px'}} >
                          Custom Color
                        </Button>
                      </Box>
                      {/**/}
                      
                      {/* Size */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap:2 }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1, minWidth:'100px' }}>
                          Size
                        </Typography>
                        <Autocomplete
                          multiple
                          freeSolo
                          options={baseSizes.map((option) => option.name)} // Options as array of strings
                          value={selectedSizes.map((size) => size.name)} // Use only names as value for Autocomplete
                          onChange={(event, newValue) => {
                            const updatedSizes = newValue.map((name) => {
                              const sizeObj = baseSizes.find((size) => size.name === name) ||
                                              chipData2.find((size) => size.name === name); // Handle custom sizes
                              return sizeObj || { name, hex: '' }; // Handle custom (freeSolo) entries
                            });
                            setSelectedSizes(updatedSizes); // Update the full size objects
                          }}
                          renderTags={(value, getTagProps) =>
                            selectedSizes.map((option, index) => (
                              <Chip
                                label={option.name}
                                {...getTagProps({ index })}
                                onDelete={getTagProps({ index }).onDelete}
                                color="info"
                                variant="outlined"
                                sx={{ color: 'grey' }}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              placeholder="Select Sizes"
                              sx={{ width: '500px' }}
                              InputProps={{
                                ...params.InputProps,
                                style: {
                                  backgroundColor: 'white',
                                },
                              }}
                              InputLabelProps={{
                                style: { color: 'black' },
                              }}
                            />
                          )}
                        />
                        <Button sx={{ color:'#fff', fontFamily:'Elemental End', textTransform:'lowercase', padding: '5px 20px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px'}} >
                          Custom Size
                        </Button>
                      </Box>
                    </FlexBox>
                  </Grid>
                 
                  <Grid item sm={12} xs={12} sx={{ mt: 5 }}>
                    <ProductVariantsTable />
                  </Grid>

                  

                </Grid>
              </Card>
            </Grid>

            {/*RIGHT CARD START*/}
            <Grid item sm={4} xs={12}>
              <Card sx={{ mt:2, p: 4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)',  borderRadius: '15px'   }}>
                <Typography sx={{ fontFamily: 'Elemental End', textTransform:'lowercase', color:'#fff', fontSize: 14, pb:2 }} >
                  Status
                </Typography>
                <Grid container spacing={3}>
                  <Grid item sm={12} xs={12}>
                    <TextField select fullWidth color="info"
                      size="medium"
                      name="status"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.status}
                      label=""
                      InputProps={{ style: { backgroundColor: 'white',}}}
                      SelectProps={{ multiple: false }}
                      error={!!touched.status && !!errors.status}
                      helperText={touched.status && errors.status}
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="active" disabled>Active</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            {/*RIGHT CARD ENDS*/}

            {/* Dialog for adding new color */}
            <Dialog open={openDialog} onClose={handleDialogClose} PaperProps={{ sx: { background: "rgba(255, 255, 255, 0.4)", boxShadow: "inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10.0285px)", borderRadius: "80px",  width: "1039px", }, }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: "20px 46px", gap: "5px", background: "rgba(188, 188, 188, 0.1)", boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)", backdropFilter: "blur(50px)" }}>
                <DialogTitle sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#000' }}>Color selection</DialogTitle>
                <DialogContent sx={{ width:'100%', px:0 }}>
                  
                  {/*Color name*/}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#000' }}>
                        Color name
                      </Typography>
                      <Tooltip title="Enter the product's name">
                        <IconButton>
                          <InfoOutlined sx={{ color: '#000', fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                  </Box>
                  <TextField fullWidth label="" value={newColor} onChange={(e) => setNewColor(e.target.value)} h="Enter a color" InputProps={{ style: { backgroundColor: 'white', color: '#000', borderRadius: '2px', },}} />

                  {/*Colour*/}
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#000' }}>
            Color
          </Typography>
          <Tooltip title="Enter the product's name">
            <IconButton>
              <InfoOutlined sx={{ color: '#000', fontSize: 16 }} />
            </IconButton>
          </Tooltip>
                  </Box>
                  <MuiColorInput
                    fullWidth
                    format="hex"
                    value={color}
                    onChange={handleColorChange}
                    InputProps={{
                      style: {
                        backgroundColor: 'white',
                        color: '#000',
                        borderRadius: '2px',
                      },
                    }}
                  />


                  {/*Base colour*/}
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#000' }}>
            Base color
          </Typography>
          <Tooltip title="Select a base color">
            <IconButton>
              <InfoOutlined sx={{ color: '#000', fontSize: 16 }} />
            </IconButton>
          </Tooltip>
                  </Box>
                  <TextField
                    select
                    fullWidth
                    size="medium"
                    onChange={handleBaseColorChange} // Update color when a base color is selected
                    InputProps={{
                      style: {
                        backgroundColor: 'white',
                        color: '#000',
                        boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                        borderRadius: '8px',
                      },
                    }}
                  >
                    {baseColors.map((baseColor) => (
                      <MenuItem key={baseColor.name} value={baseColor.name}>
                        {baseColor.name}
                      </MenuItem>
                    ))}
                  </TextField>

                </DialogContent>
                <DialogActions sx={{ width:'100%'}}>
                  <Button onClick={handleDialogClose}>Cancel</Button>
                  <Button onClick={handleAddCustomColor} variant="contained" color="info" type="submit" sx={{ fontFamily:'Elemental End', textTransform:'lowercase', padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}>
                    Add
                  </Button>
                </DialogActions>
              </Box>
            </Dialog>

          </Grid>
        </form>
      )}
    </Formik>
  );
};


const categories = [
  {
    name: 'Clothing, Shoes & Accessories',
    subcategories: [
      { name: 'Dresses', subcategoryItems: [{ name: 'Casual Dresses' }, { name: 'Formal Dresses' }, { name: 'Tank tops' }, { name: 'Summer Dresses' }] },
      { name: 'Tops', subcategoryItems: [{ name: 'Blouses' }, { name: 'T-Shirts' }, { name: 'Tank tops' }, { name: 'Sweaters' }, { name: 'Cardigans' }] },
      { name: 'Shirts', subcategoryItems: [{ name: 'Casual Shirts' }, { name: 'Dress Shirts' }, { name: 'T-Shirts' }, { name: 'Polo Shirts' }] },
      // More subcategories here...
    ],
  },
  {
    name: 'Electronics',
    subcategories: [
      { name: 'Mobile Phones & Accessories', subcategoryItems: [{ name: 'Smartphones' }, { name: 'Cases & Covers' }, { name: 'Screen Protectors' }] },
      { name: 'Computers & Accessories', subcategoryItems: [{ name: 'Laptops' }, { name: 'Desktops' }, { name: 'Monitors' }] },
      // More subcategories here...
    ],
  },
];

const MultiLevelAutocomplete = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [subAnchorEl, setSubAnchorEl] = useState(null);
  const [subSubAnchorEl, setSubSubAnchorEl] = useState(null);
  const [activeSubcategories, setActiveSubcategories] = useState([]);
  const [activeItems, setActiveItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSubAnchorEl(null);
    setSubSubAnchorEl(null);
    setActiveSubcategories([]);
    setActiveItems([]);
  };

  const handleCategoryClick = (event, subcategories) => {
    setSubAnchorEl(event.currentTarget);
    setActiveSubcategories(subcategories);
    setSubSubAnchorEl(null);
  };

  const handleSubcategoryClick = (event, subcategoryItems) => {
    setSubSubAnchorEl(event.currentTarget);
    setActiveItems(subcategoryItems);
  };

  const handleSelect = (item) => {
    setInputValue(item);
    handleClose();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField InputProps={{ style: { backgroundColor: 'white', color: '#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px', }, }} label="" placeholder="Select a category" value={inputValue} onClick={handleInputClick} fullWidth readOnly />
      
      {/* First Level */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { width: '300px' } }}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={index}
            onClick={(event) => handleCategoryClick(event, category.subcategories)}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {category.name}
            {category.subcategories.length > 0 && <ChevronRightIcon />}
          </MenuItem>
        ))}
      </Menu>

      {/* Second Level */}
      <Menu
        anchorEl={subAnchorEl}
        open={Boolean(subAnchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { width: '300px' } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {activeSubcategories.map((subcategory, index) => (
          <MenuItem
            key={index}
            onClick={(event) => handleSubcategoryClick(event, subcategory.subcategoryItems)}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            {subcategory.name}
            {subcategory.subcategoryItems.length > 0 && <ChevronRightIcon />}
          </MenuItem>
        ))}
      </Menu>

      {/* Third Level */}
      <Menu
        anchorEl={subSubAnchorEl}
        open={Boolean(subSubAnchorEl)}
        onClose={handleClose}
        PaperProps={{ style: { width: '300px' } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        getContentAnchorEl={null} // Ensures the third level appears next to the second level
        style={{ marginLeft: '20px' }} // Ensure margin to the right
      >
        {activeItems.map((item, index) => (
          <MenuItem key={index} onClick={() => handleSelect(item.name)}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};


export default ProductForm1;
 
