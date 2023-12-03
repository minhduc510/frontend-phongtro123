import { Suspense, lazy } from 'react';

import GroupsLoading from './GroupsLoading';
const GroupsMain = lazy(() => import('./GroupsMain'));

const Groups = () => {
  return (
    <>
      <Suspense fallback={<GroupsLoading />}>
        <GroupsMain />
      </Suspense>
    </>
  );
};

export default Groups;
