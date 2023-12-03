import { Container, Skeleton, Stack } from '@mui/material';

import styles from './styles.module.scss';
import { Logo } from '@/assets';
import {
  MdMenu,
  BsSuitHeart,
  HiOutlineLogout,
  AiOutlineAppstore,
  LiaPlusCircleSolid,
  RiUserReceived2Line,
} from '@/icons';
import { Button } from '@/components';
import { localStorage } from '@/helpers';

const HeaderLoading = () => {
  const { login } = localStorage.getAuth();
  return (
    <header className={styles.header}>
      <div
        className={`${styles.headerTop} bg-white lg:h-[70px] max-lg:h-[60px] max-lg:fixed max-lg:inset-x-0 max-lg:top-0 z-10 shadow-lg`}
      >
        <Container className="h-full">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className="h-full"
          >
            <div>
              <div
                className={`${styles.logo} max-lg:w-[200px] lg:w-[250px]`}
              >
                <Logo />
              </div>
            </div>
            <div className="lg:hidden">
              <MdMenu size={30} />
            </div>
            <Stack
              direction="row"
              spacing={{ xs: 3 }}
              alignItems="center"
              className="max-lg:!hidden"
            >
              {login ? (
                <>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                  >
                    <div className="relative w-[45px] h-[45px] truncate rounded-full border bg-white">
                      <Skeleton
                        variant="circular"
                        width={45}
                        height={45}
                      />
                    </div>
                    <div>
                      <div>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                        >
                          <span>Xin chào, </span>
                          <Skeleton
                            variant="text"
                            width={200}
                            height={30}
                          />
                        </Stack>
                      </div>
                      <Skeleton
                        variant="text"
                        width={200}
                        height={30}
                      />
                    </div>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 0.5 }}
                    className="h-full cursor-pointer"
                  >
                    <AiOutlineAppstore />
                    <p>Quản lý tài khoản</p>
                  </Stack>
                </>
              ) : (
                <>
                  <div>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={{ xs: 0.5 }}
                      className="h-full"
                    >
                      <RiUserReceived2Line />
                      <p>Đăng nhập</p>
                    </Stack>
                  </div>
                  <div>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={{ xs: 0.5 }}
                      className="h-full"
                    >
                      <HiOutlineLogout />
                      <p>Đăng ký</p>
                    </Stack>
                  </div>
                </>
              )}

              <Stack
                direction="row"
                alignItems="center"
                spacing={{ xs: 0.5 }}
              >
                <BsSuitHeart />
                <p>Yêu thích</p>
              </Stack>
              <Button
                type="button"
                content="Đăng tin mới"
                containerStyles="bg-red-primary py-2 w-[140px]"
                iconRight={<LiaPlusCircleSolid />}
              />
            </Stack>
          </Stack>
        </Container>
      </div>
      <div
        className={`max-lg:hidden ${styles.headerBottom} }`}
      >
        <div className={` bg-blue-primary `}>
          <Container>
            <ul
              className={`${styles.headerBottomMenu} text-white max-h-[46px]`}
            >
              {Array(5)
                .fill(0)
                .map((item, index) => (
                  <li
                    key={item + index}
                    className="!py-0 pr-5"
                  >
                    <Skeleton
                      variant="rectangular"
                      width={100}
                      height={46}
                    />
                  </li>
                ))}
            </ul>
          </Container>
        </div>
      </div>
    </header>
  );
};

export default HeaderLoading;
