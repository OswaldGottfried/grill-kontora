import {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {useRouter} from 'next/router';
import {motion} from 'framer-motion';
import Image from 'next/image';

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
  const {increase, items} = useStore('cart');
  const isHasModifications = product.modifications && product.modifications.length > 0;
  const router = useRouter();

  const addToCart = useCallback(() => {
    const selectedProduct = items.find((item) => item.id === product.product_id);
    if (!isHasModifications && !selectedProduct) {
      increase({
        name: product.product_name,
        id: product.product_id,
        count: 1,
        price: Number(product.price['1']),
        image: product.photo || '',
      });
    }

    router.push('/cart');
  }, [increase, product, isHasModifications, router, items]);

  return (
    <>
      <section className={s.wrap}>
        <Link href={`/category/${product.menu_category_id}#menu`}>
          <button type="button" className={s.link} aria-label="в категорию" />
        </Link>
        <motion.figure className="image md:w-full w-2/5" layoutId={`image_${product.product_name}`}>
          <Image
            src={
              product.photo ? `https://gril-kontora.joinposter.com${product.photo}` : '/burger.svg'
            }
            layout="responsive"
            width={300}
            height={200}
            alt={product.product_name}
          />
        </motion.figure>
        <div className={s.description}>
          <motion.h1 className={s.title} layoutId={product.product_name}>
            {product.product_name}
          </motion.h1>

          {isHasModifications ? (
            <ul className={s.modifications}>
              {product.modifications &&
                product.modifications.map(({modificator_id, modificator_name, spots}) => (
                  <li key={modificator_id} className={s.modification}>
                    <div className="w-full inline-flex whitespace-nowrap items-center justify-between">
                      <div>
                        <h3 className={s.title}>{modificator_name}</h3>
                        <div className="w-40">
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
            <div className="mt-12 mb-12 sm:mt-6 sm:mb-6 inline-flex w-full justify-between">
              <div className="max-w-md">
                <CounterObserver value={product.product_id} product={product} />
              </div>
              <Price price={getPrice(product)} />
            </div>
          )}

          <div className="flex w-full justify-center sm:mt-6 sm:mb-6 mt-12 mb-12">
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
