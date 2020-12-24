import {ReactNode, createContext, ReactText} from 'react';

type TabsContextType = {
  active: boolean;
  activeIndex: number;
  onActivate: () => void;
  setActiveContent: (content: ReactNode) => void;
  setActiveTitle: (title: ReactText) => void;
};

const TabsContext = createContext<TabsContextType>({
  active: false,
  activeIndex: 0,
  onActivate: () => {},
  setActiveContent: () => {},
  setActiveTitle: () => {},
});

export default TabsContext;
