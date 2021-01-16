import {GetStaticProps, GetStaticPaths, GetStaticPathsResult} from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import {CategoryType, ProductType} from 'types';
import {fetchCategories} from 'pages/api/category';
import {fetchProducts} from 'pages/api/products/[id]';

const HomeLayout = dynamic(() => import('@/home/home'));

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
  categoryName: string;
};

const Category: React.FC<PropsType> = ({categories, products, categoryName}) => (
  <>
    <Head>
      <title>{categoryName}</title>
    </Head>
    <HomeLayout categories={categories} products={products} />
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await fetchCategories();
  const paths: GetStaticPathsResult['paths'] = categories.map(({category_id}) => ({
    params: {id: category_id},
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const categories = await fetchCategories();
  let products = null;
  if (params && typeof params.id === 'string') {
    products = await fetchProducts(params.id);
  }

  const categoryName =
    categories.find(({category_id}) => category_id === params?.id)?.category_name || '';

  return {
    props: {
      categories,
      products,
      categoryName,
    },
  };
};

export default Category;
