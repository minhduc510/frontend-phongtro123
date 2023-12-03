import { Skeleton, Stack } from '@mui/material';

const ListPostBoxLoading = () => {
  return (
    <div className="border bg-white sm:rounded-lg py-4 lg:px-5 max-lg:px-4">
      <p className="font-bold max-lg:text-lg lg:text-xl">
        Tin mới đăng
      </p>
      <div className="">
        {Array(5)
          .fill(0)
          .map((item, index) => (
            <div
              key={index + item}
              className=" [&:not(:last-child)]:border-b"
            >
              <Stack
                direction="row"
                spacing={{ xs: 1 }}
                alignItems={'center'}
              >
                <div className="relative lg:w-1/5 max-sm:w-1/4 max-lg:w-[100px] max-lg:h-[80px] h-[60px] rounded-md truncate">
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={100}
                  />
                </div>
                <div className="lg:w-4/5 max-sm:w-3/4 w-full">
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={30}
                  />
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={30}
                  />
                </div>
              </Stack>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListPostBoxLoading;
