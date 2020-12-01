import {FC} from 'react';
import {Button} from 'grommet';

import {ProductType} from 'types';
import Price from '@/components/common/price/price';
import Link from 'next/link';

import s from './productItems.module.scss';

type PropsType = {
  products: ProductType[];
};

const ProductItems: FC<PropsType> = ({products}) =>
  products ? (
    <ul className={s.items}>
      {products.map((product) => (
        <li key={product.product_id} className={s.item}>
          <Link href="/product/[id]" as={`/product/${product.product_id}`}>
            <img
              className={s.image}
              width={300}
              height={300}
              src={product.photo || './buffalo.jpeg'}
              alt={product.product_name}
            />
          </Link>
          <Link href="/product/[id]" as={`/product/${product.product_id}`}>
            <h3 className={s.title}>{product.product_name}</h3>
          </Link>
          <div className={s.cta}>
            <Price price={Number(product.cost)} isExact={product.modifications?.length > 0} />
            <Button primary label="Добавить в корзину" />
          </div>
        </li>
      ))}
    </ul>
  ) : null;

export default ProductItems;
