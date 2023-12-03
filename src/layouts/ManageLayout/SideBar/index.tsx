import { Suspense, lazy } from 'react';

import SideBarLoading from './SideBarLoading';

const SideBarMain = lazy(() => import('./SideBarMain'));

const SideBar = () => {
  return (
    <>
      <Suspense fallback={<SideBarLoading />}>
        <SideBarMain />
      </Suspense>
    </>
  );
};

export default SideBar;
