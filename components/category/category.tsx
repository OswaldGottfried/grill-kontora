import {FC} from 'react';
import dynamic from 'next/dynamic';
import {Element} from 'react-scroll';
import {useRouter} from 'next/router';

import {CategoryType, ProductType} from 'types';

const CategoryList = dynamic(() => import('@/category/categoryList/categoryList'));
const ProductItems = dynamic(() => import('@/category/productItems/productItems'));

type PropsType = {
  categories: CategoryType[];
  products: ProductType[];
};

const Category: FC<PropsType> = ({categories, products}) => {
  const {query} = useRouter();
  const selected = typeof query.id === 'string' ? query.id : categories[0].category_id;

  return (
    <section className="p-16 xl:p-12 md:p-6 sm:p-4 bg-black">
      <h2 id="menu" className="sm: mt-6">
        <Element name="menu">Меню</Element>
      </h2>
      <CategoryList categories={categories} selected={selected} />
      <ProductItems products={products} />
    </section>
  );
};

export default Category;
