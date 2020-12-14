import {FC} from 'react';

import {ProductType} from 'types';
import Link from 'next/link';

import Price from '@/components/common/price/price';
import CircleButton from '@/components/common/buttons/circleButton/circleButton';
import s from './product.module.scss';

type PropsType = {
  product: ProductType;
};

const ProductPage: FC<PropsType> = ({product}) => (
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
                <div>
                  <h2 className={s.title}>{modificator_name}</h2>
                  <Price price={100} />
                </div>

                <CircleButton value={product.product_id} label="Добавить в корзину" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  </>
);

export default ProductPage;
