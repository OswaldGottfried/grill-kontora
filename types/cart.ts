import {Modification} from 'types/product';

export type CartType = {
  id: string;
  name: string;
  price: number;
  count: number;
  modifications: Modification;
  image: string;
};
