import {memo, ChangeEvent} from 'react';

import s from './input.module.scss';

export type PropsType = {
  name: string;
  placeholder: string;
  value: string | number;
  type: 'email' | 'text' | 'tel' | 'number' | 'password' | 'search';
  inputmode?: 'decimal';
  autoComplete?: 'email' | 'street-address' | 'tel' | 'off' | 'family-name' | 'given-name';
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const Input = memo<PropsType>(
  ({name, placeholder, value, type, inputmode, autoComplete = 'off', onChange, required}) => (
    <div className={s.field}>
      <input
        id={`input__${value}`}
        autoComplete={autoComplete}
        type={type}
        inputMode={inputmode}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={s.input}
      />
      <label className={s.label} htmlFor={`input__${value}`}>
        {placeholder}
      </label>
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;
