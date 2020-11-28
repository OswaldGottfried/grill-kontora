import {FC, useState, MouseEvent, useEffect, useMemo} from 'react';
import Link from 'next/link';
import useSWR from 'swr';

import {API} from 'constants/endpoint';
import {ResponseType, ProductType} from 'types';

import instance from 'lib/axios';
import fetchProducts from 'pages/api/fetchProducts';

import Price from '@/components/common/price/price';
import {Button, Box, Card} from 'grommet';
import Image from 'next/image';
import s from './categoryItems.module.css';

type PropsType = {
  selected: string;
  products: ProductType[];
};
// const getData = async (category_id: string) => {
//   const response = await handler(getApiUrl('getProducts', {token: TOKEN, category_id}));
//   return response.json();
// };

const CategoryItems: FC<PropsType> = ({products, selected}) => {
  const {data, error} = useSWR([selected], () => fetchProducts(selected));

  console.log({data, error});

  // const fetchCategoryItems = async (category_id: string) => {
  //   await fetch(getApiUrl('getProducts', {category_id}), {method: 'GET'}).then((products) =>
  //     setProducts(products),
  //   );
  // };

  // useEffect(() => {
  //   fetchCategoryItems(props.selected);
  // }, []);

  // const data = useSWR([getApiUrl('getProducts'), () => getData('0')]);

  // console.log(products);

  // console.log(props);

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
