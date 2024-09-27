import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  InputAdornment,
  tableCellClasses,
  Tooltip,
  IconButton 
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Import Info icon
import InfoIcon from '@mui/icons-material/Info'; // Import InfoIcon


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 2,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '& td, & th': {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(variant, price, salePrice, supply, cost, profit) {
  return { variant, price, salePrice, supply, cost, profit };
}

function generateVariants(colors, sizes) {
  const variants = [];

  if (sizes.length === 0) {
    colors.forEach((color) => {
      variants.push(createData(color, 0, 0, 1, 0, 0)); // Default supply = 1
    });
  } else if (colors.length === 0) {
    sizes.forEach((size) => {
      variants.push(createData(size, 0, 0, 1, 0, 0)); // Default supply = 1
    });
  } else {
    colors.forEach((color) => {
      sizes.forEach((size) => {
        const variant = `${color} - ${size}`;
        variants.push(createData(variant, 0, 0, 1, 0, 0)); // Default supply = 1
      });
    });
  }

  return variants;
}

function ProductVariantsTable({ colors, sizes }) {
  const [rows, setRows] = React.useState([]);
  const [price, setPrice] = React.useState('');

  React.useEffect(() => {
    const newRows = generateVariants(colors, sizes);
    setRows(newRows);
  }, [colors, sizes]);

  const [selected, setSelected] = React.useState([]);

  const handleSelectRow = (variant) => {
    const selectedIndex = selected.indexOf(variant);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, variant);
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleInputChange = (e, index, field) => {
    let value = e.target.value;
  
    // Remove non-numeric characters except the decimal
    value = value.replace(/[^\d.]/g, '');
  
    // Ensure valid decimal input
    const numericValue = parseFloat(value) || 0;
  
    // Update the rows state with the new value
    const updatedRows = [...rows];
    updatedRows[index][field] = numericValue;
    setRows(updatedRows);
  };
  
  const formatToTwoDecimals = (value) => {
    // Ensure the value is a valid number before applying toFixed
    if (!isNaN(value) && value !== '') {
      return parseFloat(value).toFixed(2);
    }
    return '0.00'; // Default to $0.00 if the value is not a valid number
  };
  
  

  const handleMasterInputChange = (e, field) => {
    const value = e.target.value;
    const updatedRows = rows.map((row) => ({
      ...row,
      [field]: value,
    }));
    setRows(updatedRows);
  };

  const isSelected = (variant) => selected.indexOf(variant) !== -1;

  const formatPrice = (value) => {
    if (!value) return '';
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
    return formattedValue;
  };

  const calculateProfit = (salePrice, cost, supply) => {
    return (salePrice - cost) * supply;
  };

  const columnWidth = '350px';

  // Add a condition to hide the table when colors and sizes are empty
  if (colors.length === 0 && sizes.length === 0) {
    return null; // Hide the table
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox" />
            <StyledTableCell sx={{ width: '30%', textAlign: 'left' }}>
              Variant
              <Tooltip title="Select the product variant">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: columnWidth }}>
              Price
              <Tooltip title="Enter the product price">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ minWidth: '150px' }}>
              Sale Price
              <Tooltip title="Enter the discounted sale price">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: columnWidth }}>
              Supply
              <Tooltip title="Enter the available supply">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: columnWidth }}>
              Cost
              <Tooltip title="Enter the product cost">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: columnWidth }}>
              Profit
              <Tooltip title="Calculated profit based on sale price and cost">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Master row */}
          <StyledTableRow>
            <StyledTableCell padding="checkbox" />
            <StyledTableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
              Master
            </StyledTableCell>

            {/* PRICE - MASTER*/}
            <StyledTableCell align="right">
              <TextField
                variant="outlined"
                size="small"
                value={price}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/[^0-9.]/g, '');
                  const decimalIndex = value.indexOf('.');
                  if (decimalIndex !== -1) {
                    value = value.substring(0, decimalIndex + 1) + value.substring(decimalIndex + 1).replace(/\./g, '').slice(0, 2);
                  }
                  setPrice(value);
                  handleMasterInputChange({ ...e, target: { ...e.target, value } }, 'price');
                }}
                fullWidth
                InputProps={{
                  style: { paddingLeft: '8px' },
                  startAdornment: (
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  inputMode: 'decimal',
                }}
              />
            </StyledTableCell>

            {/* SALE PRICE - MASTER*/}
            <StyledTableCell align="right">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => handleMasterInputChange(e, 'salePrice')}
                fullWidth
                InputProps={{
                  style: { paddingLeft: '8px' },
                  startAdornment: (
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  inputMode: 'decimal',
                }}
              />
            </StyledTableCell>

            {/* SUPPLY - MASTER*/}
            <StyledTableCell align="right">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => handleMasterInputChange(e, 'supply')}
                fullWidth
                InputProps={{ style: { padding: 0 } }}
              />
            </StyledTableCell>

            {/* COST - MASTER*/}
            <StyledTableCell align="right">
              <TextField
                variant="outlined"
                size="small"
                onChange={(e) => handleMasterInputChange(e, 'cost')}
                fullWidth
                InputProps={{
                  style: { paddingLeft: '8px' },
                  startAdornment: (
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  inputMode: 'decimal',
                }}
              />
            </StyledTableCell>

            {/* PROFIT - MASTER*/}
            <StyledTableCell align="right">
              <TextField
                variant="outlined"
                size="small"
                // value={formatPrice(calculateProfit(row.salePrice, row.cost, row.supply))} // Pass row.supply to calculateProfit
                fullWidth
                disabled
                InputProps={{
                  readOnly: true,
                  style: { paddingLeft: '8px' },
                  startAdornment: (
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                  ),
                }}
              />
            </StyledTableCell>
          </StyledTableRow>

          {/* Product rows */}
          {rows.map((row, index) => {
            const isItemSelected = isSelected(row.variant);
            return (
              <StyledTableRow key={row.variant} hover selected={isItemSelected} >
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onChange={() => handleSelectRow(row.variant)}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
                  {row.variant}
                </StyledTableCell>

                {/* Price */}
                <StyledTableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row.price} // Remove the $ for display
                    onChange={(e) => {
                      const value = e.target.value;
                      const formattedValue = value.replace(/[^0-9.]/g, '');
                      handleInputChange({ ...e, target: { ...e.target, value: formattedValue } }, index, 'price');
                    }}
                    fullWidth
                    InputProps={{
                      style: { paddingLeft: '8px' },
                      startAdornment: (
                        <InputAdornment position="start">
                          $
                        </InputAdornment>
                      ),
                    }}
                  />
                </StyledTableCell>


                {/* Sale Price */}
                <StyledTableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    // Format the salePrice with two decimal places, but store the raw value
                    value={row.salePrice}
                    onChange={(e) => handleInputChange(e, index, 'salePrice')}
                    onBlur={(e) => handleInputChange(e, index, 'salePrice')} // Optionally format onBlur as well
                    fullWidth
                    InputProps={{
                      style: { paddingLeft: '8px' },
                      startAdornment: (
                        <InputAdornment position="start">
                          $
                        </InputAdornment>
                      ),
                    }}
                  />
                </StyledTableCell>



                {/* Supply */}
                <StyledTableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row.supply}
                    onChange={(e) => handleInputChange(e, index, 'supply')}
                    fullWidth
                  />
                </StyledTableCell>

                {/* Cost */}
                <StyledTableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row.cost}
                    onChange={(e) => handleInputChange(e, index, 'cost')}
                    fullWidth
                    InputProps={{
                      style: { paddingLeft: '8px' },
                      startAdornment: (
                        <InputAdornment position="start">
                          $
                        </InputAdornment>
                      ),
                    }}
                  />
                </StyledTableCell>

                {/* Profit */}
                <StyledTableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={formatPrice(calculateProfit(row.salePrice, row.cost, row.supply)).replace('$', '')} // Pass row.supply to calculateProfit
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      style: { paddingLeft: '8px' },
                      startAdornment: (
                        <InputAdornment position="start">
                          $
                        </InputAdornment>
                      ),
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductVariantsTable;
