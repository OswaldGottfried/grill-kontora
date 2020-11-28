import {FC} from 'react';
import useSWR from 'swr';

import {ProductType} from 'types';

import fetchProducts from 'pages/api/fetchProducts';

import Price from '@/components/common/price/price';
import {Button} from 'grommet';
import s from './categoryItems.module.css';

type PropsType = {
  selected: string;
  products: ProductType[];
};

const CategoryItems: FC<PropsType> = ({products, selected}) => {
  // const {data, error} = useSWR([selected], () => fetchProducts(selected));

  return (
    <ul className={s.items}>
      {products.map((product) => (
        <li key={product.product_id} className={s.item}>
          <img className={s.image} src={product.photo} alt={product.product_name} />

          <h3 className={s.title}>{product.product_name}</h3>
          <div className={s.cta}>
            <Price price={Number(product.cost)} isExact={product.modifications?.length > 0} />
            <Button primary label="Добавить в корзину" />
          </div>
        </li>
      ))}
    </ul>
  );
};

// export const getServerSideProps = async () => {
//   const data = await fetch(getApiUrl('getProducts', {category_id: '1'}), {method: 'GET'});
//   return {props: {data}};
// };

export default CategoryItems;
