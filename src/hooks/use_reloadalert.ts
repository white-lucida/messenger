import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';

const useReloadAlert = () => {
  const listener = (e: BeforeUnloadEvent) => {
    e.returnValue = 'このままページを移動すると、メッセージが送信されません。';
  };

  const router = useRouter();
  const [isForbidden, setIsForbidden] = useState(false);

  const onRouteChange = () => {
    const answer = window.confirm('このままページを移動すると、メッセージが送信されません。');
    if (!answer) {
      throw 'Abort route';
    } else {
      console.log('off (route change)');
      window.removeEventListener('beforeunload', listener);
      router.events.off('routeChangeStart', onRouteChange);
    }
  };

  const forbidToReload = () => {
    if (isForbidden) return;
    console.log('on');
    window.addEventListener('beforeunload', listener);
    router.events.on('routeChangeStart', onRouteChange);
    setIsForbidden(true);
  };

  const allowToReload = () => {
    if (!isForbidden) return;
    console.log('off');
    window.removeEventListener('beforeunload', listener);
    router.events.off('routeChangeComplete', onRouteChange);
    setIsForbidden(false);
  };

  return {
    allowToReload,
    forbidToReload,
  };
};

export { useReloadAlert };
