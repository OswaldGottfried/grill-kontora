import Head from 'next/head';
import {FC} from 'react';

import {CategoryType, ProductType} from 'types';
import Promotions from '@/components/home/promotions/promotions';
import Category from '@/components/category/category';
import fetchCategories from 'pages/api/fetchCategories';
import fetchProducts from 'pages/api/fetchProducts';
import {GetStaticProps, GetStaticPaths} from 'next';
import ProductModal from '@/components/product/modal';

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Home: FC<PropsType> = ({categories, products}) => (
  <>
    <Head>
      <title>Гриль контора в Ревде</title>
    </Head>
    <Promotions />
    <Category categories={categories} products={products} />
    <ProductModal products={products} />
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const categories = await (await fetchCategories()).sort(
    (a, b) => Number(a.sort_order) - Number(b.sort_order),
  );
  let products = null;
  if (params && typeof params.id === 'string') {
    products = await fetchProducts(params.id);
  }

  return {
    props: {
      categories,
      products,
    },
  };
};
export default Home;
