import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {motion} from 'framer-motion';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import {ProductType} from 'types';
import formatPrice from 'lib/formatPrice';
import getPriceFromProduct from 'lib/getPriceFromProduct';

import Price from '@/common/price/price';
import CounterObserver from '@/common/buttons/counterObserver/counterObserver';
import ProductImage from '@/common/image/Image';

import Arrow from './img/arrow.svg';
import AddToCartButton from './addToCartButton/addToCartButton';
import s from './product.module.scss';

type PropsType = {
  product: ProductType;
};

const ProductPage: React.FC<PropsType> = ({product}) => {
  const isHasModifications = product.modifications && product.modifications.length > 0;
  const {back} = useRouter();

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

  return (
    <section className={s.wrap}>
      <button type="button" className={s.link} aria-label="в категорию" onClick={() => back()}>
        <Arrow />
      </button>

      <div>
        <Zoom overlayBgColorEnd="rgba(0, 0, 0, 0.5)" wrapStyle={{width: '100%', height: '100%'}}>
          <ProductImage
            className="w-full h-full"
            name={product.product_name}
            src={product.photo_origin}
            objectFit="contain"
          />
        </Zoom>
      </div>
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
            Состав: <p className="text-base">{ingredients}</p>
          </h2>
        )}

        <AddToCartButton product={product} isHasModifications={isHasModifications} />
      </div>
    </section>
  );
};

export default ProductPage;
