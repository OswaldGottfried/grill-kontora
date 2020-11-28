import Head from 'next/head';
import {Heading} from 'grommet';

const Cart = () => {
  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>

      <section className="pl-16 pr-16 pt-16">
        <Heading>У вас отличный вкус!</Heading>
      </section>
    </>
  );
};

export default Cart;
