import {observable, action, computed} from 'mobx';
import {CartType} from 'types/cart';
import isServer from 'lib/isServer';

export default class Cart {
  constructor(cart: CartType[]) {
    this.cart = cart;
    this.load();
  }

  @observable cart: CartType[] = [];

  @action add = (cartItem: CartType): void => {
    const index = this.cart.findIndex(({id}) => id === cartItem.id);

    if (index === -1) {
      this.cart.push(cartItem);
    } else {
      this.cart[index].count += 1;
    }

    this.save();
  };

  @action remove = (id: string): void => {
    const index = this.cart.findIndex((item) => id === item.id);

    if (index !== -1) {
      this.cart.splice(index, 1);
      this.save();
    }
  };

  @action private save = (): void => {
    if (!isServer) {
      window.localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  };

  @action private load = (): CartType[] =>
    !isServer
      ? Object.assign(this.cart, JSON.parse(window.localStorage.getItem('cart') || '[]'))
      : [];

  @computed get info(): CartType[] {
    return this.cart;
  }
}
