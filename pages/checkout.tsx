import Head from 'next/head';
import {observer} from 'mobx-react-lite';
import {useRouter} from 'next/router';

import {useStore} from 'models';
import isServer from 'lib/isServer';

const Cart = observer(() => {
  const {totalItems} = useStore('cart');
  const router = useRouter();
  const isEmptyCart = totalItems === 0;

  if (isEmptyCart && !isServer) router.push('/cart', undefined, {shallow: true});

  return (
    <>
      <Head>
        <title>Чекаут</title>
      </Head>
      <section className="pl-16 pr-16 pt-16 sm:p-4 sm:mb-12">
        <h1 className="mb-8">Чекаут!</h1>
      </section>
    </>
  );
});

export default Cart;
