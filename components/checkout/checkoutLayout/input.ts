import {PropsType as InputPropsType} from '@/common/input/input';
import {CheckoutModel} from 'models/Checkout';

type InputType = Omit<Omit<InputPropsType, 'onChange'>, 'value'> & {
  name: keyof CheckoutModel;
};

const takeAway: InputType[] = [
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
  //   {
  //     autoComplete: 'off',
  //     name: 'comment',
  //     placeholder: 'Комментарий',
  //     type: 'text',
  //   },
];

const delivery: InputType[] = [
  ...takeAway,
  {
    autoComplete: 'street-address',
    name: 'address',
    placeholder: 'Адрес доставки',
    required: true,
    type: 'text',
  },
];

const ORDER_INPUTS = {
  delivery,
  takeAway,
};

export default ORDER_INPUTS;
