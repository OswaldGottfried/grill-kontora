import {useContext} from 'react';
import {stores, StoresContext, StoresType} from '../stores';

export const useStores = (): StoresType => useContext(StoresContext);

export const useStore = <T extends keyof typeof stores>(store: T): typeof stores[T] =>
  useContext(StoresContext)[store];
