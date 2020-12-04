import Head from 'next/head';
import {GetStaticProps, GetStaticPaths} from 'next';
import {FC} from 'react';

import {ProductType, MayBe} from 'types';
import fetchProduct from 'pages/api/fetchProduct';

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
      <section>
        <h1>{product.product_name}</h1>
        <ul>
          {Object.keys(product).map((key) => (
            <li key={key}>{`${key}: ${product[key as keyof ProductType]}`}</li>
          ))}
        </ul>
      </section>
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
