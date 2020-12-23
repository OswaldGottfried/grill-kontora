import {FC} from 'react';

import {CategoryType, ProductType} from 'types';
import HomeLayout from '@/components/home/home';
import {fetchCategories} from 'pages/api/category';
import {fetchProducts} from 'pages/api/products/[id]';

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Home: FC<PropsType> = ({categories, products}) => (
  <HomeLayout categories={categories} products={products} />
);

export async function getStaticProps(): Promise<{props: PropsType}> {
  const categories = await fetchCategories();
  const products = await fetchProducts(categories[0].category_id);

  return {
    props: {
      categories,
      products,
    },
  };
}
export default Home;
