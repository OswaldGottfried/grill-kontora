import {useCallback, MouseEvent} from 'react';
import Link from 'next/link';
import {observer} from 'mobx-react-lite';

import {ProductType} from 'types';
import Price from '@/components/common/price/price';
import {useStore} from 'models';

import CircleButton from '@/components/common/buttons/circleButton/circleButton';

import s from './productItems.module.scss';

type PropsType = {
  products: ProductType[];
};

const getPrice = (product: ProductType): number => {
  if (product.modifications && product.modifications.length > 0)
    return Number(product.modifications[0].spots[0].price) / 100;

  return Number(product.price[1]) / 100;
};

const ProductItems = observer<PropsType>(({products}) => {
  const {addItem} = useStore('cart');

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const selectedProduct = products.find(
        ({product_id}) => product_id === event.currentTarget.value,
      );

      if (selectedProduct) {
        addItem({
          name: selectedProduct.product_name,
          id: selectedProduct.product_id,
          count: 1,
          price: getPrice(selectedProduct),
          image: `https://gril-kontora.joinposter.com${selectedProduct.photo}`,
        });
      }
    },
    [products, addItem],
  );

  if (!products) return null;

  return (
    <ul className={s.items}>
      {products.map((product) => (
        <li key={product.product_id} className={s.item}>
          <Link href={`/product/${product.product_id}`} as={`/product/${product.product_id}`}>
            <img
              className={s.image}
              width={300}
              height={300}
              src={
                product.photo
                  ? `https://gril-kontora.joinposter.com${product.photo}`
                  : './buffalo.jpeg'
              }
              alt={product.product_name}
            />
          </Link>
          <Link href={`/product/${product.product_id}`} as={`/product/${product.product_id}`}>
            <h3 className={s.title}>
              <button type="button">{product.product_name}</button>
            </h3>
          </Link>
          <div className={s.cta}>
            <Price price={getPrice(product)} isExact={Boolean(product.modifications)} />

            {product.modifications ? (
              <Link href={`/product/${product.product_id}`} as={`/product/${product.product_id}`}>
                <CircleButton
                  label={`ссылка на ${product.product_name}`}
                  value={product.product_id}
                />
              </Link>
            ) : (
              <CircleButton
                label="Добавить в корзину"
                value={product.product_id}
                onClick={onClick}
              />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
});

export default ProductItems;
