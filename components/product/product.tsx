import {useCallback, useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import {useRouter} from 'next/router';
import {motion} from 'framer-motion';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import {ProductType} from 'types';
import {useStore} from 'models';
import formatPrice from 'lib/formatPrice';
import getPriceFromProduct from 'lib/getPriceFromProduct';

import Price from '@/common/price/price';
import Button from '@/common/buttons/button/button';
import CounterObserver from '@/common/buttons/counterObserver/counterObserver';

import s from './product.module.scss';

type PropsType = {
  product: ProductType;
};

const ProductPage = observer<PropsType>(({product}) => {
  const {increase, items, count} = useStore('cart');
  const isHasModifications = product.modifications && product.modifications.length > 0;
  const {push, back} = useRouter();

  const ingredients = product.ingredients
    ? product.ingredients
        .map(({ingredient_name}) => ingredient_name)
        .join(', ')
        .toLocaleLowerCase()
    : [];

  useEffect(() => {
    window.gtag('event', 'view_item', {
      content_type: 'product',
      items: [
        {
          id: product.product_id,
          name: product.product_name,
          category: product.category_name,
          price: getPriceFromProduct(product),
        },
      ],
    });
  }, [product]);

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

    push('/cart');
  }, [increase, product, isHasModifications, push, items]);

  return (
    <>
      <section className={s.wrap}>
        <button
          type="button"
          className={s.link}
          aria-label="в категорию"
          onClick={() => {
            back();
          }}
        />

        <motion.figure className="image md:w-full w-2/5" layoutId={`image_${product.photo}`}>
          <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.5)" wrapStyle={{width: '100%', height: '100%'}}>
            <div className="w-full h-full">
              <Image
                src={
                  product.photo_origin
                    ? `https://gril-kontora.joinposter.com${product.photo_origin}`
                    : '/burger.svg'
                }
                layout="responsive"
                width={500}
                height={450}
                objectFit="cover"
                quality={60}
                alt={product.product_name}
              />
            </div>
          </Zoom>
        </motion.figure>
        <div className={s.description}>
          <motion.h1 className={s.title} layoutId={product.product_name}>
            {product.product_name}
            {product.out > 0 && ` ${product.out} гр.`}
          </motion.h1>

          {isHasModifications ? (
            <ul className={s.modifications}>
              {product.modifications &&
                product.modifications.map(({modificator_id, modificator_name, spots}) => (
                  <li key={modificator_id} className={s.modification}>
                    <div className="w-full inline-flex items-center justify-between">
                      <div>
                        <h3 className="mb-4">{modificator_name}</h3>
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
              <Price price={getPriceFromProduct(product)} />
            </div>
          )}

          {ingredients.length > 0 && (
            <h2 className="text-3xl">
              Состав: <p className="text-xl">{ingredients}</p>
            </h2>
          )}

          <div className="flex w-full justify-center sm:mt-6 sm:mb-6 mt-12 mb-12">
            <Button onClick={addToCart} value={product.product_id}>
              <p className="sm:text-lg">
                {count(product.product_id) === 0 ? 'Добавить в корзину' : 'Перейти в корзину'}
              </p>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
});

export default ProductPage;
