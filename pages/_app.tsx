import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { LoginRequired } from '../src/components/LoginRequired';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <LoginRequired>
        <Component {...pageProps} />
      </LoginRequired>
    </SessionProvider>
  );
}

export default MyApp;
