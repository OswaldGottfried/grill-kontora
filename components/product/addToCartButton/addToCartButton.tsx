import {useCallback} from 'react';
import {useRouter} from 'next/router';

import {ProductType} from 'types';
import {useStore} from 'models';

import Button from '@/common/buttons/button/button';

type PropsType = {
  isHasModifications?: boolean;
  product: ProductType;
};

const AddToCartButton: React.FC<PropsType> = ({product, isHasModifications}) => {
  const {increase, items, count} = useStore('cart');
  const {push} = useRouter();

  const addToCart = useCallback(() => {
    const selectedProduct = items.find((item) => item.id === product.product_id);
    if (!isHasModifications && !selectedProduct) {
      increase({
        name: product.product_name,
        id: product.product_id,
        count: 1,
        category: product.category_name,
        price: Number(product.price['1']),
        image: product.photo || '',
      });
    }

    push('/cart');
  }, [increase, product, isHasModifications, push, items]);
  return (
    <div className="flex w-full justify-center sm:mt-6 sm:mb-6 mt-12 mb-12">
      <Button onClick={addToCart} value={product.product_id}>
        <p className="sm:text-lg">
          {count(product.product_id) === 0 ? 'Добавить в корзину' : 'Перейти в корзину'}
        </p>
      </Button>
    </div>
  );
};

export default AddToCartButton;
