import { useCallback, useState } from 'react';

const useCardTab = <T>(defaultTab: T) => {
  const [currentTabName, setCurrentTabName] = useState(defaultTab);
  const isCurrentTab = useCallback((tabName: T) => currentTabName === tabName, [currentTabName]);
  const changeTab = (tabName: T) => setCurrentTabName(tabName);
  return {
    isCurrentTab,
    changeTab,
  };
};

export { useCardTab };
