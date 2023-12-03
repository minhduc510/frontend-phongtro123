import { Skeleton, Stack } from '@mui/material';

const GroupsLoading = () => {
  return (
    <>
      <Stack
        direction="row"
        spacing={{ xs: 2 }}
        justifyContent={{ xs: 'initial', sm: 'center' }}
        className="max-sm:overflow-x-scroll max-lg:px-2"
      >
        {Array(3)
          .fill(0)
          .map((item, index) => (
            <div
              key={item + index}
              className="min-w-[160px] lg:w-[220px] rounded-lg truncate"
            >
              <div className="relative w-full min-h-[100px] lg:h-[120px] truncate">
                <Skeleton
                  animation="wave"
                  variant="rounded"
                  width={'100%'}
                  height={'100%'}
                />
              </div>
              <div className="bg-white text-center max-lg:py-2 lg:py-3">
                <p className="text-sm font-bold text-blue-primary text-ellipsis truncate">
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={100}
                    height={20}
                    className="mx-auto"
                  />
                </p>
              </div>
            </div>
          ))}
      </Stack>
    </>
  );
};

export default GroupsLoading;
