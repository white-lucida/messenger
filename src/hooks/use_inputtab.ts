import { useCallback, useState } from 'react';
import type { TabName } from '../components/EmbedInput';

const useInputTab = (tabNames: readonly TabName[], defaultTab: TabName) => {
  const [currentTabName, setCurrentTabName] = useState(defaultTab);
  const isCurrentTab = useCallback(
    (tabName: TabName) => currentTabName === tabName,
    [currentTabName],
  );
  const changeTab = (tabName: TabName) => setCurrentTabName(tabName);
  return {
    isCurrentTab,
    changeTab,
  };
};

export { useInputTab };
