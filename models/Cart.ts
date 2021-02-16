/* eslint-disable no-param-reassign */
import {types, SnapshotIn, destroy, Instance} from 'mobx-state-tree';
import * as gtag from 'lib/gtag';

export const CartItem = types.model({
  id: types.string,
  name: types.string,
  price: types.number,
  count: types.number,
  image: types.string,
  modId: types.optional(types.string, ''),
});

export const Cart = types
  .model({
    items: types.optional(types.array(CartItem), []),
  })
  .actions((self) => ({
    increase(cartItem: SnapshotIn<typeof CartItem> | Instance<typeof CartItem>) {
      const index = self.items.findIndex(
        ({id, modId}) => id === cartItem.id && cartItem.modId === modId,
      );

      if (index === -1) {
        self.items.push(cartItem);
        gtag.addToCart(cartItem as CartItemType);
      } else {
        self.items[index].count += 1;
        gtag.addToCart(self.items[index]);
      }
    },
    decrease(cartItem: SnapshotIn<typeof CartItem> | Instance<typeof CartItem>) {
      const index = self.items.findIndex(
        ({id, modId}) => id === cartItem.id && cartItem.modId === modId,
      );

      if (index === -1) return;

      if (self.items[index].count > 1) {
        self.items[index].count -= 1;
      } else {
        this.remove(self.items[index].id);
      }
    },
    remove(id: string) {
      const deletedItem = self.items.find((item) => item.id === id);
      if (deletedItem) {
        gtag.removeFromCart(deletedItem);
        destroy(deletedItem);
      }
    },
    clear() {
      self.items.length = 0;
    },
  }))
  .views((self) => ({
    get totalItems() {
      return self.items.reduce((sum, {count}) => sum + count, 0);
    },
    count(id: string, modId = ''): number {
      return self.items.find((item) => item.id === id && item.modId === modId)?.count || 0;
    },
    get totalPrice() {
      return self.items.reduce((sum, {price, count}) => sum + price * count, 0);
    },
  }));

export type CartItemType = Instance<typeof CartItem>;
