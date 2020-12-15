import {FC, useCallback, MouseEvent} from 'react';
import {observer} from 'mobx-react-lite';

import Link from 'next/link';

import {ProductType, Maybe} from 'types';
import Price from '@/components/common/price/price';
import CircleButton from '@/components/common/buttons/circleButton/circleButton';
import {useStore} from 'models';
import formatPrice from 'lib/formatPrice';

import Counter from '@/components/common/buttons/counter/counter';
import {CartType} from 'types/cart';
import s from './product.module.scss';

type PropsType = {
  product: ProductType;
};

const formatToCartType = (product: ProductType, id: string): Maybe<CartType> => {
  const activeMod = product.modifications?.find(({modificator_id}) => modificator_id === id);
  if (activeMod)
    return {
      name: product.product_name,
      id: product.product_id,
      modId: activeMod.modificator_id,
      count: 1,
      price: Number(activeMod.spots[0].price),
      image: `https://gril-kontora.joinposter.com${product.photo}`,
    };

  return null;
};

const ProductPage: FC<PropsType> = observer(({product}) => {
  const {addItem, count, decrease} = useStore('cart');

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const cartItem = formatToCartType(product, event.currentTarget.value);

      if (cartItem) {
        addItem(cartItem);
      }
    },
    [product, addItem],
  );

  const onDecrease = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const cartItem = formatToCartType(product, event.currentTarget.value);

      if (cartItem) {
        decrease(cartItem);
      }
    },
    [product, decrease],
  );

  return (
    <>
      <section className={s.wrap}>
        <Link
          href={`/category/${product.menu_category_id}`}
          as={`/category/${product.menu_category_id}`}
        >
          <button type="button" className={s.link} aria-label="в категорию" />
        </Link>
        <img
          src={
            product.photo ? `https://gril-kontora.joinposter.com${product.photo}` : './buffalo.jpeg'
          }
          className={s.image}
          alt={product.product_name}
        />
        <div className={s.description}>
          <h1>{product.product_name}</h1>
          {product.modifications && product.modifications.length > 0 && (
            <ul className={s.modifications}>
              {product.modifications.map(({modificator_id, modificator_name, spots}) => (
                <li key={modificator_id} className={s.modification}>
                  <div className="w-full">
                    <h2 className={s.title}>{modificator_name}</h2>
                    <div className="inline-flex w-full whitespace-nowrap items-center">
                      <div className="w-40 mr-20">
                        <Counter
                          count={count(product.product_id, modificator_id)}
                          onIncrease={onClick}
                          value={modificator_id}
                          onDecrease={onDecrease}
                        />
                      </div>
                      <Price price={formatPrice(spots[0].price)} />
                    </div>
                  </div>
                  <CircleButton
                    onClick={onClick}
                    value={modificator_id}
                    label="Добавить в корзину"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
});

export default ProductPage;
