import {FC} from 'react';

import {CategoryType} from 'types';

import Link from 'next/link';
import s from './categoryList.module.scss';

type PropsType = {
  categories?: CategoryType[];
  selected: string;
};

const CategoryList: FC<PropsType> = ({categories, selected}) =>
  categories ? (
    <ul className={s.tabs} role="tablist">
      {categories.map(({category_id, category_name}) => (
        <li role="tab" key={category_id} className={s.tab} aria-selected={category_id === selected}>
          <Link href="/category/[id]" as={`/category/${category_id}`} scroll={false}>
            <h2>{category_name}</h2>
          </Link>
        </li>
      ))}
    </ul>
  ) : null;

export default CategoryList;
