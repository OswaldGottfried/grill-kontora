import {ReactNode, createContext, ReactText} from 'react';

type TabsContextType = {
  active: boolean;
  activeIndex: number;
  tabsCount: number;
  onActivate: () => void;
  setActiveContent: (content: ReactNode) => void;
  setActiveTitle: (title: ReactText) => void;
  onClick: (value: string) => void;
};

const TabsContext = createContext<TabsContextType>({
  active: false,
  activeIndex: 0,
  tabsCount: 0,
  onActivate: () => {},
  setActiveContent: () => {},
  setActiveTitle: () => {},
  onClick: () => {},
});

export default TabsContext;
