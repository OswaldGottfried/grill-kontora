import {useState, memo, Children, cloneElement, isValidElement, ReactNode, ReactText} from 'react';

import TabsContext from './tabsContext';
import s from './tabs.module.scss';

type PropsType = {
  activeIndex?: number;
  children: ReactNode;
};
const Tabs = memo<PropsType>(({activeIndex = 0, children}) => {
  const [activeTab, setActiveTab] = useState(activeIndex);
  const [activeContent, setActiveContent] = useState<ReactNode>();
  const [activeTitle, setActiveTitle] = useState<ReactText>();

  const tabs = Children.map(children, (child, index) => (
    <TabsContext.Provider
      value={{
        active: activeTab === index,
        activeIndex,
        onActivate: () => setActiveTab(index),
        setActiveContent,
        setActiveTitle,
      }}
    >
      {child && isValidElement(child) ? cloneElement(child, {active: activeTab === index}) : child}
    </TabsContext.Provider>
  ));

  const tabContentTitle = `${activeTitle || ''} Tab Contents`;

  return (
    <div role="tablist">
      <div>{tabs}</div>
      <div aria-label={tabContentTitle} role="tabpanel">
        {activeContent}
      </div>
    </div>
  );
});

export default Tabs;
