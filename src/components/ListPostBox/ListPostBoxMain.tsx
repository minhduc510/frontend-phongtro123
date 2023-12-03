import { Stack } from '@mui/material';
import { useState, useEffect } from 'react';

import path from '@/routes/path';
import styles from './styles.module.scss';
import { Image } from '..';
import { apiClient } from '@/api';
import { Link } from 'react-router-dom';
import {
  handleTextLong,
  handleTextPrice,
  generateSrcImage,
  handleTimeFromNow,
} from '@/helpers';

interface IPostsProps {
  id: number;
  title: string;
  price: number;
  updated_at: string;
  image: string;
}

const ListPostBoxMain = () => {
  const [posts, setPosts] = useState<IPostsProps[]>([]);

  useEffect(() => {
    const callApi = async () => {
      const { error, data } = await apiClient.newPosts();
      if (!error) {
        setPosts(data);
      }
    };
    callApi();
  }, []);
  return (
    <div className="border bg-white sm:rounded-lg py-4 lg:px-5 max-lg:px-4">
      <p className="font-bold max-lg:text-lg lg:text-xl">
        Tin mới đăng
      </p>
      <div className="lg:mt-3">
        {posts?.length > 0 &&
          posts.map((item) => (
            <div
              key={item.id}
              className={`${styles.wrapNewPost} py-3 [&:not(:last-child)]:border-b`}
            >
              <Link
                to={`/${path.detail.split('/')[1]}/${
                  item.id
                }`}
              >
                <Stack direction="row" spacing={{ xs: 1 }}>
                  <div className="relative lg:w-1/5 max-sm:w-1/4 max-lg:w-[100px] max-lg:h-[80px] h-[60px] rounded-md truncate">
                    <Image
                      alt="post"
                      src={generateSrcImage(item.image)}
                      fill
                      objectFit="cover"
                    />
                  </div>
                  <div className="lg:w-4/5 max-sm:w-3/4 w-full">
                    <p className="text-sm">
                      {Number(
                        import.meta.env
                          .VITE_URL_BREAKPOINT_SM,
                      ) < window.innerWidth &&
                      window.innerWidth <
                        Number(
                          import.meta.env
                            .VITE_URL_BREAKPOINT_LG,
                        )
                        ? item.title
                        : handleTextLong(item.title, 55)}
                    </p>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                    >
                      <span className="font-bold text-sm text-green-500">
                        {handleTextPrice(item.price)}
                      </span>
                      <span className="lg:text-sm max-lg:text-xs text-gray-400">
                        {handleTimeFromNow(item.updated_at)}
                      </span>
                    </Stack>
                  </div>
                </Stack>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListPostBoxMain;
