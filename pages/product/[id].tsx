import Head from 'next/head';
import {GetStaticProps, GetStaticPaths} from 'next';
import {FC} from 'react';

import {ProductType, Maybe} from 'types';
import fetchProduct from 'pages/api/fetchProduct';
import Product from '@/components/product/product';

type PropsType = {
  product: Maybe<ProductType>;
};

const ProductPage: FC<PropsType> = ({product}) => {
  if (!product) return null;

  console.log(product);

  return (
    <>
      <Head>
        <title>{product.product_name}</title>
      </Head>
      <Product product={product} />
    </>
  );
};

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
