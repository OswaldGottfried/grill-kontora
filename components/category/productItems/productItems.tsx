import {useCallback, MouseEvent} from 'react';
import Link from 'next/link';
import {observer} from 'mobx-react-lite';
import {motion} from 'framer-motion';
import Image from 'next/image';

import Price from '@/components/common/price/price';
import CircleButton from '@/components/common/buttons/circleButton/circleButton';
import {useStore} from 'models';
import {ProductType} from 'types';
import getPrice from 'lib/getPriceFromProduct';

import s from './productItems.module.scss';

type PropsType = {
  products: ProductType[];
};

const ProductItems = observer<PropsType>(({products}) => {
  const {increase: addItem} = useStore('cart');

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
            <motion.figure className="image cursor-pointer" layoutId={product.product_name}>
              <Image
                src={
                  product.photo
                    ? `https://gril-kontora.joinposter.com${product.photo}`
                    : '/burger.jpg'
                }
                width={400}
                height={300}
                alt={product.product_name}
              />
            </motion.figure>
          </Link>
          <Link href={`/product/${product.product_id}`} as={`/product/${product.product_id}`}>
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
