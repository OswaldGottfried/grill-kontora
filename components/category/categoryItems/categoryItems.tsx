import {FC} from 'react';

import {ProductType} from 'types';
import Link from 'next/link';

import Price from '@/components/common/price/price';
import {Button} from 'grommet';
import s from './categoryItems.module.scss';

type PropsType = {
  products: ProductType[];
};

const CategoryItems: FC<PropsType> = ({products}) =>
  products ? (
    <ul className={s.items}>
      {products.map((product) => (
        <li key={product.product_id} className={s.item}>
          <Link href="/product/[id]" as={`/product/${product.product_id}`}>
            <img className={s.image} src={product.photo} alt={product.product_name} />
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

export default CategoryItems;
