import {useCallback, MouseEvent} from 'react';
import {observer} from 'mobx-react-lite';

import {useStore} from 'models';
import {ProductType} from 'types';

import ProductItem from './productItem/productItem';
import s from './productItems.module.scss';

type PropsType = {
  products: ProductType[];
};

const ProductItems = observer<PropsType>(({products}) => {
  const {increase} = useStore('cart');
  const addToCart = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const selectedProduct = products.find(
        ({product_id}) => product_id === event.currentTarget.value,
      );

      if (selectedProduct) {
        increase({
          name: selectedProduct.product_name,
          id: selectedProduct.product_id,
          count: 1,
          category: selectedProduct.category_name,
          price: Number(selectedProduct.price[1]),
          image: selectedProduct.photo_origin || '',
        });
      }
    },
    [products, increase],
  );

  if (!products) return null;

  return (
    <ul className={s.items}>
      {products.map((product) => (
        <ProductItem key={product.product_id} product={product} addToCart={addToCart} />
      ))}
    </ul>
  );
});

export default ProductItems;
