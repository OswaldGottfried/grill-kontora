import dynamic from 'next/dynamic';
import {Element} from 'react-scroll';
import {useRouter} from 'next/router';

import {CategoryType, ProductType} from 'types';

import LunchMessage from './lunchMessage/lunchMessage';
import s from './category.module.scss';

const CategoryList = dynamic(() => import('@/category/categoryList/categoryList'), {ssr: false});
const ProductItems = dynamic(() => import('@/category/productItems/productItems'), {ssr: false});

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Category: React.FC<PropsType> = ({categories, products}) => {
  const {query} = useRouter();
  if (categories.length === 0) return null;
  const selected = typeof query.id === 'string' ? query.id : categories[0].category_id;

  return (
    <section className={s.wrap}>
      <Element id="menu" className="sm: mt-6" name="menu">
        <h2>Меню</h2>
      </Element>
      <CategoryList categories={categories} selected={selected} />
      <LunchMessage categoryId={selected} />
      <ProductItems products={products} />
    </section>
  );
};

export default Category;
