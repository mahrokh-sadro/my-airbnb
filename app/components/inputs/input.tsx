"use client";

import { TextField } from "@mui/material";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: any;
  errors: any;
  footer?: any;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors,
  footer,
}) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      variant="standard"
      fullWidth
      disabled={disabled}
      error={!!errors[id]}
      helperText={errors[id]?.message}
      {...register(id, { required })}
    />
  );
};

export default Input;
