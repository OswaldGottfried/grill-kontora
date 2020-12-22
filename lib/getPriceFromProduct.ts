import {ProductType} from 'types';

export const getPrice = (product: ProductType): number => {
  if (product.modifications && product.modifications.length > 0)
    return Number(product.modifications[0].spots[0].price) / 100;

  return Number(product.price[1]) / 100;
};

export default getPrice;
