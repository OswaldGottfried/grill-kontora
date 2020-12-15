import Head from 'next/head';
import {FC} from 'react';

import {CategoryType, ProductType} from 'types';
import Category from '@/components/category/category';
import TopBanner from '@/components/home/topBanner/topBanner';

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Home: FC<PropsType> = ({categories, products}) => {
  if (!categories || !products) return null;

  return (
    <>
      <Head>
        <title>Гриль контора в Ревде</title>
      </Head>
      <TopBanner />
      <Category categories={categories} products={products} />
    </>
  );
};

export default Home;
