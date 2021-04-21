import {GetStaticProps, GetStaticPaths, GetStaticPathsResult} from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

import {fetchCategories} from 'pages/api/category';
import {fetchProduct} from 'pages/api/product/[id]';
import {fetchProducts} from 'pages/api/products/[id]';
import {ProductType, Maybe} from 'types';

const Product = dynamic(() => import('@/product/product'));

type PropsType = {
  product: Maybe<ProductType>;
};

const ProductPage: React.FC<PropsType> = ({product}) =>
  product ? (
    <>
      <Head>
        <title>{product.product_name} в Ревде - Гриль контора</title>
      </Head>
      <Product product={product} />
    </>
  ) : null;

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await fetchCategories();
  const paths: GetStaticPathsResult['paths'] = [];

  categories.forEach(({category_id}) => {
    fetchProducts(category_id).then((products) =>
      products.map(({product_id: id}) => paths.push({params: {id}})),
    );
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PropsType> = async ({params}) => {
  let product = null;
  if (params && typeof params.id === 'string') {
    product = await fetchProduct(params.id);
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
