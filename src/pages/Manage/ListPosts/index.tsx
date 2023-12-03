import { Suspense, lazy } from 'react';

import ListPostsLoading from './ListPostsLoading';

const ListPostsMain = lazy(() => import('./ListPostsMain'));

const ListPosts = () => {
  return (
    <>
      <Suspense fallback={<ListPostsLoading />}>
        <ListPostsMain />
      </Suspense>
    </>
  );
};

export default ListPosts;
