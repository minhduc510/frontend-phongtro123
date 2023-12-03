/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Container, Stack } from '@mui/material';

import { Button } from '..';
import { useAppSelector } from '@/redux/hooks';
import { FaRegHeart, BsFillTelephoneFill } from '@/icons';
import { stateInfoPostSlice } from '@/redux/slices/infoPost';
import { handleTextPrice } from '@/helpers';

const InfoPostHeader = () => {
  const initState = {
    price: 0,
    acreage: 0,
    address: '',
    phone: '',
  };
  const [data, setData] = useState(initState);
  const stateInfoPost = useAppSelector(stateInfoPostSlice);
  useEffect(() => {
    setData(stateInfoPost);
  }, [JSON.stringify(stateInfoPost)]);
  return (
    <div className="bg-white py-1">
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <div>
            <p className="text-xl">
              <span className="font-bold text-green-500">
                {handleTextPrice(data.price)}
              </span>
              <span className="px-1">-</span>
              <span>
                {data.acreage}m<sup>2</sup>
              </span>
            </p>
            <p className="text-sm">{data.address}</p>
          </div>
          <Stack
            direction="row"
            spacing={{ xs: 1 }}
            className="py-1"
          >
            <Button
              type="button"
              content="Yêu thích"
              iconLeft={<FaRegHeart />}
              containerStyles="!text-black border rounded-xl px-4"
            />
            <Button
              type="button"
              content="Nhắn Zalo"
              containerStyles="!text-black border rounded-xl px-4"
            />
            <Button
              type="button"
              iconLeft={<BsFillTelephoneFill />}
              content={`Gọi ngay ${data.phone}`}
              containerStyles="border rounded-xl px-4 bg-emerald-400 font-bold"
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
};

export default InfoPostHeader;
