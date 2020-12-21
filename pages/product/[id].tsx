import {GetStaticProps, GetStaticPaths} from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import {FC} from 'react';

import {ProductType, Maybe} from 'types';
import fetchProduct from 'pages/api/fetchProduct';

const Product = dynamic(
  () => import(/* webpackChunkName: "ProductPage" */ '@/components/product/product'),
);

type PropsType = {
  product: Maybe<ProductType>;
};

const ProductPage: FC<PropsType> = ({product}) =>
  product ? (
    <>
      <Head>
        <title>{product.product_name}</title>
      </Head>
      <Product product={product} />
    </>
  ) : null;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<PropsType> = async (context) => {
  let product = null;
  if (context.params && typeof context.params.id === 'string') {
    product = await fetchProduct(context.params.id);
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
