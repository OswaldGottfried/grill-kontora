import classNames from 'classnames';
import {useTheme} from 'next-themes';
import React, {Fragment, useState, useEffect} from 'react';

import s from './darkModeToggle.module.scss';

export default function DarkModeToggle(): JSX.Element {
  const [mode, toggleMode] = useState('dark');

  const {setTheme} = useTheme();

  useEffect(() => {
    setTheme(mode);
  }, [mode, setTheme]);

  return (
    <div className={classNames(s.layout, s[mode])}>
      <div className={s.switch}>
        {['auto', 'dark', 'light'].map((text, index) => (
          <Fragment key={text}>
            <input
              checked={text === mode}
              id={`_${index}`}
              name="switch"
              onChange={() => toggleMode(text)}
              type="radio"
            />
            <label className={s.label} htmlFor={`_${index}`}>
              {text}
            </label>
          </Fragment>
        ))}
        <div className={classNames(s.indicator, s[mode])} />
      </div>
    </div>
  );
}
