import { ReactNode, FunctionComponent } from 'react';
import Layout from '../Layout/Layout';

type Props = {
  children: ReactNode;
};

const Layout6: FunctionComponent<Props> = ({ children }: Props) => (
  <Layout
    gridSizes={{
      s: 12,
      m: 6,
      shiftM: 1,
      l: 6,
      shiftL: 1,
      xl: 6,
      shiftXl: 1,
    }}
  >
    {children}
  </Layout>
);

export default Layout6;
