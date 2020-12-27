import {FC} from 'react';
import dynamic from 'next/dynamic';
import {GetStaticProps} from 'next';

import {CategoryType, ProductType} from 'types';
import {fetchCategories} from 'pages/api/category';
import {fetchProducts} from 'pages/api/products/[id]';

const HomeLayout = dynamic(() => import('@/home/home'));

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Home: FC<PropsType> = ({categories, products}) => (
  <HomeLayout categories={categories} products={products} />
);

export const getStaticProps: GetStaticProps = async () => {
  const categories = await fetchCategories();
  const productId = categories[0].category_id;
  const products = await fetchProducts(productId);

  return {
    props: {
      categories,
      products,
    },
  };
};

export default Home;
