/* eslint-disable no-param-reassign */
import {types, SnapshotIn, destroy, Instance} from 'mobx-state-tree';

const Spot = types.model({
  spot_id: types.string,
  price: types.string,
  profit: types.string,
  profit_netto: types.string,
  visible: types.string,
});

const Modifications = types.model({
  modificator_id: types.string,
  modificator_name: types.string,
  modificator_selfprice: types.string,
  modificator_selfprice_netto: types.string,
  order: types.string,
  modificator_barcode: types.string,
  modificator_product_code: types.string,
  spots: types.array(Spot),
  ingredient_id: types.string,
  fiscal_code: types.string,
});

export const CartItem = types
  .model({
    id: types.string,
    name: types.string,
    price: types.number,
    count: types.number,
    image: types.string,
    modifications: types.array(Modifications),
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
