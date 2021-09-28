import {GetStaticPaths, GetStaticProps} from 'next';
import {observer} from 'mobx-react-lite';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

import {useStore} from 'models';
import {fetchOrder} from 'pages/api/order/[orderId]';
import isServer from 'lib/isServer';

import Button from '@/common/buttons/button/button';
import HeartIcon from '@/thankYou/heart/heart';

export type PropsType = {
  orderId: number;
  firstName: string;
  lastName?: string;
  phone: string;
};

const ThankYouPage = observer<PropsType>((props) => {
  const {orderId} = useStore('checkout');
  const {clear} = useStore('cart');
  const {push} = useRouter();

  useEffect(() => {
    clear();
  }, [clear]);

  if (orderId !== props.orderId && !isServer) {
    push('/');
    return null;
  }

  return (
    <div className="flex items-center justify-center w-full mt-20 flex-col pl-6 md:pr-6">
      <h1>
        {props.firstName} {props.lastName}, вы оформили заказ {`#${props.orderId}`}
      </h1>

      <HeartIcon />

      <p className="text-2xl mt-10">Спасибо за заказ</p>
      <p className="text-xl mt-10">Оператор перезвонит по номеру {props.phone} как можно скорее</p>
      <Button className="mt-10 mb-10">
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </div>
  );
});

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps<PropsType> = async (context) => {
  let order = null;
  if (context.params && typeof context.params.orderId === 'string') {
    order = await fetchOrder(context.params.orderId).then((res) => res);
  }

  if (order === null)
    return {
      props: {
        orderId: 0,
        firstName: '',
        phone: '',
      },
    };

  return {
    props: {
      orderId: order.incoming_order_id,
      firstName: order.first_name,
      lastName: order.last_name || '',
      phone: order.phone,
    },
  };
};

export default ThankYouPage;
