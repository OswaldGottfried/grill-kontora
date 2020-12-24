import {FC} from 'react';

import {CategoryType, ProductType} from 'types';
import {fetchCategories} from 'pages/api/category';
import {fetchProducts} from 'pages/api/products/[id]';
import {GetStaticProps, GetStaticPaths} from 'next';
import dynamic from 'next/dynamic';

const HomeLayout = dynamic(() => import('@/home/home'));

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Home: FC<PropsType> = ({categories, products}) => (
  <HomeLayout categories={categories} products={products} />
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const categories = await fetchCategories();
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
