/* eslint-disable no-param-reassign */
import {types, SnapshotOut} from 'mobx-state-tree';
import {ServiceMode} from 'types/order';

export const Checkout = types
  .model({
    phone: types.string,
    service_mode: types.number,
    first_name: types.string,
    last_name: types.string,
    email: types.optional(types.string, ''),
    address: types.optional(types.string, ''),
    comment: types.optional(types.string, ''),
  })
  .actions((self) => ({
    setValue(key: keyof typeof self, value: string | number) {
      // @ts-ignore
      self[key] = value;
    },
  }))
  .views((self) => ({
    getField(key: keyof typeof self) {
      return self[key];
    },
  }));

export type CheckoutModel = SnapshotOut<typeof Checkout>;
export const defaultState: CheckoutModel = {
  first_name: '',
  last_name: '',
  phone: '',
  service_mode: ServiceMode.Takeaway,
  address: '',
  comment: '',
  email: '',
};
