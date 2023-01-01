import React from 'react';
import { Button as ButtonMui } from '@mui/material';
import './button.css';

export default function Button({ type, text }) {
  return (
    <ButtonMui className="custom-button" type={type}>
      {text}
    </ButtonMui>
  );
}
