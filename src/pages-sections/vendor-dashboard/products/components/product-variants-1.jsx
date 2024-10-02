import React, { useState, useEffect } from 'react';
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
  IconButton,
  Collapse,
  Box,
  TextField,
  tableCellClasses,
  Tooltip,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SymMoneyTextField from './SymMoneyTextField'; // Import your custom component
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Import Info icon

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

function createData(color, size, price, salePrice, supply, cost, profit) {
  return { color, size, price, salePrice, supply, cost, profit };
}

function groupVariantsByColor(variants) {
  const grouped = {};
  variants.forEach((variant) => {
    const { color } = variant;
    if (!grouped[color]) {
      grouped[color] = [];
    }
    grouped[color].push(variant);
  });
  return grouped;
}

function generateVariants(colors, sizes) {
  const variants = [];

  if (sizes.length === 0) {
    colors.forEach((color) => {
      variants.push(createData(color, null, '', '', 0, '', ''));
    });
  } else {
    colors.forEach((color) => {
      sizes.forEach((size) => {
        variants.push(createData(color, size, '', '', 0, '', ''));
      });
    });
  }

  return variants;
}

function ProductVariantsTable({ colors, sizes }) {
  const [rows, setRows] = useState([]);
  const [variantValues, setVariantValues] = useState({});
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState([]);
  const [masterValues, setMasterValues] = useState({
    price: '',
    salePrice: '',
    supply: 0,
    cost: '',
    profit: '',
  });

  useEffect(() => {
    const newRows = generateVariants(colors, sizes);
    setRows(newRows);

    const initialExpandedState = colors.reduce((acc, color) => {
      acc[color] = false;
      return acc;
    }, {});
    setExpanded(initialExpandedState);

    const initialVariantValues = newRows.reduce((acc, row) => {
      acc[`${row.color}-${row.size}`] = { ...row };
      return acc;
    }, {});
    setVariantValues(initialVariantValues);
  }, [colors, sizes]);

  const handleExpandClick = (color) => {
    setExpanded((prev) => ({
      ...prev,
      [color]: !prev[color],
    }));
  };

  const handleMasterChange = (field, value) => {
    setMasterValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  
    // Update the parent (first child in each color group)
    setRows((prevRows) =>
      prevRows.map((row) => {
        // Update all parent rows with the new master values
        const newRow = { ...row };
        newRow[field] = value;
        if (field === 'salePrice' || field === 'cost') {
          newRow.profit = parseFloat(newRow.salePrice || 0) - parseFloat(newRow.cost || 0);
        }
        return newRow;
      })
    );
  
    // Update the variant values for all rows
    setVariantValues((prevVariantValues) => {
      const updatedValues = { ...prevVariantValues };
      Object.keys(updatedValues).forEach((key) => {
        updatedValues[key] = { ...updatedValues[key], [field]: value };
        if (field === 'salePrice' || field === 'cost') {
          updatedValues[key].profit = parseFloat(updatedValues[key].salePrice || 0) - parseFloat(updatedValues[key].cost || 0);
        }
      });
      return updatedValues;
    });
  };
  

  const handleParentChange = (color, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.color === color) {
          const newRow = { ...row, [field]: value };
          if (field === 'salePrice' || field === 'cost') {
            newRow.profit = parseFloat(newRow.salePrice || 0) - parseFloat(newRow.cost || 0);
          }
          return newRow;
        }
        return row;
      })
    );
  
    setVariantValues((prevVariantValues) => {
      const updatedValues = { ...prevVariantValues };
      Object.keys(updatedValues).forEach((key) => {
        if (key.startsWith(`${color}-`)) {
          updatedValues[key] = { ...updatedValues[key], [field]: value };
          if (field === 'salePrice' || field === 'cost') {
            updatedValues[key].profit = parseFloat(updatedValues[key].salePrice || 0) - parseFloat(updatedValues[key].cost || 0);
          }
        }
      });
      return updatedValues;
    });
  };
  

  const handleVariantChange = (key, field, value) => {
    setVariantValues((prev) => {
      const updatedVariant = { ...prev[key], [field]: value };
      if (field === 'salePrice' || field === 'cost') {
        updatedVariant.profit = parseFloat(updatedVariant.salePrice || 0) - parseFloat(updatedVariant.cost || 0);
      }
      return {
        ...prev,
        [key]: updatedVariant,
      };
    });
  };

  const isSelected = (variant) => selected.indexOf(variant) !== -1;

  const groupedVariants = groupVariantsByColor(rows);

  // Calculate totals for each column
  const totalValues = {
    price: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.price || 0), 0),
    salePrice: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.salePrice || 0), 0),
    supply: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.supply || 0), 0),
    cost: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.cost || 0), 0),
    profit: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.profit || 0), 0),
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox" />
            <StyledTableCell sx={{ width: '200px', textAlign: 'left' }}>
              Variant
              <Tooltip title="Select the product variant">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '200px' }}>
              Price
              <Tooltip title="Select the product variant">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '200px' }}>
              Sale Price
              <Tooltip title="Select the product variant">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '200px' }}>
              Supply
              <Tooltip title="Select the product variant">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '200px' }}>
              Cost
              <Tooltip title="Select the product variant">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '200px' }}>
              Profit
              <Tooltip title="Select the product variant">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Master Row */}
          <StyledTableRow>
            <StyledTableCell>
              <strong>Total</strong>
            </StyledTableCell>
            <StyledTableCell>All Variants</StyledTableCell>
            <StyledTableCell align="right">
              <SymMoneyTextField
                value={masterValues.price}
                onChange={(e) => handleMasterChange('price', e.target.value)}
              />
            </StyledTableCell>
            <StyledTableCell align="right">
              <SymMoneyTextField
                value={masterValues.salePrice}
                onChange={(e) => handleMasterChange('salePrice', e.target.value)}
              />
            </StyledTableCell>
            <StyledTableCell align="right">
              <TextField
                variant="outlined"
                size="small"
                value={masterValues.supply}
                type="number"
                onChange={(e) => handleMasterChange('supply', e.target.value)}
                fullWidth
                InputProps={{ style: { padding: 0 } }}
              />
            </StyledTableCell>
            <StyledTableCell align="right">
              <SymMoneyTextField
                value={masterValues.cost}
                onChange={(e) => handleMasterChange('cost', e.target.value)}
              />
            </StyledTableCell>
            <StyledTableCell align="right">
              <SymMoneyTextField
                value={masterValues.profit}
                onChange={(e) => handleMasterChange('profit', e.target.value)}
              />
            </StyledTableCell>
          </StyledTableRow>
          {Object.keys(groupedVariants).map((color) => (
            <React.Fragment key={color}>
               {/* Parent Row */}
               <StyledTableRow>
                <StyledTableCell>
                  <IconButton onClick={() => handleExpandClick(color)}>
                    {expanded[color] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
                  {color}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].price}
                    onChange={(e) => handleParentChange(color, 'price', e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].salePrice}
                    onChange={(e) => handleParentChange(color, 'salePrice', e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={groupedVariants[color][0].supply}
                    type="number"
                    onChange={(e) => handleParentChange(color, 'supply', e.target.value)}
                    fullWidth
                    InputProps={{ style: { padding: 0 } }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].cost}
                    onChange={(e) => handleParentChange(color, 'cost', e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].profit}
                    onChange={(e) => handleParentChange(color, 'profit', e.target.value)}
                  />
                </StyledTableCell>
              </StyledTableRow>

              {/* Collapsible child rows */}
              <StyledTableRow>
                <StyledTableCell colSpan={7}>
                  <Collapse in={expanded[color]} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                      <Table size="small" aria-label="variants">
                        <TableBody>
                          {groupedVariants[color].map((row, index) => {
                            const key = `${row.color}-${row.size}`;
                            const isItemSelected = isSelected(row.size);
                            return (
                              <StyledTableRow key={row.size} hover selected={isItemSelected}>
                                <StyledTableCell padding="checkbox">
                                  <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    onChange={() => handleSelectRow(row.size)}
                                  />
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" sx={{ textAlign: 'left', width: 200 }}>
                                 {row.size || color}
                               </StyledTableCell>
                                <StyledTableCell align="right">
                                  <SymMoneyTextField
                                    value={variantValues[key]?.price || ''}
                                    onChange={(e) => handleVariantChange(key, 'price', e.target.value)}
                                  />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  <SymMoneyTextField
                                    value={variantValues[key]?.salePrice || ''}
                                    onChange={(e) => handleVariantChange(key, 'salePrice', e.target.value)}
                                  />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  <TextField
                                    variant="outlined"
                                    size="small"
                                    value={variantValues[key]?.supply || 0}
                                    type="number"
                                    onChange={(e) => handleVariantChange(key, 'supply', e.target.value)}
                                    fullWidth
                                    InputProps={{ style: { padding: 0 } }}
                                  />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  <SymMoneyTextField
                                    value={variantValues[key]?.cost || ''}
                                    onChange={(e) => handleVariantChange(key, 'cost', e.target.value)}
                                  />
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  <SymMoneyTextField
                                    value={variantValues[key]?.profit || ''}
                                    onChange={(e) => handleVariantChange(key, 'profit', e.target.value)}
                                  />
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Box>
                  </Collapse>
                </StyledTableCell>
              </StyledTableRow>
            </React.Fragment>
          ))}
        </TableBody>
         {/* Add the totals row */}
         <StyledTableRow>
            <StyledTableCell colSpan={2} sx={{ textAlign: 'left' }}>
              <strong>Total</strong>
            </StyledTableCell>
            <StyledTableCell align="right">
              {totalValues.price.toFixed(2)}
            </StyledTableCell>
            <StyledTableCell align="right">
              {totalValues.salePrice.toFixed(2)}
            </StyledTableCell>
            <StyledTableCell align="right">
              {totalValues.supply}
            </StyledTableCell>
            <StyledTableCell align="right">
              {totalValues.cost.toFixed(2)}
            </StyledTableCell>
            <StyledTableCell align="right">
              {totalValues.profit.toFixed(2)}
            </StyledTableCell>
          </StyledTableRow>
      </Table>
    </TableContainer>
  );
}

export default ProductVariantsTable;