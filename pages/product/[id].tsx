import Head from 'next/head';
import {GetStaticProps, GetStaticPaths} from 'next';
import {FC} from 'react';

import {ProductType, MayBe} from 'types';
import fetchProduct from 'pages/api/fetchProduct';
import Product from '@/components/product/product';
import Link from 'next/link';

type PropsType = {
  product: MayBe<ProductType>;
};

const ProductPage: FC<PropsType> = ({product}) => {
  if (!product) return null;

  return (
    <>
      <Head>
        <title>{product.product_name}</title>
      </Head>
      <Link href={`/category/${product.menu_category_id}`}>
        <a aria-label="в категорию">{'<'}</a>
      </Link>
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
