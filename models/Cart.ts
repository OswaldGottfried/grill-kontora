/* eslint-disable no-param-reassign */
import {types, SnapshotIn, destroy, Instance} from 'mobx-state-tree';

export const CartItem = types
  .model({
    id: types.string,
    name: types.string,
    price: types.number,
    count: types.number,
    image: types.string,
  })
  .actions((self) => ({
    changePrice(price: number) {
      self.price = price;
    },
    increaseCount() {
      self.count += 1;
    },
    decreaseCount() {
      self.count -= 1;
    },
  }));

export const Cart = types
  .model({
    items: types.optional(types.array(CartItem), []),
  })
  .actions((self) => ({
    addItem(cartItem: SnapshotIn<typeof CartItem> | Instance<typeof CartItem>) {
      const index = self.items.findIndex(({id}) => id === cartItem.id);

      if (index === -1) {
        self.items.push(cartItem);
      } else {
        self.items[index].count += 1;
      }
    },
    remove(id: string) {
      const deletedItem = self.items.find((item) => item.id === id);
      if (deletedItem) destroy(deletedItem);
    },
  }))
  .views((self) => ({
    get totalItems() {
      return self.items.reduce((sum, {count}) => sum + count, 0);
    },
    get totalPrice() {
      return self.items.reduce((sum, {price, count}) => sum + price * count, 0);
    },
  }));
