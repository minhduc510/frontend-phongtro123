import { Suspense, lazy } from 'react';

import HeaderLoading from './HeaderLoading';

const HeaderMain = lazy(() => import('./HeaderMain'));

const Header = () => {
  return (
    <>
      <Suspense fallback={<HeaderLoading />}>
        <HeaderMain />
      </Suspense>
    </>
  );
};

export default Header;
