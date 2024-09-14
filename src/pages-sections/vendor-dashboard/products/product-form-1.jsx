import { useState } from "react";
import { Autocomplete, TextField, MenuItem, Box, Card, Typography, Button, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Tooltip, IconButton, Paper, Chip, Dialog, DialogTitle,  DialogContent, DialogActions, } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { styled } from '@mui/material/styles';
import { MuiColorInput } from 'mui-color-input'

// import DropZone from "../../../components/DropZone";
// import { FlexBox } from "../../../components/flex-box";
// import { UploadImageBox, StyledClear } from "../styles";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FlexBox } from "../../../components/flex-box";

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.array().min(1).required("Category is required!"),
  description: yup.string().required("Description is required!"),
  status: yup.string().required("Status is required!")
});

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ProductForm1 = props => {
  const {
    initialValues,
    handleFormSubmit,
    handleNext,
    handleBack
  } = props;
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState('');
  const [chipData, setChipData] = useState([
    { key: 0, label: 'S' },
    { key: 1, label: 'M' },
    { key: 2, label: 'L' },
    { key: 3, label: 'XL' },
    { key: 4, label: 'XXL' },
  ]);
  const [chipData2, setChipData2] = useState([
    { key: 0, label: 'Red' },
    { key: 1, label: 'Blue' },
    { key: 2, label: 'Green' },
  ]);
  const [openDialog, setOpenDialog] = useState(false); // State to handle dialog visibility
  const [newColor, setNewColor] = useState('');

  const [color, setColor] = useState('#ffffff')

  const handleColorChange = (newValue) => {
    setColor(newValue)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeDropZone = files => {
    files.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(files);
  };

  const handleFileDelete = file => () => {
    setFiles(files => files.filter(item => item.name !== file.name));
  };

  const handleDelete = (chipToDelete, setChip) => () => {
    setChip((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleAddColor = () => {
    if (newColor.trim()) {
      setChipData2((prev) => [
        ...prev,
        { key: chipData2.length, label: newColor }
      ]);
    }
    handleDialogClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewColor('');
  };

  return <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={VALIDATION_SCHEMA}>
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
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1 }}>
                      Product Name
                    </Typography>
                    <Tooltip title="Enter the product's name">
                      <IconButton>
                        <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField InputProps={{ style: { backgroundColor: 'white', color: '#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px' }}} fullWidth name="name" color="info" size="medium" placeholder="Enter product name" value={values.name} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />

                </Grid>

                {/* Product Type */}
                <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
                  <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', gap: 5 }}>
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
                  </FormControl>
                </Grid>

                {/* Dimensions */}
                <Grid item sm={12} xs={12} sx={{ mt: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1 }}>
                      Dimensions
                    </Typography>
                    <Tooltip title="Specify the dimensions">
                      <IconButton>
                        <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <TextField InputProps={{ style: { backgroundColor: 'white', color: '#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px' }}} fullWidth name="dimensions" color="info" size="medium" placeholder="Enter dimensions" value={values.dimensions} onBlur={handleBlur} onChange={handleChange} error={!!touched.dimensions && !!errors.dimensions} helperText={touched.dimensions && errors.dimensions} />
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

                    <Autocomplete
                      disablePortal
                      options={[
                        { label: 'T-shirts' },
                        { label: 'Shirts' },
                        { label: 'Pants' },
                        { label: 'Dress' },
                        { label: 'Skirts' },
                        { label: "Shorts" },
                        { label: 'Jackets' },
                      ]}
                      sx={{ width: '100%' }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          fullWidth
                          size="medium"
                          name="category"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.category}
                          error={!!touched.category && !!errors.category}
                          helperText={touched.category && errors.category}
                          SelectProps={{multiple: false}}
                          placeholder="Select category"
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              backgroundColor: 'white',
                              color: '#000',
                              boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                              borderRadius: '8px',
                            },
                          }}
                        />
                      )}
                    />
                    <Autocomplete
                      disablePortal
                      options={[
                        { label: 'T-shirts' },
                        { label: 'Shirts' },
                        { label: 'Pants' },
                        { label: 'Dress' },
                        { label: 'Skirts' },
                        { label: "Shorts" },
                        { label: 'Jackets' },
                      ]}
                      sx={{ width: '100%' }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          fullWidth
                          size="medium"
                          name="subcategory"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.category}
                          error={!!touched.category && !!errors.category}
                          helperText={touched.category && errors.category}
                          SelectProps={{multiple: false}}
                          placeholder="Select subcategory"
                          InputProps={{
                            ...params.InputProps,
                            style: {
                              backgroundColor: 'white',
                              color: '#000',
                              boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                              borderRadius: '8px',
                            },
                          }}
                        />
                      )}
                    />
                  </Box>
                  
                  {/* <TextField select fullWidth size="medium" name="category" onBlur={handleBlur} SelectProps={{multiple: false}}  onChange={handleChange} value={values.category} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category} InputProps={{ style: { backgroundColor: 'white', color: '#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px' }}}>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="active">Draft</MenuItem>
                  </TextField> */}
                  


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
                          backgroundColor: 'white', // Set background color to white
                          color: 'black', // Set text color to black
                          borderRadius: '8px',
                          // boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                          border:'1px solid transparent'
                        }}
                      />
                    </FormControl>
                  </Grid>

                {/* Variant */}
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
                      <Paper sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0.5, m: 0, width:'500px' }} component="ul">
                        {chipData2.map((data) => {
                          return (
                            <ListItem key={data.key}>
                              <Chip
                                label={data.label}
                                onDelete={handleDelete(data, setChipData2)}
                                color="info"
                                variant="outlined"
                                sx={{color:'grey'}}
                              />
                            </ListItem>
                          );
                        })}
                      </Paper>
                      <Button onClick={handleOpenDialog} sx={{ color:'#fff', fontFamily:'Elemental End', textTransform:'lowercase', padding: '5px 20px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px'}} >
                        Add Color
                      </Button>
                    </Box>

                    {/* Size */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap:2 }}>
                      <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1, minWidth:'100px' }}>
                        Size
                      </Typography>
                      <Paper sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0.5, m: 0, width:'500px'  }} component="ul">
                        {chipData.map((data) => {
                          return (
                            <ListItem key={data.key}>
                              <Chip
                                label={data.label}
                                onDelete={handleDelete(data, setChipData)}
                                color="info"
                                variant="outlined"
                              />
                            </ListItem>
                          );
                        })}
                      </Paper>
                      <Button sx={{ color:'#fff', fontFamily:'Elemental End', textTransform:'lowercase', padding: '5px 20px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px'}} >
                        Add Size
                      </Button>
                    </Box>
                  </FlexBox>
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
                <TextField fullWidth label="" value={newColor} onChange={(e) => setNewColor(e.target.value)} placeholder="Enter a color" InputProps={{ style: { backgroundColor: 'white', color: '#000', borderRadius: '2px', },}} />

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
                <MuiColorInput fullWidth  format="hex" value={color} onChange={handleColorChange} InputProps={{ style: { backgroundColor: 'white', color: '#000', borderRadius: '2px', },}} />


                {/*Base colour*/}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#000' }}>
                    Base colour
                  </Typography>
                  <Tooltip title="Enter the product's name">
                    <IconButton>
                      <InfoOutlined sx={{ color: '#000', fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <TextField select fullWidth size="medium" name="category" onBlur={handleBlur} SelectProps={{multiple: false}}  onChange={handleChange} value={values.category} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category} InputProps={{ style: { backgroundColor: 'white', color: '#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px' }}}>
                  <MenuItem value="clothing">Red</MenuItem>
                  <MenuItem value="inactive">Blue</MenuItem>
                  <MenuItem value="active">Green</MenuItem>
                </TextField>

              </DialogContent>
              <DialogActions sx={{ width:'100%'}}>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button onClick={handleAddColor} variant="contained" color="info" type="submit" sx={{ fontFamily:'Elemental End', textTransform:'lowercase', padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}>
                  Add
                </Button>
              </DialogActions>
            </Box>
          </Dialog>


        </Grid>
      </form>
    )}
  </Formik>;
};

export default ProductForm1;
 
