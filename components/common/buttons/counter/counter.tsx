import classNames from 'classnames';

import {FC, MouseEvent} from 'react';

import Minus from './svg/minus.svg';
import Plus from './svg/plus.svg';

import s from './counter.module.scss';

type PropsType = {
  count: number;
  value: string;
  onIncrease: (event: MouseEvent<HTMLButtonElement>) => void;
  onDecrease: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Counter: FC<PropsType> = ({count, value, onIncrease, onDecrease}) => {
  // if (count === 0) return <CircleButton label="Добавить в корзину" onClick={increase} />;

  return (
    <div className={s.counter}>
      <button
        className={s.button}
        type="button"
        disabled={count === 0}
        onClick={onDecrease}
        value={value}
        aria-label="убрать из корзины"
      >
        <Minus />
      </button>
      <span className={s.count}>{count}</span>
      <button
        className={s.button}
        type="button"
        onClick={onIncrease}
        value={value}
        aria-label="добавить в корзину"
      >
        <Plus />
      </button>
    </div>
  );
};

export default Counter;
