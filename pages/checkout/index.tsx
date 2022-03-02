import {useEffect} from 'react';
import Head from 'next/head';
import {observer} from 'mobx-react-lite';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';

import {useStore} from 'models';
import isServer from 'lib/isServer';
import {LAUNCH_CATEGORY_NAME} from 'constants/lunch';

const CheckoutLayout = dynamic(() => import('@/checkout/checkoutLayout/checkoutLayout'), {
  ssr: false,
});

const Checkout = observer(() => {
  const {totalItems, items, remove} = useStore('cart');

  const router = useRouter();
  const isEmptyCart = totalItems === 0;

  // if (isEmptyCart && !isServer) router.push('/cart', undefined, {shallow: true});
  useEffect(() => {
    router.replace('/cart', undefined, {shallow: true});
  }, []);

  // useEffect(() => {
  //   items.forEach(({id, category}) => {
  //     if (category === LAUNCH_CATEGORY_NAME) {
  //       remove(id);
  //     }
  //   });
  // }, [items, remove]);

  return (
    <>
      <Head>
        <title>Чекаут</title>
      </Head>
      <div className="w-full h-full bg-black">
        <CheckoutLayout />
      </div>
    </>
  );
});

export default Checkout;
