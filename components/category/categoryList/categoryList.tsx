import {FC, MouseEvent} from 'react';

import {CategoryType} from 'types';

import s from './categoryList.module.css';

type PropsType = {
  categories: CategoryType[];
  selected: string;
  setCategory: (id: string) => void;
};

const CategoryList: FC<PropsType> = ({categories, selected, setCategory}) => {
  const activeIndex = categories.findIndex((category) => category.category_id === selected);

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.value);
  };

  return (
    <ul className={s.tabs} role="tablist">
      {categories.map(({category_id, category_name}, index) => (
        <li role="tab" key={category_id} className={s.tab} aria-selected={index === activeIndex}>
          <button
            className="mt-1 mb-1 pb-4 pt-4"
            type="button"
            value={category_id}
            onClick={onClick}
          >
            <h2 className={s.title}>{category_name}</h2>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
