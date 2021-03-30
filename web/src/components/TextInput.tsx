import React from 'react';
import styled from 'styled-components';

const Input = styled.input``;
const Label = styled.label``;

export interface TextInputProps {
  type?: string;
  name?: string;
  label?: string;
  value?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  type = 'text',
  name,
  label,
  onChange,
  value,
  error,
}) => {
  return (
    <Label>
      <span>{label}</span>
      <Input type={type} name={name} onChange={onChange} value={value} />
      {error && <span>{error}</span>}
    </Label>
  );
};
