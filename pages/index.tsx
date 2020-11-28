import Head from 'next/head';
import {FC} from 'react';

import {CategoryType, ProductType} from 'types';
import Promotions from '@/components/home/promotions';
import Category from '@/components/category/category';
import fetchCategories from 'pages/api/fetchCategories';
import fetchProducts from 'pages/api/fetchProducts';

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Home: FC<PropsType> = ({categories, products}) => {
  return (
    <>
      <Head>
        <title>Гриль контора в Ревде</title>
        <link rel="icon" href="/favicon.jpg" />
      </Head>
      <Promotions />
      <Category categories={categories} products={products} />
    </>
  );
};

export async function getStaticProps(): Promise<{props: PropsType}> {
  const categories = await (await fetchCategories()).sort(
    (a, b) => Number(a.sort_order) - Number(b.sort_order),
  );
  const products = await fetchProducts('1');

  return {
    props: {
      categories,
      products,
    },
  };
}
export default Home;
