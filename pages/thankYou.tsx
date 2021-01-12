import {observer} from 'mobx-react-lite';

import {useStore} from 'models';
import Button from '@/common/buttons/button/button';
import Link from 'next/link';

const ThankYouPage = observer(() => {
  const {phone} = useStore('checkout');

  return (
    <div className="flex items-center justify-center w-full mt-40 flex-col">
      <h1>Спасибо за заказ</h1>
      <p className="text-xl mt-10">Оператор перезвонит по номеру {phone}</p>
      <Button className="mt-10">
        <Link href="/">Вернуться на главную</Link>
      </Button>
    </div>
  );
});

export default ThankYouPage;
