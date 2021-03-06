import {CheckoutModel} from 'models/Checkout';

import {PropsType as InputPropsType} from '@/common/input/input';

type InputType = Omit<Omit<InputPropsType, 'onChange'>, 'value'> & {
  name: keyof CheckoutModel;
};

const commonInputs: InputType[] = [
  {
    autoComplete: 'given-name',
    name: 'first_name',
    placeholder: 'Имя',
    type: 'text',
  },
  {
    autoComplete: 'family-name',
    name: 'last_name',
    placeholder: 'Фамилия',
    type: 'text',
  },
  {
    autoComplete: 'tel',
    name: 'phone',
    placeholder: 'Телефон',
    required: true,
    type: 'tel',
  },
  {
    autoComplete: 'email',
    name: 'email',
    placeholder: 'Email',
    type: 'email',
  },
];

const takeAway: InputType[] = [
  ...commonInputs,
  {
    autoComplete: 'off',
    name: 'comment',
    placeholder: 'Комментарий',
    type: 'text',
  },
];

const delivery: InputType[] = [
  ...commonInputs,
  {
    autoComplete: 'street-address',
    name: 'address',
    placeholder: 'Адрес доставки',
    required: true,
    type: 'text',
  },
  {
    autoComplete: 'off',
    name: 'comment',
    placeholder: 'Комментарий',
    type: 'text',
  },
];

const ORDER_INPUTS = {
  delivery,
  takeAway,
};

export default ORDER_INPUTS;
