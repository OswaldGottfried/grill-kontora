import {memo, ChangeEvent} from 'react';
import clsx from 'clsx';

import s from './input.module.scss';

export type PropsType = {
  name: string;
  placeholder: string;
  value: string | number;
  type: 'email' | 'text' | 'tel' | 'number' | 'password' | 'search';
  inputmode?: 'decimal';
  autoComplete?: 'email' | 'street-address' | 'tel' | 'off' | 'family-name' | 'given-name';
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
};

const Input = memo<PropsType>(
  ({
    name,
    placeholder,
    value,
    type,
    inputmode,
    autoComplete = 'off',
    error,
    onChange,
    required,
  }) => (
    <div className={clsx(s.field, error && s.error)}>
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
      {error && <p className={s.error}>{error}</p>}
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;
