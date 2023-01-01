import { TextField as TextFieldMui } from '@mui/material';
import React from 'react';
import './textField.css';

export default function TextField(props) {
  return <TextFieldMui className="custom-text-field" {...props}></TextFieldMui>;
}
