import {enableStaticRendering} from 'mobx-react-lite';
import remotedev from 'mobx-remotedev';

import isServer from 'lib/isServer';
import {createContext} from 'react';
import CartStore from './CartStore';

enableStaticRendering(isServer);

export type StoresType = {
  cart: CartStore;
};

export const stores: StoresType = Object.freeze({
  cart: new CartStore([]),
});

export const StoresContext = createContext(stores);
export const StoresProvider = StoresContext.Provider;
