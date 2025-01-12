import React from 'react';
import { Box, TextField } from '@mui/material';

interface OTPInputProps {
  length: number;
  onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onChange }) => {
  const [values, setValues] = React.useState<string[]>(Array(length).fill(''));

  const handleChange = (value: string, index: number) => {
    const updatedValues = [...values];

    // Handle pasting a full OTP
    if (value.length > 1) {
      const pastedValues = value.slice(0, length).split('');
      pastedValues.forEach((char, idx) => {
        if (/^[0-9]$/.test(char)) {
          updatedValues[index + idx] = char;
        }
      });
      setValues(updatedValues);
      onChange(updatedValues.join(''));

      // Focus the last filled input
      const nextInputIndex = Math.min(index + value.length - 1, length - 1);
      const nextInput = document.getElementById(`otp-input-${nextInputIndex}`);
      nextInput?.focus();
      return;
    }

    // Handle single-character input
    if (/^[0-9]?$/.test(value)) {
      updatedValues[index] = value;
      setValues(updatedValues);
      onChange(updatedValues.join(''));

      // Automatically focus the next input
      if (value && index < length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const updatedValues = [...values];
      if (!values[index] && index > 0) {
        updatedValues[index - 1] = ''; // Clear the previous input
        setValues(updatedValues);
        onChange(updatedValues.join(''));

        // Focus the previous input
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        prevInput?.focus();
      } else {
        updatedValues[index] = ''; // Clear the current input
        setValues(updatedValues);
        onChange(updatedValues.join(''));
      }
    }
  };

  return (
    <Box display="flex" gap={1} justifyContent="center">
      {values.map((_, index) => (
        <TextField
          key={index}
          size='small'
          id={`otp-input-${index}`}
          variant="outlined"
          value={values[index]}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e: any) => handleKeyDown(e, index)}
          inputProps={{
            maxLength: length,
            style: { textAlign: 'center', fontSize: 16, width: 16, height: 20 },
          }}
        />
      ))}
    </Box>
  );
};

export default OTPInput;
