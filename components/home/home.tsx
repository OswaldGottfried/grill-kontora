import Head from 'next/head';
import dynamic from 'next/dynamic';
import {FC} from 'react';

import {CategoryType, ProductType} from 'types';

const TopBanner = dynamic(() => import('@/home/topBanner/topBanner'));
const Category = dynamic(() => import('@/category/category'));

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Home: FC<PropsType> = ({categories, products}) => {
  if (!categories || !products) return null;
  return (
    <>
      <TopBanner />
      <Category categories={categories} products={products} />
    </>
  );
};

export default Home;
