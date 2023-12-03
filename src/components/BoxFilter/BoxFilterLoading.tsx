import { Skeleton } from '@mui/material';

const BoxFilterLoading = ({ type }: { type: string }) => {
  return (
    <div className="border bg-white sm:rounded-lg py-4 lg:px-5 max-lg:px-4">
      <p className="font-bold max-lg:text-lg lg:text-xl">
        Xem theo {type === 'price' ? 'giá' : 'diện tích'}
      </p>
      <ul className="py-3">
        {Array(10)
          .fill(0)
          .map((item, index) => (
            <li
              key={item + index}
              className="w-1/2 inline-block"
            >
              <Skeleton
                variant="text"
                width="90%"
                height={40}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BoxFilterLoading;
