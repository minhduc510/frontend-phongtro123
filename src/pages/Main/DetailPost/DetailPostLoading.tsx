import { Grid, Skeleton, Stack } from '@mui/material';

import './styles.scss';
import styles from './styles.module.scss';
import ListPostBoxLoading from '@/components/ListPostBox/ListPostBoxLoading';

const DetailPostLoading = () => {
  return (
    <>
      <div className={styles.detailPost}>
        <Grid container spacing={{ xs: 2 }}>
          <Grid item xs={12} md={8}>
            <div className="border bg-white sm:rounded-b-lg z-0">
              <div className="relative">
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={350}
                />
              </div>
              <div className="px-2 md:px-5 md:py-4">
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
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  className="mt-2"
                >
                  <p> Chuyên mục:</p>
                  <Skeleton
                    variant="text"
                    width={50}
                    height={30}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ xs: 1 }}
                  className="mt-2"
                >
                  <p>Địa chỉ:</p>
                  <Skeleton
                    variant="text"
                    width={300}
                    height={30}
                  />
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ xs: 5 }}
                  className="mt-3"
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 0.5 }}
                  >
                    <Skeleton
                      variant="text"
                      width={100}
                      height={30}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 0.5 }}
                  >
                    <Skeleton
                      variant="text"
                      width={100}
                      height={30}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 0.5 }}
                  >
                    <Skeleton
                      variant="text"
                      width={100}
                      height={30}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 0.5 }}
                  >
                    <Skeleton
                      variant="text"
                      width={100}
                      height={30}
                    />
                  </Stack>
                </Stack>
                <div className="mt-6">
                  <p className="text-xl font-bold">
                    Thông tin mô tả
                  </p>
                  <div className="mt-3"></div>
                </div>
                <div className="mt-6">
                  <p className="text-xl font-bold">
                    Đặc điểm tin đăng
                  </p>
                  <div className="mt-2 text-sm">
                    <table className="w-full">
                      <tbody>
                        <tr className="">
                          <td className="py-2 pl-2 w-2/6">
                            Mã tin
                          </td>
                          <td className="py-2 w-4/6">
                            <Skeleton
                              variant="text"
                              width={200}
                              height={30}
                            />
                          </td>
                        </tr>
                        <tr className="bg-zinc-100">
                          <td className="py-2 pl-2 w-2/6">
                            Khu vực:
                          </td>
                          <td className="py-2 w-4/6">
                            <Skeleton
                              variant="text"
                              width={200}
                              height={30}
                            />
                          </td>
                        </tr>
                        <tr className="">
                          <td className="py-2 pl-2 w-2/6">
                            Loại tin rao:
                          </td>
                          <td className="py-2 w-4/6">
                            <Skeleton
                              variant="text"
                              width={200}
                              height={30}
                            />
                          </td>
                        </tr>
                        <tr className="bg-zinc-100">
                          <td className="py-2 pl-2 w-2/6">
                            Đối tượng thuê:
                          </td>
                          <td className="py-2 w-4/6">
                            <Skeleton
                              variant="text"
                              width={200}
                              height={30}
                            />
                          </td>
                        </tr>
                        <tr className=" ">
                          <td className="py-2 pl-2 w-2/6">
                            Ngày đăng:
                          </td>
                          <td className="py-2 w-4/6 capitalize">
                            <Skeleton
                              variant="text"
                              width={200}
                              height={30}
                            />
                          </td>
                        </tr>
                        <tr className="bg-zinc-100">
                          <td className="py-2 pl-2 w-2/6">
                            Gói tin:
                          </td>
                          <td className="py-2 w-4/6">
                            <Skeleton
                              variant="text"
                              width={200}
                              height={30}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-xl font-bold">
                    Đặc điểm tin đăng
                  </p>
                  <div className="mt-2 text-sm">
                    <table className="w-full">
                      <tbody>
                        <tr className="">
                          <td className="py-2 pl-2 w-2/6">
                            Liên hệ:
                          </td>
                          <td className="py-2 w-4/6">
                            <Skeleton
                              variant="text"
                              width={200}
                              height={30}
                            />
                          </td>
                        </tr>
                        <tr className="bg-zinc-100 ">
                          <td className="py-2 pl-2 w-2/6">
                            Điện thoại:
                          </td>
                          <td className="py-2 w-4/6">
                            <Skeleton
                              variant="text"
                              width={200}
                              height={30}
                            />
                          </td>
                        </tr>
                        <tr className="">
                          <td className="py-2 pl-2 w-2/6">
                            Zalo:
                          </td>
                          <td className="py-2 w-4/6">
                            <Skeleton
                              variant="text"
                              width={200}
                              height={30}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 md:py-3 md:px-5 border bg-white sm:rounded-lg">
              <Skeleton
                variant="text"
                width={300}
                height={40}
              />
              {Array(5)
                .fill(0)
                .map((item, index) => (
                  <div
                    key={item + index}
                    className="p-4 border-t bg-white"
                  >
                    <Grid container spacing={{ xs: 2 }}>
                      <Grid item xs={4.3}>
                        <div className="">
                          <div className="relative rounded-md truncate h-[230px]">
                            <Skeleton
                              variant="rectangular"
                              width="100%"
                              height="100%"
                            />
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={7.7}>
                        <div className="">
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
                            spacing={{ xs: 3.3 }}
                            flexWrap="wrap"
                            justifyContent="flex-end"
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
                                direction="row"
                                alignItems="center"
                                spacing={{ xs: 1 }}
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
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={{ xs: 2 }}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height={300}
              />
              <ListPostBoxLoading />
            </Stack>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DetailPostLoading;
