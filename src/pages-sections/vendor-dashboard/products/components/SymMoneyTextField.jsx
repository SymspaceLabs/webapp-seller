import React, { forwardRef } from 'react'
import { TextField, InputAdornment } from '@mui/material';
import { NumericFormat } from 'react-number-format';

function SymMoneyTextField({ value, onChange }) {
    return (
      <TextField
        label=""
        value={value}
        onChange={onChange}
        name="money"
        InputProps={{
          inputComponent: MoneyInput,
          style: { paddingLeft: '8px' },
          startAdornment: (
            <InputAdornment position="start">
              $
            </InputAdornment>
          ),
        }}
        variant="outlined"
        fullWidth
      />
    );
}

const MoneyInput = forwardRef(function MoneyInput(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value, // The raw numeric value
            },
          });
        }}
        thousandSeparator
        decimalScale={2}      // Restrict to 2 decimal places
        fixedDecimalScale     // Always show 2 decimal places
        allowNegative={false} // Disallow negative values
        // prefix="$"            
        isNumericString       // Ensure input is treated as numeric string
      />
    );
  });

export default SymMoneyTextField