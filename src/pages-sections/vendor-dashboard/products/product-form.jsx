import { useState } from "react";

import { TextField, MenuItem, Box, Card, Typography, Button, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Container } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup"; // GLOBAL CUSTOM COMPONENTS
import {  } from '@mui/material';

import DropZone from "../../../components/DropZone";
import { FlexBox } from "../../../components/flex-box"; // STYLED COMPONENTS

import { UploadImageBox, StyledClear } from "../styles"; // FORM FIELDS VALIDATION SCHEMA

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.array().min(1).required("Category is required!"),
  description: yup.string().required("Description is required!"),
  // stock: yup.number().required("Stock is required!"),
  // price: yup.number().required("Price is required!"),
  // sale_price: yup.number().optional(),
  // tags: yup.string().required("Tags is required!"),
  status: yup.string().required("Status is required!")
}); // ================================================================

// ================================================================
const ProductForm = props => {
  const {
    initialValues,
    handleFormSubmit,
    handleNext,
    handleBack
  } = props;
  const [files, setFiles] = useState([]); // HANDLE UPDATE NEW IMAGE VIA DROP ZONE

  const handleChangeDropZone = files => {
    files.forEach(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setFiles(files);
  }; // HANDLE DELETE UPLOAD IMAGE


  const handleFileDelete = file => () => {
    setFiles(files => files.filter(item => item.name !== file.name));
  };

  const [value, setValue] = useState('');


  return <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={VALIDATION_SCHEMA}>
        {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
      }) => <form onSubmit={handleSubmit}>
              <Grid container spacing={3} sx={{pr:4}}>
                {/*Left Card*/}
                <Grid item sm={8} xs={12}>

                  {/*Card 1*/}
                  <Card sx={{ p: 6, background:'transparent' }}>
                    <Grid container spacing={3}>

                      {/*Title*/}
                      <Grid item sm={12} xs={12}>
                        <Typography sx={{fontFamily:'Elemental End', textTransform:'lowercase', color:'#fff', mb:1}}>
                          Product Name
                        </Typography>
                        <TextField InputProps={{ style: { backgroundColor: 'white', color:'#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px',  },}} fullWidth name="name" color="info" size="medium" placeholder="Enter product name" value={values.name} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
                      </Grid>

                      {/*Product Type*/}
                      <Grid item sm={12} xs={12} sx={{ mt:2.5 }}>
                        <FormControl sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', gap: 5 }}>
                          <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff' }}>
                            Product Type
                          </FormLabel>
                          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                            <FormControlLabel value="static" control={<Radio />} label="Static" />
                            <FormControlLabel value="dynamic" control={<Radio />} label="Dynamic" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>

                      {/*Dimensions*/}
                      <Grid item sm={12} xs={12} sx={{ mt:2.5 }}>
                        <Box sx={{ display:'flex', width:'100%', gap:5, alignItems:'center'}}>
                          <Typography sx={{fontFamily:'Elemental End', textTransform:'lowercase', color:'#fff', mb:1}}>
                            Dimensions
                          </Typography>
                          <TextField InputProps={{ style: { backgroundColor: 'white', color:'#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px',  },}} fullWidth name="name" color="info" size="medium" placeholder="Enter product name" value={values.name} onBlur={handleBlur} onChange={handleChange} error={!!touched.name && !!errors.name} helperText={touched.name && errors.name} />
                        </Box>
                      </Grid>

                      {/*Category*/}
                      <Grid item sm={12} xs={12} sx={{ mt:2.5 }}>
                        <Box sx={{ display:'flex', width:'100%', gap:5, alignItems:'center'}}>
                          <Typography sx={{fontFamily:'Elemental End', textTransform:'lowercase', color:'#fff', mb:1}}>
                            Category
                          </Typography>
                          <TextField select fullWidth size="medium" name="category" onBlur={handleBlur} placeholder="Category" onChange={handleChange} value={values.category} label="Select Category" SelectProps={{ multiple: false}} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category} InputProps={{ style: { backgroundColor: 'white', color:'#000', boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)', borderRadius: '8px' },}}>
                            <MenuItem value="clothing">Clothing</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                            <MenuItem value="active">Draft</MenuItem>
                          </TextField>
                        </Box>
                      </Grid>

                      {/*Description*/}
                      <Grid item xs={12} sx={{ mt:2.5 }}>
                        <FormControl sx={{ width: '100%' }}>
                          <FormLabel sx={{ mb: 1, fontFamily:'Elemental End', textTransform:'lowercase', color:'#fff' }}>
                            Description
                          </FormLabel>
                          <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={setValue}
                            style={{ height: '200px', border: '1px solid #ccc' }}
                          />
                        </FormControl>
                        {/* <TextField InputProps={{ style: { backgroundColor: 'white', color:'#000' },}} rows={6} multiline fullWidth color="info" size="medium" name="description" onBlur={handleBlur} onChange={handleChange} placeholder="Enter description" value={values.description} error={!!touched.description && !!errors.description} helperText={touched.description && errors.description} /> */}
                      </Grid>

                      {/*File Upload*/}
                      {/* <Grid item xs={12}>
                        <DropZone onChange={files => handleChangeDropZone(files)} />

                        <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                          {files.map((file, index) => {
                        return <UploadImageBox key={index}>
                                <Box component="img" src={file.preview} width="100%" />
                                <StyledClear onClick={handleFileDelete(file)} />
                              </UploadImageBox>;
                      })}
                        </FlexBox>
                      </Grid> */}

                        {/*Product type*/}
                      {/* <Grid item sm={12} xs={12}>
                        <TextField select fullWidth color="info" size="medium" name="category" onBlur={handleBlur} placeholder="Product Type" onChange={handleChange} value={values.category} label="Product Type" SelectProps={{ multiple: true }} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
                          <MenuItem value="electronics">Electronics</MenuItem>
                          <MenuItem value="fashion">Fashion</MenuItem>
                        </TextField>
                      </Grid> */}
                      

                      {/*Category*/}
                      {/* <Grid item sm={12} xs={12}>
                        <TextField select fullWidth color="info" size="medium" name="category" onBlur={handleBlur} placeholder="Category" onChange={handleChange} value={values.category} label="Category" SelectProps={{
                      multiple: true
                    }} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
                          <MenuItem value="electronics">Electronics</MenuItem>
                          <MenuItem value="fashion">Fashion</MenuItem>
                        </TextField>
                      </Grid> */}

                      {/*SubCategory*/}
                      {/* <Grid item sm={12} xs={12}>
                        <TextField select fullWidth color="info" size="medium" name="subcategory" onBlur={handleBlur} placeholder="Category" onChange={handleChange} value={values.category} label="SubCategory" SelectProps={{
                      multiple: true
                    }} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
                          <MenuItem value="electronics">Electronics</MenuItem>
                          <MenuItem value="fashion">Fashion</MenuItem>
                        </TextField>
                      </Grid> */}

                      {/*SubCategory Item*/}
                      {/* <Grid item sm={12} xs={12}>
                        <TextField select fullWidth color="info" size="medium" name="subcategoryItem" onBlur={handleBlur} placeholder="Category" onChange={handleChange} value={values.category} label="SubCategory Item" SelectProps={{
                      multiple: true
                    }} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
                          <MenuItem value="electronics">Electronics</MenuItem>
                          <MenuItem value="fashion">Fashion</MenuItem>
                        </TextField>
                      </Grid> */}

                    </Grid>
                  </Card>

                  {/*Card 2 : Pricing */}
                  {/* <Card sx={{ p: 6, mt:5 }}>
                    <Typography sx={{ fontFamily: 'Helvetica', fontSize: 14, fontWeight: 'bold', pb:2 }} >
                      Pricing
                    </Typography>

                    <Grid container spacing={3}>
                      
                      <Grid item sm={6} xs={12}> //Regular price
                        <TextField fullWidth name="price" color="info" size="medium" type="number" onBlur={handleBlur} value={values.price} label="Regular Price" onChange={handleChange} placeholder="Regular Price" error={!!touched.price && !!errors.price} helperText={touched.price && errors.price} />
                      </Grid>


                      <Grid item sm={6} xs={12}> //Sale Price
                        <TextField fullWidth color="info" size="medium" type="number" name="sale_price" label="Sale Price" onBlur={handleBlur} onChange={handleChange} placeholder="Sale Price" value={values.sale_price} error={!!touched.sale_price && !!errors.sale_price} helperText={touched.sale_price && errors.sale_price} />
                      </Grid>

                    </Grid>
                    <Grid container spacing={1} sx={{mt:2}}>

                      <Grid item sm={4} xs={12}> //Cost per item
                        <TextField fullWidth name="price" color="info" size="medium" type="number" onBlur={handleBlur} value={values.price} label="Cost per item" onChange={handleChange} placeholder="Cost per item" error={!!touched.price && !!errors.price} helperText={touched.price && errors.price} />
                      </Grid>

                      <Grid item sm={4} xs={12}> //Profit
                        <TextField fullWidth color="info" size="medium" type="number" name="sale_price" label="Profit" onBlur={handleBlur} onChange={handleChange} placeholder="Profit" value={values.sale_price} error={!!touched.sale_price && !!errors.sale_price} helperText={touched.sale_price && errors.sale_price} />
                      </Grid>

                       <Grid item sm={4} xs={12}> //Margin
                        <TextField fullWidth color="info" size="medium" type="number" name="sale_price" label="Margin" onBlur={handleBlur} onChange={handleChange} placeholder="Margin" value={values.sale_price} error={!!touched.sale_price && !!errors.sale_price} helperText={touched.sale_price && errors.sale_price} />
                      </Grid>

                    </Grid>
                  </Card> */}

                  {/*Card 3 : Product Variants*/}
                   {/* <Card sx={{ p: 6, mt:5 }}>
                   <Typography sx={{ fontFamily: 'Helvetica', fontSize: 14, fontWeight: 'bold', pb:2 }} >
                      Product Variants
                    </Typography>

                    <Grid container spacing={3}>
                      
                      <Grid item sm={12} xs={12}> //Color
                        <TextField fullWidth name="stock" color="info" size="medium" label="Color" placeholder="Color" onBlur={handleBlur} value={values.stock} onChange={handleChange} error={!!touched.stock && !!errors.stock} helperText={touched.stock && errors.stock} />
                      </Grid>

                      <Grid item sm={12} xs={12}> //Size
                        <TextField fullWidth name="tags" label="Size" color="info" size="medium" placeholder="Size" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
                      </Grid>

                      <Grid item sm={12} xs={12}> //Material
                        <TextField fullWidth name="tags" label="Material" color="info" size="medium" placeholder="Material" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
                      </Grid>

                      <Grid item sm={12} xs={12}> //Dimension
                        <TextField fullWidth name="tags" label="Dimension" color="info" size="medium" placeholder="Dimension" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
                      </Grid>

                      <Grid item sm={12} xs={12}> //Insurance
                        <TextField fullWidth name="tags" label="Insurance" color="info" size="medium" placeholder="Insurance" onBlur={handleBlur} value={values.tags} onChange={handleChange} error={!!touched.tags && !!errors.tags} helperText={touched.tags && errors.tags} />
                      </Grid>

                      <Grid item sm={12} xs={12}>
                        <Button variant="contained" color="info" type="submit">
                          Save product
                        </Button>
                      </Grid>
                    </Grid>
                  </Card> */}


                </Grid>

                {/*Right Card*/}
                <Grid item sm={4} xs={12}>
                  <Card sx={{ mt:2, p: 4, background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)',  borderRadius: '15px'   }}>
                    <Typography sx={{ fontFamily: 'Elemental End', textTransform:'lowercase', color:'#fff', fontSize: 14, pb:2 }} >
                      Status
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item sm={12} xs={12}>
                        <TextField select fullWidth color="info" size="medium" name="status" onBlur={handleBlur} placeholder="Status" onChange={handleChange} value={values.status} label="Select Status" SelectProps={{multiple: false}} error={!!touched.category && !!errors.category} helperText={touched.category && errors.category}>
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="inactive">Inactive</MenuItem>
                          <MenuItem value="draft">Draft</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>
                  </Card>

                </Grid>
              </Grid>

              <Container>
                <Box sx={{ display:'flex', justifyContent:'end', gap:1}}>
                  <Button onClick={handleBack} variant="contained" color="info" type="submit" sx={{ fontFamily:'Elemental End', textTransform:'lowercase', padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}>
                    Back
                  </Button>
                  <Button onClick={handleNext} variant="contained" color="info" type="submit" sx={{ fontFamily:'Elemental End', textTransform:'lowercase', padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}>
                    Next
                  </Button>
                </Box>
              </Container>
              
          </form>}
      </Formik>;
};

export default ProductForm;