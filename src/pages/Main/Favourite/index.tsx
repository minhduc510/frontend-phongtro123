import { useState, useEffect, Fragment } from 'react';

import { apiClient2 } from '@/api';
import { Loading, PostItem } from '@/components';

const Favourite = () => {
  const [postsTotal, setPostsTotal] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const { error, data } =
        await apiClient2.getPostFavourite();
      if (!error) {
        setPostsTotal(data.totalPost);
        setPosts(data.posts);
      }
      setLoading(false);
    };
    callApi();
  }, []);

  return (
    <>
      <div className=" border rounded-t-lg">
        <div className="bg-white max-lg:p-3 lg:p-5 rounded-t-lg">
          {loading ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : posts.length > 0 ? (
            <>
              <p className="font-bold max-lg:text-lg lg:text-xl">
                Tổng {postsTotal} kết quả
              </p>
              <div>
                {posts.map((item, index) => (
                  <Fragment key={index}>
                    <PostItem data={item} />
                  </Fragment>
                ))}
              </div>
            </>
          ) : (
            <p>Không có bài viết nào!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Favourite;

{
  /* <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 1 }}
            className="mt-2 max-lg:text-sm"
          >
            <span>Sắp xếp:</span>
            <div
              className={`py-1 px-2 rounded-md bg-gray-100 cursor-pointer ${
                !latestPost ? 'font-bold underline' : ''
              }`}
              onClick={() => setLatestPost(false)}
            >
              Mặc định
            </div>
            <div
              className={`py-1 px-2 rounded-md bg-gray-100 cursor-pointer ${
                latestPost ? 'font-bold underline' : ''
              }`}
              onClick={() => setLatestPost(true)}
            >
              Mới nhất
            </div>
          </Stack> */
}
