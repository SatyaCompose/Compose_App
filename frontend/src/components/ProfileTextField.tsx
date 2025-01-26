import React, { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";

interface CustomTextFieldProps {
    label: string;
    defaultValue: string;
    mb: number;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, defaultValue, mb, onChange }) => {

    return (
        <TextField
            label={label}
            defaultValue={defaultValue}
            fullWidth
            variant="outlined"
            sx={{
                mb: mb,
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: "#4CAF50", // Set border color to green when focused
                    },
                },
                "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                        color: "#4CAF50", // Optional: Set label color to green when focused
                    },
                },
            }}
            onChange={onChange}// Reset focus state
        />
    );
};

export default CustomTextField;
