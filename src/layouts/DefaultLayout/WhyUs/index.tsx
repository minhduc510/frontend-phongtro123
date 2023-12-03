import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import path from '@/routes/path';
import { useAppSelector } from '@/redux/hooks';
import { stateMenusSlice } from '@/redux/slices/menus';
import { HiStar } from '@/icons';
import { Button } from '@/components';
import { Fragment } from 'react';

const WhyUs = () => {
  const menus = useAppSelector(stateMenusSlice);
  return (
    <div
      className={`lg:px-[3em] max-lg:px-[1em] py-[2em] border sm:rounded-lg sm:text-center bg-white my-5`}
    >
      <h4 className="font-bold lg:text-xl max-lg:text-lg">
        Tại sao lại chọn PhongTro123.com?
      </h4>
      <p className="mt-5 max-lg:text-sm">
        Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng
        Phongtro123.com tự hào là trang web đứng top google
        về các từ khóa:{' '}
        {menus.length > 0 &&
          menus.map(
            (item, index) =>
              index > 0 && (
                <Fragment key={item.slug}>
                  {' '}
                  <Link
                    className="font-bold text-blue-primary hover:text-orange-primary lowercase"
                    to={item.slug}
                  >
                    {item.name}
                  </Link>
                  <span>, </span>
                </Fragment>
              ),
          )}
        ...Vì vậy tin của bạn đăng trên website sẽ tiếp cận
        được với nhiều khách hàng hơn, do đó giao dịch nhanh
        hơn, tiết kiệm chi phí hơn
      </p>
      <Stack
        direction="row"
        className="my-5"
        flexWrap="wrap"
        rowGap={{ xs: 1, lg: 0 }}
      >
        <div className="sm:w-1/4 max-sm:w-1/2">
          <span className="block font-bold lg:text-2xl max-lg:text-lg">
            116.998+
          </span>
          <span className="block max-lg:text-sm">
            Thành viên
          </span>
        </div>
        <div className="sm:w-1/4 max-sm:w-1/2">
          <span className="block font-bold lg:text-2xl max-lg:text-lg">
            116.998+
          </span>
          <span className="block max-lg:text-sm">
            Thành viên
          </span>
        </div>
        <div className="sm:w-1/4 max-sm:w-1/2">
          <span className="block font-bold lg:text-2xl max-lg:text-lg">
            116.998+
          </span>
          <span className="block max-lg:text-sm">
            Thành viên
          </span>
        </div>
        <div className="sm:w-1/4 max-sm:w-1/2">
          <span className="block font-bold lg:text-2xl max-lg:text-lg">
            116.998+
          </span>
          <span className="block max-lg:text-sm">
            Thành viên
          </span>
        </div>
      </Stack>
      <h4 className="font-bold lg:text-xl max-lg:text-lg">
        Chi phí thấp, hiệu quả tối đa
      </h4>
      <Stack
        direction="row"
        justifyContent={{ sm: 'center' }}
        className="my-1"
      >
        <HiStar color="#ffd454" size={25} />
        <HiStar color="#ffd454" size={25} />
        <HiStar color="#ffd454" size={25} />
        <HiStar color="#ffd454" size={25} />
        <HiStar color="#ffd454" size={25} />
      </Stack>
      <p className="italic font-light my-2 max-lg:text-sm">
        "Trước khi biết website phongtro123, mình phải tốn
        nhiều công sức và chi phí cho việc đăng tin cho
        thuê: từ việc phát tờ rơi, dán giấy, và đăng lên các
        website khác nhưng hiệu quả không cao. Từ khi biết
        website phongtro123.com, mình đã thử đăng tin lên và
        đánh giá hiệu quả khá cao trong khi chi phí khá
        thấp, không còn tình trạng phòng trống kéo dài."
      </p>
      <p>Anh Khánh (chủ hệ thống phòng trọ tại Tp.HCM)</p>
      <h4 className="font-bold lg:text-xl max-lg:text-lg mt-6">
        Bạn đang có phòng trọ / căn hộ cho thuê?
      </h4>
      <p className="py-3 max-lg:text-sm">
        Không phải lo tìm người cho thuê, phòng trống kéo
        dài
      </p>
      <div className="mt-2 text-center">
        <Button
          type="button"
          to={path.postPosts}
          content="Đăng tin ngay"
          containerStyles="bg-red-primary rounded-md py-2 lg:w-[150px] max-lg:w-[100px] max-lg:text-sm mx-auto font-bold"
        />
      </div>
    </div>
  );
};

export default WhyUs;
