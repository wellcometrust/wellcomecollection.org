import { UserProvider } from '@auth0/nextjs-auth0';
import { AppProps } from 'next/app';
import '../styles.scss';
import App from '@weco/common/views/pages/_app';

function AppWithUser(props: AppProps): JSX.Element {
  return (
    <UserProvider>
      <App {...props} />
    </UserProvider>
  );
}

export default AppWithUser;
