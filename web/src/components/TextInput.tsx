import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  margin-top: 10px;
`;
const Input = styled.input`
  display: block;
  width: 100%;
  border: 1px solid #666;
  border-radius: 8px;
  padding: 10px;
`;
const LabelText = styled.span`
  display: block;
  font-weight: bold;
`;
const LabelError = styled.span`
  display: block;
  color: red;
  font-size: 0.8rem;
`;

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
      <LabelText>{label}</LabelText>
      <Input type={type} name={name} onChange={onChange} value={value} />
      {error && <LabelError>{error}</LabelError>}
    </Label>
  );
};
