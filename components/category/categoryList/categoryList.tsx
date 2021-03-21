import Link from 'next/link';
import {motion} from 'framer-motion';

import {CategoryType} from 'types';

import s from './categoryList.module.scss';

type PropsType = {
  categories?: CategoryType[];
  selected: string;
};

const CategoryList: React.FC<PropsType> = ({categories, selected}) =>
  categories ? (
    <ul className={s.tabs} role="tablist">
      {categories.map(({category_id, category_name}) => (
        <li role="tab" key={category_id} className={s.tab} aria-selected={category_id === selected}>
          <Link href={`/category/${category_id}`} scroll={false}>
            <h3>
              <button type="button">{category_name}</button>
              {category_id === selected && (
                <motion.div layoutId="outline" className={s.selected} initial={false} />
              )}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  ) : null;

export default CategoryList;
