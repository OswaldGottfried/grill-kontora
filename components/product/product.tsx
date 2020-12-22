import {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {useRouter} from 'next/router';

import Link from 'next/link';

import {ProductType} from 'types';
import Price from '@/components/common/price/price';
import {useStore} from 'models';
import formatPrice from 'lib/formatPrice';

import Button from '@/components/common/buttons/button/button';

import CounterObserver from '@/components/common/buttons/counterObserver/counterObserver';
import getPrice from 'lib/getPriceFromProduct';
import s from './product.module.scss';

type PropsType = {
  product: ProductType;
};

const ProductPage = observer<PropsType>(({product}) => {
  const {addItem} = useStore('cart');
  const isHasModifications = product.modifications && product.modifications.length > 0;
  const router = useRouter();

  const addToCart = useCallback(() => {
    if (!isHasModifications) {
      addItem({
        name: product.product_name,
        id: product.product_id,
        count: 1,
        price: Number(product.price['1']),
        image: `https://gril-kontora.joinposter.com${product.photo}`,
      });
    }

    router.push('/cart');
  }, [addItem, product, isHasModifications, router]);

  return (
    <>
      <section className={s.wrap}>
        <Link href={`/category/${product.menu_category_id}#menu`}>
          <button type="button" className={s.link} aria-label="в категорию" />
        </Link>
        <img
          src={`https://gril-kontora.joinposter.com${product.photo}`}
          className={s.image}
          alt={product.product_name}
        />
        <div className={s.description}>
          <h1>{product.product_name}</h1>
          {isHasModifications ? (
            <ul className={s.modifications}>
              {product.modifications &&
                product.modifications.map(({modificator_id, modificator_name, spots}) => (
                  <li key={modificator_id} className={s.modification}>
                    <div className="w-full inline-flex whitespace-nowrap items-center justify-between">
                      <div>
                        <h3 className={s.title}>{modificator_name}</h3>
                        <div className="w-40 mr-20">
                          <CounterObserver
                            value={modificator_id}
                            modId={modificator_id}
                            product={product}
                          />
                        </div>
                      </div>
                      <Price price={formatPrice(spots[0].price)} />
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="mt-12 mb-12 inline-flex w-full justify-between">
              <div className="max-w-md">
                <CounterObserver value={product.product_id} product={product} />
              </div>
              <Price price={getPrice(product)} />
            </div>
          )}

          <div className="flex w-full justify-center mt-12 mb-12">
            <Button onClick={addToCart} value={product.product_id}>
              <p className="sm:text-lg">Перейти корзину</p>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
});

export default ProductPage;
