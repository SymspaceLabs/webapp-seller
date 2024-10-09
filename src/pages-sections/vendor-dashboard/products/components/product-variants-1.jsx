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
import SymNumberTextField from './SymNumberTextField'; // Import your custom component

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Import Info icon
import { fontSize } from '../../../../theme/typography';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
    color: theme.palette.common.white,
    textAlign: 'center',
    color: 'white', // White text color for the header
    textAlign: 'center',
    fontFamily: 'Elemental End', // Custom font family
    textTransform: 'lowercase', // Lowercase text
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 2,
    color: 'white',
  },
}));

const tableContainerStyles = {
  mt: 2,
  background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)',
  boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
  backdropFilter: 'blur(12px)',
  borderRadius: '15px',
};

const tableFooterTextStyles = {
  color: 'white',
  fontSize:'16px'
};


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

function generateVariants(colors, sizes, masterValues) {
  const variants = [];

  if (sizes.length === 0) {
    colors.forEach((color) => {
      variants.push(createData(color, null, masterValues.price, masterValues.salePrice, masterValues.supply, masterValues.cost, masterValues.profit));
    });
  } else {
    colors.forEach((color) => {
      sizes.forEach((size) => {
        variants.push(createData(color, size, masterValues.price, masterValues.salePrice, masterValues.supply, masterValues.cost, masterValues.profit));
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
    if (colors.length === 0 && sizes.length === 0) {
      setMasterValues({
        price: '',
        salePrice: '',
        supply: 0,
        cost: '',
        profit: '',
      });
  
      setVariantValues({});
    } else {
      const newRows = generateVariants(colors, sizes, masterValues);
  
      // Avoid resetting rows on color deletion, retain previous row values where possible
      setRows((prevRows) => {
        return newRows.map((newRow) => {
          const existingRow = prevRows.find(
            (prevRow) => prevRow.color === newRow.color && prevRow.size === newRow.size
          );
          return existingRow ? { ...existingRow } : newRow;
        });
      });
  
      const initialExpandedState = colors.reduce((acc, color) => {
        acc[color] = false;
        return acc;
      }, {});
      setExpanded(initialExpandedState);
  
      setVariantValues((prevVariantValues) => {
        const updatedValues = { ...prevVariantValues };
  
        newRows.forEach((row) => {
          const key = `${row.color}-${row.size}`;
          if (!updatedValues[key]) {
            updatedValues[key] = { ...row };
          }
        });
  
        // Remove variant values only for the deleted rows, not resetting all
        Object.keys(updatedValues).forEach((key) => {
          const [color] = key.split('-');
          if (!colors.includes(color)) {
            delete updatedValues[key];
          }
        });
  
        return updatedValues;
      });
    }
  }, [colors, sizes, masterValues]);
  
  
  
  const handleExpandClick = (color) => {
    setExpanded((prev) => ({
      ...prev,
      [color]: !prev[color],
    }));
  };

  const handleMasterChange = (field, value) => {
    const updatedMasterValues = { ...masterValues, [field]: value };

    if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
      const salePrice = parseFloat(updatedMasterValues.salePrice || updatedMasterValues.price || 0);
      const cost = parseFloat(updatedMasterValues.cost || 0);
      const supply = parseFloat(updatedMasterValues.supply || 0);
      updatedMasterValues.profit = (salePrice - cost) * supply;
    }

    setMasterValues(updatedMasterValues);

    setRows((prevRows) =>
      prevRows.map((row) => {
        const newRow = { ...row, [field]: value };
        const salePrice = parseFloat(newRow.salePrice || newRow.price || 0);
        if (field === 'salePrice' || field === 'price' || field === 'cost' || field === 'supply') {
          newRow.profit = (salePrice - parseFloat(newRow.cost || 0)) * parseFloat(newRow.supply || 0);
        }
        return newRow;
      })
    );

    setVariantValues((prevVariantValues) => {
      const updatedValues = { ...prevVariantValues };
      Object.keys(updatedValues).forEach((key) => {
        updatedValues[key] = { ...updatedValues[key], [field]: value };
        const salePrice = parseFloat(updatedValues[key].salePrice || updatedValues[key].price || 0);
        if (field === 'salePrice' || field === 'price' || field === 'cost' || field === 'supply') {
          updatedValues[key].profit = (salePrice - parseFloat(updatedValues[key].cost || 0)) * parseFloat(updatedValues[key].supply || 0);
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
          const salePrice = parseFloat(newRow.salePrice || newRow.price || 0);
          if (field === 'salePrice' || field === 'price' || field === 'cost' || field === 'supply') {
            newRow.profit = (salePrice - parseFloat(newRow.cost || 0)) * parseFloat(newRow.supply || 0);
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
          const salePrice = parseFloat(updatedValues[key].salePrice || updatedValues[key].price || 0);
          if (field === 'salePrice' || field === 'price' || field === 'cost') {
            updatedValues[key].profit = (salePrice - parseFloat(updatedValues[key].cost || 0));
          }
        }
      });
      return updatedValues;
    });
  };
  

  const handleVariantChange = (key, field, value) => {
    setVariantValues((prev) => {
      const updatedVariant = { ...prev[key], [field]: value };
      const salePrice = parseFloat(updatedVariant.salePrice || updatedVariant.price || 0);

      if (field === 'salePrice' || field === 'price' || field === 'cost' || field === 'supply') {
        updatedVariant.profit = (salePrice - parseFloat(updatedVariant.cost || 0)) * parseFloat(updatedVariant.supply || 0);
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
    <TableContainer component={Paper} sx={tableContainerStyles}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">

        {/* TABLE HEAD */}
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
            <StyledTableCell />
            <StyledTableCell>Update All Variants</StyledTableCell>
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
              <SymNumberTextField
                value={masterValues.supply}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value)); // Ensure value is not negative
                  handleMasterChange('supply', value);
                }}
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
                readOnly={true}
                allowNegative={true}
                isProfit={true}
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
                  <SymNumberTextField
                    value={groupedVariants[color][0].supply}
                    onChange={(e) => {
                      const value = Math.max(0, Number(e.target.value)); 
                      handleParentChange(color, 'supply', value)
                    }}
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
                    readOnly={true}
                    allowNegative={true}
                    isProfit={true}
                  />
                </StyledTableCell>
              </StyledTableRow>

              {/* Collapsible child rows */}
              <StyledTableRow>
                <StyledTableCell colSpan={7}>
                  <Collapse in={expanded[color]} timeout="auto" unmountOnExit>
                    <Table sx={{ minWidth: 700 }}  size="small" aria-label="variants" >
                      <TableBody>
                        {groupedVariants[color].map((row, index) => {
                          const key = `${row.color}-${row.size}`;
                          const isItemSelected = isSelected(row.size);
                          return (
                            <StyledTableRow key={row.size} hover selected={isItemSelected}>

                              <StyledTableCell sx={{ minWidth: '45px' }} />

                              <StyledTableCell sx={{ minWidth: '200px' }}>
                                {row.size || color}
                              </StyledTableCell>

                              <StyledTableCell align="right" sx={{ minWidth: '185px' }}>
                                <SymMoneyTextField
                                  value={variantValues[key]?.price || ''}
                                  onChange={(e) => handleVariantChange(key, 'price', e.target.value)}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right" sx={{ minWidth: '185px' }}>
                                <SymMoneyTextField
                                  value={variantValues[key]?.salePrice || ''}
                                  onChange={(e) => handleVariantChange(key, 'salePrice', e.target.value)}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right" sx={{ minWidth: '185px' }}>
                                <SymNumberTextField
                                  value={variantValues[key]?.supply || 0}
                                  onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value)); 
                                    handleVariantChange(key, 'supply', value)
                                  }}
                                />

                              </StyledTableCell>
                              <StyledTableCell align="right" sx={{ minWidth: '185px' }}>
                                <SymMoneyTextField
                                  value={variantValues[key]?.cost || ''}
                                  onChange={(e) => handleVariantChange(key, 'cost', e.target.value)}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right" sx={{ minWidth: '185px' }}>
                                <SymMoneyTextField
                                  value={variantValues[key]?.profit || ''}
                                  onChange={(e) => handleVariantChange(key, 'profit', e.target.value)}
                                  readOnly={true}
                                  allowNegative={true}
                                  isProfit={true}
                                />
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Collapse>
                </StyledTableCell>
              </StyledTableRow>
            </React.Fragment>
          ))}
        </TableBody>

        {/* Add the totals row */}
        <StyledTableRow>
          <StyledTableCell colSpan={2} sx={[tableFooterTextStyles, { textAlign: 'left', fontFamily: 'Elemental End', textTransform: 'lowercase', fontSize:'14px' }]}>
            <strong>Total</strong>
          </StyledTableCell>
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {totalValues.price.toFixed(2)}
          </StyledTableCell>
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {totalValues.salePrice.toFixed(2)}
          </StyledTableCell>
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {totalValues.supply}
          </StyledTableCell>
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {totalValues.cost.toFixed(2)}
          </StyledTableCell>
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {totalValues.profit.toFixed(2)}
          </StyledTableCell>
        </StyledTableRow>
      </Table>
    </TableContainer>
  );
}

export default ProductVariantsTable;