import {useCallback, MouseEvent} from 'react';
import Link from 'next/link';
import {observer} from 'mobx-react-lite';
import {motion} from 'framer-motion';
import Image from 'next/image';

import Price from '@/common/price/price';
import CircleButton from '@/common/buttons/circleButton/circleButton';
import {useStore} from 'models';
import {ProductType} from 'types';
import getPrice from 'lib/getPriceFromProduct';

import CounterObserver from '@/common/buttons/counterObserver/counterObserver';
import s from './productItems.module.scss';

type PropsType = {
  products: ProductType[];
};

const ProductItems = observer<PropsType>(({products}) => {
  const {increase, count} = useStore('cart');

  const onClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const selectedProduct = products.find(
        ({product_id}) => product_id === event.currentTarget.value,
      );

      if (selectedProduct) {
        increase({
          name: selectedProduct.product_name,
          id: selectedProduct.product_id,
          count: 1,
          price: Number(selectedProduct.price[1]),
          image: selectedProduct.photo || '',
        });
      }
    },
    [products, increase],
  );

  if (!products) return null;

  return (
    <ul className={s.items}>
      {products.map((product) => (
        <li key={product.product_id} className={s.item}>
          <Link href={`/product/${product.product_id}`}>
            <figure className={s.image}>
              <Image
                className="cursor-pointer"
                src={
                  product.photo_origin
                    ? `https://gril-kontora.joinposter.com${product.photo_origin}`
                    : '/burger.svg'
                }
                width={400}
                height={300}
                alt={product.product_name}
              />
            </figure>
          </Link>
          <Link
            href={`/product/${product.product_id}`}
            as={`/product/${product.product_id}`}
            scroll={false}
          >
            <motion.h3 className={s.title} layoutId={product.product_name}>
              <a href={`/product/${product.product_id}`}>{product.product_name}</a>
            </motion.h3>
          </Link>
          <div className={s.cta}>
            <Price price={getPrice(product)} isExact={Boolean(product.modifications)} />

            {product.modifications ? (
              <Link href={`/product/${product.product_id}`} as={`/product/${product.product_id}`}>
                <a href={`/product/${product.product_id}`}>
                  <CircleButton
                    label={`ссылка на ${product.product_name}`}
                    value={product.product_id}
                  />
                </a>
              </Link>
            ) : (
              <div className="max-w-xs h-14 flex items-center">
                {count(product.product_id) === 0 ? (
                  <CircleButton
                    label="Добавить в корзину"
                    value={product.product_id}
                    onClick={onClick}
                  />
                ) : (
                  <CounterObserver product={product} value={product.product_id} />
                )}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
});

export default ProductItems;
