import Head from 'next/head';
import {FC} from 'react';

import {CategoryType, ProductType} from 'types';
import Promotions from '@/components/home/promotions';
import Category from '@/components/category/category';
import fetchCategories from 'pages/api/fetchCategories';
import fetchProducts from 'pages/api/fetchProducts';
import {DEFAULT_CATEGORY} from 'constants/category';

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Home: FC<PropsType> = ({categories, products}) => {
  return (
    <>
      <Head>
        <title>Гриль контора в Ревде</title>
      </Head>
      <Promotions />
      <Category categories={categories} products={products} />
    </>
  );
};

export async function getStaticProps(): Promise<{props: PropsType}> {
  const categories = await fetchCategories();
  const products = await fetchProducts(DEFAULT_CATEGORY);

  return {
    props: {
      categories,
      products,
    },
  };
}
export default Home;
