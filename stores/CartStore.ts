import {observable, action, computed} from 'mobx';
import {CartType} from 'types/cart';

class Cart {
  @observable cart: CartType[] = [];

  constructor(initialData = {cart: []}) {
    this.cart = initialData.cart;
  }

  @action addToCart = (cartItem: CartType): void => {
    const existedItemIndex = this.cart.findIndex(({id}) => id === cartItem.id);

    if (existedItemIndex === -1) {
      this.cart.push(cartItem);
    } else {
      this.cart[existedItemIndex].count += 1;
    }
  };

  @computed get cartInfo(): CartType[] {
    return this.cart;
  }
}

const CounterStore = new Cart();
export default CounterStore;
