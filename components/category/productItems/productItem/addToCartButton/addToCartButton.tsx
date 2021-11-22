import {useRouter} from 'next/router';
import {observer} from 'mobx-react-lite';
import Link from 'next/link';

import {useStore} from 'models';
import {ProductType} from 'types';
import {isLunchCategory, isLunchTime} from 'constants/lunch';

import CounterObserver from '@/common/buttons/counterObserver/counterObserver';
import Button from '@/common/buttons/button/button';

type Props = {
  product: ProductType;
  addToCart: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const AddToCartButton = observer<Props>(({product, addToCart}) => {
  const router = useRouter();
  const {id} = router.query;
  const isLunch = isLunchCategory(String(id));
  const isAvailableForLunch = isLunch && isLunchTime();
  const {count} = useStore('cart');

  return (
    <div className="flex justify-end mr-4 mb-4">
      {/* eslint-disable-next-line no-nested-ternary */}
      {product.modifications ? (
        <Link href={`/product/${product.product_id}`} as={`/product/${product.product_id}`}>
          <Button size="small" color="secondary" isDisabled={isLunch && !isAvailableForLunch}>
            Выбрать объем
          </Button>
        </Link>
      ) : count(product.product_id) === 0 ? (
        <Button
          color="secondary"
          size="small"
          isDisabled={isLunch && !isAvailableForLunch}
          onClick={addToCart}
          value={product.product_id}
        >
          Добавить в корзину
        </Button>
      ) : (
        <CounterObserver
          product={product}
          value={product.product_id}
          isDisabled={isLunch && !isAvailableForLunch}
        />
      )}
    </div>
  );
});

export default AddToCartButton;
