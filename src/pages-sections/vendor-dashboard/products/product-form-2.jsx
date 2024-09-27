import React, { useState } from "react";
import { Autocomplete, TextField, Menu, MenuItem, Box, Card, Typography, Button, Grid, Tooltip, IconButton, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import SymTextField from './components/SymTextField';
import styles from './styles';  // Import the styles
import { FlexBox } from "../../../components/flex-box"; 
import DropZone from "../../../components/DropZone";
import { UploadImageBox, StyledClear } from "../styles"; // FORM FIELDS VALIDATION SCHEMA
import { InfoOutlined } from "@mui/icons-material";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";

const SortableItem = SortableElement(({ file, index, handleFileDelete }) => (
  <UploadImageBox key={index}>
    <Box component="img" src={file.preview} width="100%" />
    <StyledClear onClick={() => handleFileDelete(file)} />
  </UploadImageBox>
));

// SortableList for wrapping the images
const SortableList = SortableContainer(({ files, handleFileDelete }) => {
  return (
    <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
      {files.map((file, index) => (
        <SortableItem key={`item-${index}`} index={index} file={file} handleFileDelete={handleFileDelete} />
      ))}
    </FlexBox>
  );
});

const VALIDATION_SCHEMA = yup.object().shape({
  name: yup.string().required("Name is required!"),
  category: yup.array().min(1).required("Category is required!"),
  description: yup.string().required("Description is required!"),
  status: yup.string().required("Status is required!"),
});

const ProductForm2 = props => {
  const { initialValues, handleFormSubmit } = props;
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

  // Function to handle reordering of images
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setFiles((prevFiles) => arrayMove(prevFiles, oldIndex, newIndex));
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
          <Grid container spacing={3} sx={styles.gridContainer}>
            
            {/*Left Card STARTS*/}
            <Grid item sm={8} xs={12}>
              <Card sx={styles.leftCard}>
                <Grid container spacing={3}>
                  {/* Bullet Points 1 */}
                  <Grid item sm={12} xs={12}>
                    <SymTextField
                      label="Bullet Points"
                      name="bulletPoints"
                      placeholder="Begin listing key bullet points describing your product for customers to quickly view"
                      value={values.bulletPoints}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.bulletPoints && !!errors.bulletPoints}
                      helperText={touched.bulletPoints && errors.bulletPoints}
                      multiline={true}
                    />
                  </Grid>

                  {/* Bullet Points 2 */}
                  <Grid item sm={12} xs={12}>
                    <SymTextField
                      label="Bullet Points"
                      name="bulletPoints"
                      placeholder="Describe washing instructions for product"
                      value={values.bulletPoints}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.bulletPoints && !!errors.bulletPoints}
                      helperText={touched.bulletPoints && errors.bulletPoints}
                    />
                  </Grid>

                  {/* Composition */}
                  <Grid item sm={12} xs={12}>
                    <SymTextField
                      label="Composition"
                      name="composition"
                      placeholder="Describe material and any unique specifications for product"
                      value={values.composition}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.composition && !!errors.composition}
                      helperText={touched.composition && errors.composition}
                    />
                  </Grid>

                  {/* IMAGE */}
                  <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#fff', mr: 1 }}>
                          Product Images
                        </Typography>
                        <Tooltip title="Choose a category for the product">
                          <IconButton>
                            <InfoOutlined sx={{ color: '#fff', fontSize: 16 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    <DropZone onChange={files => handleChangeDropZone(files)} />
                    <SortableList files={files} handleFileDelete={handleFileDelete} onSortEnd={onSortEnd} axis="xy" />


                    {/* <FlexBox flexDirection="row" mt={2} flexWrap="wrap" gap={1}>
                      {files.map((file, index) => {
                        return (
                          <UploadImageBox key={index}>
                            <Box component="img" src={file.preview} width="100%" />
                            <StyledClear onClick={handleFileDelete(file)} />
                          </UploadImageBox>);
                      })}
                    </FlexBox> */}
                  </Grid>


                </Grid>
              </Card>
            </Grid>

            {/*RIGHT CARD START*/}
            <Grid item sm={4} xs={12}>
              <Card sx={styles.rightCard}>
                <Typography sx={styles.statusTypography}>
                  Status
                </Typography>
                <Grid container spacing={3}>
                  <Grid item sm={12} xs={12}>
                    <TextField
                      select
                      fullWidth
                      color="info"
                      size="medium"
                      name="status"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.status}
                      label=""
                      InputProps={{ style: { backgroundColor: 'white' } }}
                      SelectProps={{ multiple: false }}
                      error={!!touched.status && !!errors.status}
                      helperText={touched.status && errors.status}
                    >
                      <MenuItem value="draft">Draft</MenuItem>
                      <Tooltip title="This option is currently disabled" arrow placement="right">
                        <span>
                          <MenuItem value="active" disabled>
                            Active
                          </MenuItem>
                        </span>
                      </Tooltip>
                    </TextField>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            {/*RIGHT CARD ENDS*/}

          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default ProductForm2;
