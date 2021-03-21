import {useContext, createContext} from 'react';
import {types, Instance, onSnapshot} from 'mobx-state-tree';

import isServer from 'lib/isServer';

import {Cart} from './Cart';
import {Checkout, defaultState as checkout} from './Checkout';

const RootModel = types.model({
  cart: Cart,
  checkout: Checkout,
});

let initialState = RootModel.create({
  cart: {items: []},
  checkout,
});

if (!isServer) {
  const data = localStorage.getItem('rootState');
  if (data) {
    const json = JSON.parse(data);

    if (RootModel.is(json)) {
      initialState = RootModel.create(json);
    }
  }
}

export const rootStore = initialState;

onSnapshot(rootStore, (snapshot) => {
  localStorage.setItem('rootState', JSON.stringify(snapshot));
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const {Provider} = RootStoreContext;
export function useStore<T extends keyof RootInstance>(key: T): RootInstance[T] {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store[key];
}
