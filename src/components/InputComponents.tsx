import React, { useState, KeyboardEvent } from 'react';
import styled, { css } from 'styled-components';

import FontUtil from 'lib/Font';

export interface RoundInputProps {
  label?: string;

  placeholder?: string;

  value?: string;

  disabled?: boolean;

  onChangeText?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onEnterPressed?: () => void;

  required?: boolean;

  inputError?: boolean;

  errorText?: string;

  type?: string;

  style?: React.CSSProperties;
}

const FormGroup = styled.div`
  margin: 2px 0;

  font-family: 'Genos';
  font-size: 16px;
`;

const Label = styled.label<{ disabled?: boolean }>`
  display: block;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  color: black;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-transform: capitalize;
`;

const Input = styled.input<RoundInputProps>`
  display: block;
  margin-bottom: 6px;
  padding: 8px;
  background-color: transparent;
  font-family: ${FontUtil.primary};
  color: white;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  box-sizing: border-box;
  border: transparent;
  transition: all .5s;
  text-align: justify;
  &:focus{
    outline: none;
    border: transparent;
  }

  &::placeholder {
    color: #ffffff;
    opacity: 0.5;

    font-size: 14px;
  }

  ${props => props.disabled && css`
    pointerEvents: none;
    cursor: not-allowed;
  `}

  ${props => props.inputError && css`
    border: 1px solid red;

    &:focus {
      outline-color: red;
    }

  `}
  
    width: 100%;
    z-index: -1;
    text-align: center;
`;

const InputPasswordContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  user-select: none;

  ${Input}{
    display: flex;
    
  }
`;

const ValidateText = styled.small`
  margin-left: 4px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.5px;
  color: red;
`;

export const InputComponents = ({ label, placeholder, value, disabled, onChangeText, onEnterPressed, required, inputError, errorText, type, style, ...otherProps }: RoundInputProps): JSX.Element => {
  const [togglePassword, setTogglePassword] = useState(false);

  const onEnterPressedHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (onEnterPressed) {
        onEnterPressed();
      }
    }
  };

  return (
    <FormGroup style={style} {...otherProps}>
      {label ? <Label disabled={disabled}>{label}</Label> : ''}
      {
        type === 'password'
          ? (
            <InputPasswordContainer>
              {togglePassword ? (
                <Input type='text' placeholder={placeholder} disabled={disabled} onChange={onChangeText} onKeyDown={(e: KeyboardEvent) => onEnterPressedHandler(e)} value={value} required={required} inputError={inputError} />
              ) : (
                <Input type='password' placeholder={placeholder} disabled={disabled} onChange={onChangeText} onKeyDown={(e: KeyboardEvent) => onEnterPressedHandler(e)} value={value} required={required} inputError={inputError} />
              )}
            </InputPasswordContainer>
          ) : <Input placeholder={placeholder} disabled={disabled} onChange={onChangeText} onKeyDown={(e: KeyboardEvent) => onEnterPressedHandler(e)} value={value} required={required} inputError={inputError} />

      }
      {inputError && (<ValidateText>{errorText}</ValidateText>)}
    </FormGroup>
  );
};

InputComponents.defaultProps = {
  label: '',
  placeholder: 'eg:123',
  disabled: false,
  value: '',
  onChangeText: { action: 'change text' },
  onEnterPressed: { action: 'key' },
  required: false,
  inputError: false,
  errorText: '',
  type: '',
  style: undefined,
};

export default InputComponents;
