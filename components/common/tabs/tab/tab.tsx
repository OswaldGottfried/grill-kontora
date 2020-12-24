import {MouseEvent, memo, useContext, useEffect, ReactNode} from 'react';

import TabsContext from '../tabsContext';
import s from './tab.module.scss';

type PropsType = {
  title: string;
  children: ReactNode;
};
const Tab = memo<PropsType>(({title, children}) => {
  const {active, setActiveContent, activeIndex, setActiveTitle, onActivate} = useContext(
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
    if (event) {
      event.preventDefault();
    }
    onActivate();
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-expanded={active}
      onClick={onClickTab}
    >
      {title}
    </button>
  );
});

export default Tab;
