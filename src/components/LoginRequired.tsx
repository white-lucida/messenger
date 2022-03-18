import { signIn, useSession } from 'next-auth/react';
import { Button } from './ui';

type LoginRequiredProps = {
  children: React.ReactNode;
};

const LoginRequired: React.VFC<LoginRequiredProps> = ({ children }) => {
  const session = useSession();
  if (session.status !== 'authenticated')
    return (
      <>
        <p>ログインできません</p>
        <Button onClick={() => signIn()} label='ログイン' />
      </>
    );
  return <>{children}</>;
};

export { LoginRequired };
