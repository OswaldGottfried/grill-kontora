import {useState, memo, Children, cloneElement, isValidElement, ReactNode, ReactText} from 'react';

import TabsContext from './tabsContext';
import s from './tabs.module.scss';

type PropsType = {
  activeIndex?: number;
  onClick: (value: string) => void;
  className?: string;
  children: ReactNode;
};
const Tabs = memo<PropsType>(({activeIndex = 0, children, onClick, className}) => {
  const [activeTab, setActiveTab] = useState(activeIndex);
  const [activeContent, setActiveContent] = useState<ReactNode>();
  const [activeTitle, setActiveTitle] = useState<ReactText>();

  const tabs = Children.map(children, (child, index) => (
    <TabsContext.Provider
      value={{
        active: activeTab === index,
        activeIndex,
        onActivate: () => setActiveTab(index),
        tabsCount: Children.map.length,
        setActiveContent,
        setActiveTitle,
        onClick,
      }}
    >
      {child && isValidElement(child) ? cloneElement(child) : child}
    </TabsContext.Provider>
  ));

  const tabContentTitle = `${activeTitle || ''} Tab Contents`;

  return (
    <div role="tablist" className={className}>
      <div className={s.tabs}>{tabs}</div>
      <div aria-label={tabContentTitle} role="tabpanel" className={s.content}>
        {activeContent}
      </div>
    </div>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
