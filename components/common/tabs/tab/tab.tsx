import {MouseEvent, memo, useContext, useEffect, ReactNode} from 'react';
import classNames from 'classnames';

import TabsContext from '../tabsContext';
import s from './tab.module.scss';

type PropsType = {
  title: string;
  value: string | number;
  children: ReactNode;
  className?: string;
};
const Tab = memo<PropsType>(({title, value, children, className}) => {
  const {active, setActiveContent, activeIndex, setActiveTitle, onActivate, onClick} = useContext(
    TabsContext,
  );

  useEffect(() => {
    if (active) {
      setActiveContent(children);
      const activeTitle = typeof title === 'string' ? title : activeIndex + 1;
      setActiveTitle(activeTitle);
    }
  }, [active, activeIndex, children, setActiveContent, setActiveTitle, title]);

  const onClickTab = (event: MouseEvent<HTMLButtonElement>) => {
    onActivate();
    onClick(event.currentTarget.value);
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-expanded={active}
      value={value}
      onClick={onClickTab}
      className={classNames(s.tab, className)}
    >
      {title}
    </button>
  );
});

Tab.displayName = 'Tab';

export default Tab;
