import Head from 'next/head';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

const CartLayout = dynamic(() => import('@/cart/cartLayout/cartLayout'), {
  ssr: false,
});

const Cart: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/', undefined, {shallow: true});
  }, []);

  return (
    <>
      <Head>
        <title>Корзина</title>
      </Head>
      <CartLayout />
    </>
  );
};

export default Cart;
