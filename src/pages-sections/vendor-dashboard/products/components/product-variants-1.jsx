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
  tableCellClasses
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SymMoneyTextField from './SymMoneyTextField'; // Import your custom component

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
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const newRows = generateVariants(colors, sizes);
    setRows(newRows);

    const initialExpandedState = colors.reduce((acc, color) => {
      acc[color] = true;
      return acc;
    }, {});
    setExpanded(initialExpandedState);
  }, [colors, sizes]);

  const handleExpandClick = (color) => {
    setExpanded((prev) => ({
      ...prev,
      [color]: !prev[color],
    }));
  };

  const handleMasterChange = (color, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.color === color ? { ...row, [field]: value } : row
      )
    );
  };

  const isSelected = (variant) => selected.indexOf(variant) !== -1;


  const groupedVariants = groupVariantsByColor(rows);
  
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
            <TableRow>
                <StyledTableCell padding="checkbox" />
                <StyledTableCell sx={{ width: '200px', textAlign: 'left' }}>Variant</StyledTableCell>
                <StyledTableCell align="right" sx={{ width: '200px' }}>Price</StyledTableCell>
                <StyledTableCell align="right" sx={{ width: '200px' }}>Sale Price</StyledTableCell>
                <StyledTableCell align="right" sx={{ width: '200px' }}>Supply</StyledTableCell>
                <StyledTableCell align="right" sx={{ width: '200px' }}>Cost</StyledTableCell>
                <StyledTableCell align="right" sx={{ width: '200px' }}>Profit</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(groupedVariants).map((color) => (
            <React.Fragment key={color}>
              {/* Parent Row for the color */}
              <StyledTableRow>
                <StyledTableCell>
                  <IconButton onClick={() => handleExpandClick(color)}>
                    {expanded[color] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
                  {color}
                </StyledTableCell>
                {/* Master inputs that control the group */}
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].price}
                    onChange={(e) => handleMasterChange(color, 'price', e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].salePrice}
                    onChange={(e) => handleMasterChange(color, 'salePrice', e.target.value)}
                  />
                </StyledTableCell>
                {/* Supply input using standard TextField */}
                <StyledTableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={groupedVariants[color][0].supply}
                    type="number"
                    onChange={(e) => {
                      handleMasterChange(color, 'supply', e.target.value);
                    }}
                    fullWidth
                    InputProps={{ style: { padding: 0 } }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].cost}
                    onChange={(e) => handleMasterChange(color, 'cost', e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].profit}
                    onChange={(e) => handleMasterChange(color, 'profit', e.target.value)}
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
                            const isItemSelected = isSelected(row.size);
                            return(
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
                                  value={row.price}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].price = e.target.value;
                                    setRows(updatedRows);
                                  }}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <SymMoneyTextField
                                  value={row.salePrice}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].salePrice = e.target.value;
                                    setRows(updatedRows);
                                  }}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  value={row.supply}
                                  type="number"
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].supply = e.target.value;
                                    setRows(updatedRows);
                                  }}
                                  fullWidth
                                  InputProps={{ style: { padding: 0 } }}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <SymMoneyTextField
                                  value={row.cost}
                                  onChange={(e) => {
                                    const updatedRows = [...rows];
                                    updatedRows[index].cost = e.target.value;
                                    setRows(updatedRows);
                                  }}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                <SymMoneyTextField
                                  value={(row.salePrice - row.cost) * row.supply || 0}
                                  InputProps={{
                                    readOnly: true,
                                  }}
                                />
                              </StyledTableCell>
                            </StyledTableRow>
                            )
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
      </Table>
    </TableContainer>
  );
}

export default ProductVariantsTable;
