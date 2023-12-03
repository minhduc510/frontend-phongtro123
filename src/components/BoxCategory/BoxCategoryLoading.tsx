import { Skeleton } from '@mui/material';

const BoxCategoryLoading = () => {
  return (
    <div className="border bg-white sm:rounded-lg py-4 lg:px-5 max-lg:px-4">
      <p className="font-bold max-lg:text-lg lg:text-xl">
        Danh mục cho thuê
      </p>
      <ul className="max-lg:pb-2 lg:py-3">
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
        <Skeleton width="100%" height={40} />
      </ul>
    </div>
  );
};

export default BoxCategoryLoading;
