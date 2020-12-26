import Head from 'next/head';
import dynamic from 'next/dynamic';

const CartLayout = dynamic(() => import('@/cart/cartLayout/cartLayout'), {
  ssr: false,
});

const Cart: React.FC = () => (
  <>
    <Head>
      <title>Корзина</title>
    </Head>
    <CartLayout />
  </>
);

export default Cart;
