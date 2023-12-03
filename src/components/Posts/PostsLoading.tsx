import { Stack, Skeleton, Grid } from '@mui/material';

const PostsLoading = () => {
  return (
    <div className=" border rounded-t-lg">
      <div className="bg-white p-5 rounded-t-lg">
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          className="font-bold text-xl "
        >
          <span>Tổng</span>
          <Skeleton
            variant="text"
            width={30}
            height={40}
          />{' '}
          <span> kết quả</span>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 1 }}
          className="mt-2"
        >
          <span>Sắp xếp:</span>
          <div className="py-1 px-2 rounded-md bg-gray-100">
            Mặc định
          </div>
          <div className="py-1 px-2 rounded-md bg-gray-100">
            Mới nhất
          </div>
        </Stack>
      </div>
      {Array(20)
        .fill(0)
        .map((item, index) => (
          <div
            key={item + index}
            className="lg:p-4 border-t bg-white"
          >
            <Grid container spacing={{ xs: 2 }}>
              <Grid item xs={12} lg={4.3}>
                <div className="">
                  <div className="relative lg:rounded-md truncate max-sm:h-[250px] max-lg:h-[300px] lg:h-[200px]">
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height="100%"
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} lg={7.7}>
                <div className="max-lg:px-2 max-lg:pb-5">
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={40}
                  />
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={40}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ lg: 3.3 }}
                    columnGap={{ xs: 2, lg: 0 }}
                    flexWrap="wrap"
                    justifyContent={{ lg: 'flex-end' }}
                  >
                    <Skeleton
                      variant="text"
                      width={50}
                      height={40}
                    />
                    <Skeleton
                      variant="text"
                      width={50}
                      height={40}
                    />
                    <Skeleton
                      variant="text"
                      width={50}
                      height={40}
                    />
                    <Skeleton
                      variant="text"
                      width={50}
                      height={40}
                    />
                  </Stack>
                  <div>
                    <Skeleton
                      variant="text"
                      width="100%"
                      height={15}
                    />
                    <Skeleton
                      variant="text"
                      width="100%"
                      height={15}
                    />
                    <Skeleton
                      variant="text"
                      width="100%"
                      height={15}
                    />
                    <Skeleton
                      variant="text"
                      width="100%"
                      height={15}
                    />
                  </div>
                  <div className="mt-3">
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack
                        direction={{
                          xs: 'column',
                          lg: 'row',
                        }}
                        justifyContent="space-between"
                        alignItems={{
                          xs: 'end',
                          lg: 'center',
                        }}
                        rowGap={{ xs: 1, lg: 0 }}
                      >
                        <Skeleton
                          variant="circular"
                          width={35}
                          height={35}
                        />
                        <Skeleton
                          variant="text"
                          width={50}
                          height={40}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={{ xs: 1 }}
                      >
                        <Skeleton
                          variant="text"
                          width={100}
                          height={40}
                        />
                        <Skeleton
                          variant="text"
                          width={100}
                          height={40}
                        />
                      </Stack>
                    </Stack>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        ))}
    </div>
  );
};

export default PostsLoading;
