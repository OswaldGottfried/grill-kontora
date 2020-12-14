import {FC} from 'react';

import {CategoryType, ProductType} from 'types';
import HomeLayout from '@/components/home/home';
import fetchCategories from 'pages/api/fetchCategories';
import fetchProducts from 'pages/api/fetchProducts';
import {GetStaticProps, GetStaticPaths} from 'next';

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
