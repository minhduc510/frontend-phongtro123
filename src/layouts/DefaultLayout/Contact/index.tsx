import { Grid, Stack } from '@mui/material';

import path from '@/routes/path';
import ImageSupport from '@/assets/Image/support-bg.jpg';
import { Button, Image } from '@/components';
import { BsFillTelephoneFill, SiZalo } from '@/icons';

const Contact = () => {
  return (
    <div
      className={`lg:px-[3em] max-lg:px-[1em] py-[2em] border-8 border-dashed border-blue-100 rounded-md text-center bg-white my-5 `}
    >
      <div className="relative sm:w-[450px] sm:h-[150px] max-sm:w-[250px] max-sm:h-[90px] mx-auto">
        <Image src={ImageSupport} alt="support-bg" fill />
      </div>
      <p className="my-5 max-lg:text-xs">
        Liên hệ với chúng tôi nếu bạn cần hỗ trợ:
      </p>
      <Grid container rowGap={1}>
        <Grid item xs={6} sm={3}>
          <div className="font-bold">
            <span className="text-orange-primary uppercase text-sm">
              hỗ trợ đăng tin
            </span>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              className="lg:text-lg max-lg:text-sm"
            >
              <div className="lg:hidden w-[20px]">
                <BsFillTelephoneFill size={11} />
              </div>
              <span className="max-lg:hidden">
                Điện thoại:
              </span>
              <span>0902657123</span>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              className="lg:text-lg max-lg:text-sm"
            >
              <div className="lg:hidden w-[20px]">
                <SiZalo size={20} />
              </div>
              <span className="max-lg:hidden">Zalo:</span>
              <span>0902657123</span>
            </Stack>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className="font-bold">
            <span className="text-orange-primary uppercase text-sm">
              hỗ trợ đăng tin
            </span>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              className="lg:text-lg max-lg:text-sm"
            >
              <div className="lg:hidden w-[20px]">
                <BsFillTelephoneFill size={11} />
              </div>
              <span className="max-lg:hidden">
                Điện thoại:
              </span>
              <span>0902657123</span>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              className="lg:text-lg max-lg:text-sm"
            >
              <div className="lg:hidden w-[20px]">
                <SiZalo size={20} />
              </div>
              <span className="max-lg:hidden">Zalo:</span>
              <span>0902657123</span>
            </Stack>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className="font-bold">
            <span className="text-orange-primary uppercase text-sm">
              hỗ trợ đăng tin
            </span>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              className="lg:text-lg max-lg:text-sm"
            >
              <div className="lg:hidden w-[20px]">
                <BsFillTelephoneFill size={11} />
              </div>
              <span className="max-lg:hidden">
                Điện thoại:
              </span>
              <span>0902657123</span>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              className="lg:text-lg max-lg:text-sm"
            >
              <div className="lg:hidden w-[20px]">
                <SiZalo size={20} />
              </div>
              <span className="max-lg:hidden">Zalo:</span>
              <span>0902657123</span>
            </Stack>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className="font-bold">
            <span className="text-orange-primary uppercase text-sm">
              hỗ trợ đăng tin
            </span>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              className="lg:text-lg max-lg:text-sm"
            >
              <div className="lg:hidden w-[20px]">
                <BsFillTelephoneFill size={11} />
              </div>
              <span className="max-lg:hidden">
                Điện thoại:
              </span>
              <span>0902657123</span>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={0.5}
              className="lg:text-lg max-lg:text-sm"
            >
              <div className="lg:hidden w-[20px]">
                <SiZalo size={20} />
              </div>
              <span className="max-lg:hidden">Zalo:</span>
              <span>0902657123</span>
            </Stack>
          </div>
        </Grid>
      </Grid>
      <div className="mt-4">
        <Button
          type="button"
          to={path.contact}
          content="Gửi liên hệ"
          containerStyles="bg-blue-primary rounded-md py-2 lg:w-[150px] max-lg:w-[100px] mx-auto font-bold max-lg:text-sm"
        />
      </div>
    </div>
  );
};

export default Contact;
