import {useStaticRendering} from 'mobx-react-lite';

import {CartType} from 'types/cart';
import CartStore from './CartStore';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer); // eslint-disable-line react-hooks/rules-of-hooks

type StoreType = {
  cart: CartType[];
};

let store: StoreType | null = null;

export default function initializeStore(initialData: StoreType = {cart: []}): StoreType | null {
  if (isServer) {
    return {
      // @ts-ignore
      cart: new CartStore(initialData.cart),
    };
  }

  if (store === null) {
    store = {
      // @ts-ignore
      cart: new CartStore(initialData.cart),
    };
  }

  return store;
}
