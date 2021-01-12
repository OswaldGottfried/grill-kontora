import {GetStaticProps, GetStaticPaths} from 'next';
import dynamic from 'next/dynamic';

import {CategoryType, ProductType} from 'types';
import {fetchCategories} from 'pages/api/category';
import {fetchProducts} from 'pages/api/products/[id]';
import {categorySortRule} from '../api/category';

const HomeLayout = dynamic(() => import('@/home/home'));

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Category: React.FC<PropsType> = ({categories, products}) => (
  <HomeLayout categories={categories} products={products} />
);

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = Object.keys(categorySortRule);
  return {
    paths: ids.map((id) => ({params: {id}})),
    fallback: false,
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

export default Category;
