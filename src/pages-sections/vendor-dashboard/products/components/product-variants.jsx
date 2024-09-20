import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

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

// Function to create data for each variant combination
function createData(variant, price, quantity) {
  return { variant, price, quantity };
}

// Dynamically generate combinations of variants
function generateVariants(colors, sizes) {
  const variants = [];
  colors.forEach((color) => {
    sizes.forEach((size) => {
      const variant = `${color} - ${size}`;
      variants.push(createData(variant, 0, 0)); // Set default price/quantity to 0
    });
  });
  return variants;
}

const colors = ['Red', 'Blue']; // Example colors
const sizes = ['Small', 'Medium', 'Large']; // Example sizes

function ProductVariantsTable() {
  const [rows, setRows] = React.useState(generateVariants(colors, sizes));
  const [selected, setSelected] = React.useState([]);

  const handleSelectRow = (variant) => {
    const selectedIndex = selected.indexOf(variant);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, variant);
    } else {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const isSelected = (variant) => selected.indexOf(variant) !== -1;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox" />
            <StyledTableCell sx={{ width: '60%', textAlign: 'left' }}>Variant</StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '20%' }}>Price</StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '20%' }}>Quantity</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const isItemSelected = isSelected(row.variant);
            return (
              <StyledTableRow
                key={row.variant}
                hover
                selected={isItemSelected}
              >
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
                <StyledTableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row.price}
                    onChange={(e) => handleInputChange(e, index, 'price')}
                    fullWidth
                    InputProps={{ style: { padding: 0 } }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={row.quantity}
                    onChange={(e) => handleInputChange(e, index, 'quantity')}
                    fullWidth
                    InputProps={{ style: { padding: 0 } }}
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
