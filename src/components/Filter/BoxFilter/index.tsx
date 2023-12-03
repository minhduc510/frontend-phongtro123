/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import { Stack } from '@mui/material';

import styles from './styles.module.scss';
import { apiClient } from '@/api';
import { ImArrowLeft2 } from '@/icons';
import { customRound } from '@/helpers';
import { useAppSelector } from '@/redux/hooks';
import { stateRangesSlice } from '@/redux/slices/ranges';
import { stateCategoriesSlice } from '@/redux/slices/categories';
import {
  CategoryProps,
  RangeProps,
  AddressProps,
} from '@/redux/slices/filter';
import {
  TypeContentModelFilter,
  RangeFilterProps,
  ProvinceProps,
} from '@/interface';

interface IProps {
  closeModel: () => void;
  typeModel: 1 | 2;
  typeContent: TypeContentModelFilter;
  stateCategory: {
    boxCategory: CategoryProps;
    setBoxCategory: React.Dispatch<
      React.SetStateAction<CategoryProps>
    >;
  };

  stateAddress: {
    boxAddress: AddressProps;
    setBoxAddress: React.Dispatch<
      React.SetStateAction<AddressProps>
    >;
  };
  stateRangePrice: {
    boxRangePrice: RangeProps;
    setBoxRangePrice: React.Dispatch<
      React.SetStateAction<RangeProps>
    >;
  };
  stateRangeAcreage: {
    boxRangeAcreage: RangeProps;
    setBoxRangeAcreage: React.Dispatch<
      React.SetStateAction<RangeProps>
    >;
  };
}

type TypeinfoAddress = {
  code: string | number;
  title: string;
  slug: string;
};

const BoxFilter: React.FC<IProps> = ({
  closeModel,
  typeModel,
  typeContent,
  stateCategory,
  stateAddress,
  stateRangePrice,
  stateRangeAcreage,
}) => {
  const initStateAddress = { title: '', code: 0, slug: '' };

  const { boxAddress, setBoxAddress } = stateAddress;
  const { boxCategory, setBoxCategory } = stateCategory;
  const { boxRangePrice, setBoxRangePrice } =
    stateRangePrice;
  const { boxRangeAcreage, setBoxRangeAcreage } =
    stateRangeAcreage;

  const refTrack = useRef<HTMLDivElement>(null);
  const refTrackChild = useRef<HTMLDivElement>(null);

  const categories = useAppSelector(stateCategoriesSlice);
  const [header, setHeader] = useState<string>('');
  const [dataType2, setDataType2] = useState<
    RangeFilterProps[]
  >([]);

  const [valueThumb1, setValueThumb1] = useState<number>(0);
  const [valueThumb2, setValueThumb2] =
    useState<number>(100);
  const [widthTrack, setWidthTrack] = useState<number>(0);
  const [infoCategory, setInfoCategory] = useState<{
    id: number;
    title: string;
  }>({ id: boxCategory.id ?? 0, title: boxCategory.title });
  const [provinces, setProvinces] = useState<
    ProvinceProps[]
  >([]);
  const { rangePrice, rangeAcreage } = useAppSelector(
    stateRangesSlice,
  );

  const [levelBoxProvince, setLevelBoxProvince] =
    useState(1);
  const [infoProvince, setInfoProvince] =
    useState<TypeinfoAddress>(initStateAddress);
  const [infoDistrict, setInfoDistrict] =
    useState<TypeinfoAddress>(initStateAddress);
  const [infoWard, setInfoWard] = useState<TypeinfoAddress>(
    initStateAddress,
  );
  const [inputChecked, setInputChecked] = useState<
    number | string | null
  >(boxCategory.id);
  const valueMaxRange = Number(
    dataType2[dataType2.length - 1]?.min,
  );

  const handleValueInputRadioProvince = (
    title: string,
    code: string | number,
    slug: string,
  ) => {
    if (levelBoxProvince === 1) {
      setInfoProvince({ title, code, slug });
    } else if (levelBoxProvince === 2) {
      setInfoDistrict({ title, code, slug });
    }
    if (levelBoxProvince === 3) {
      setInfoWard({ title, code, slug });
    }
    setHeader(title);
    setLevelBoxProvince(levelBoxProvince + 1);
  };

  const handleValueInputRadioCategory = (
    id: number,
    title: string,
  ) => {
    setInfoCategory({
      id,
      title: title.replace('Cho ', ''),
    });
  };

  const prevPageProvince = () => {
    if (levelBoxProvince === 1) {
      closeModel();
    } else {
      setLevelBoxProvince(levelBoxProvince - 1);
    }
    if (levelBoxProvince === 3) {
      setHeader(infoProvince?.title ?? '');
    }
  };

  const handleThumbPosition = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (refTrack.current) {
      const mouseToLeftScreen = e.clientX;
      const trackToLeftScreen =
        refTrack.current.getBoundingClientRect().left;
      const percentClick = customRound(
        ((mouseToLeftScreen - trackToLeftScreen) /
          widthTrack) *
          100,
      );
      const clickToThumb1 = Math.abs(
        percentClick - valueThumb1,
      );
      const clickToThumb2 = Math.abs(
        percentClick - valueThumb2,
      );
      clickToThumb1 < clickToThumb2
        ? setValueThumb1(percentClick)
        : setValueThumb2(percentClick);
    }
  };

  const handleActiveBox = (
    min: number,
    max: number,
    lastMax: number,
  ) => {
    if (max > lastMax) {
      max = lastMax;
    }
    const percentMin = Math.ceil((min / lastMax) * 100);
    const percentMax = Math.ceil((max / lastMax) * 100);
    const signMin =
      valueThumb1 > valueThumb2 ? valueThumb2 : valueThumb1;
    const signMax =
      valueThumb1 > valueThumb2 ? valueThumb1 : valueThumb2;
    return percentMin === signMin && percentMax === signMax
      ? 'bg-blue-primary text-white'
      : '';
  };

  const handleClickRangeBox = (
    min: number,
    max: number,
    lastMax: number,
  ) => {
    if (max > lastMax) {
      max = lastMax;
    }
    setValueThumb1(Math.ceil((min / lastMax) * 100));
    setValueThumb2(Math.ceil((max / lastMax) * 100));
  };

  const handleApplyBtn = () => {
    closeModel();
    if (typeContent === 'category') {
      setBoxCategory({
        id: infoCategory.id,
        title: infoCategory.title,
        active: true,
      });
    }
    if (typeContent === 'province') {
      setBoxAddress({
        province: {
          ...infoProvince,
          active: Boolean(infoProvince.code),
        },
        district: {
          ...infoDistrict,
          active: Boolean(infoDistrict.code),
        },
        ward: {
          ...infoWard,
          active: Boolean(infoWard.code),
        },
      });
    }
    if (typeModel === 2) {
      const paramsdispatch = {
        min: Math.floor(
          (valueThumb1 / 100) * valueMaxRange,
        ),
        max: Math.floor(
          (valueThumb2 / 100) * valueMaxRange,
        ),
        title: handleTitle(
          valueThumb1,
          valueThumb2,
          valueMaxRange,
        ),
        active: true,
      };
      if (typeContent === 'price') {
        setBoxRangePrice(paramsdispatch);
      }
      if (typeContent === 'acreage') {
        setBoxRangeAcreage(paramsdispatch);
      }
    }
  };

  const handleTitle = (
    thumb1: number,
    thumb2: number,
    lastMax: number,
  ) => {
    const numberMin = thumb1 > thumb2 ? thumb2 : thumb1;
    const numberMax = thumb1 > thumb2 ? thumb1 : thumb2;
    if (typeContent === 'price') {
      lastMax = lastMax / Math.pow(10, 6);
    }
    const valueMin = Math.floor(
      (numberMin / 100) * lastMax,
    );
    const valueMax = Math.floor(
      (numberMax / 100) * lastMax,
    );
    if (valueMin === valueMax && valueMax === lastMax) {
      return `Trên ${valueMax} ${
        typeContent === 'price' ? 'triệu' : 'm'
      }`;
    }
    return `Từ ${valueMin} - ${valueMax}${
      typeContent === 'price' ? ' triệu' : 'm'
    }`;
  };

  useEffect(() => {
    if (typeContent === 'category') {
      setHeader('Chọn loại bất động sản');
    }
    if (typeContent === 'price') {
      setHeader('Chọn giá');
      setDataType2(rangePrice);
    }
    if (typeContent === 'acreage') {
      setHeader('Chọn diện tích');
      setDataType2(rangeAcreage);
    }
  }, [typeContent]);

  useEffect(() => {
    if (typeContent === 'province') {
      if (levelBoxProvince === 1) {
        setHeader('Chọn tỉnh thành');
        const callApi = async () => {
          const { error, data } =
            await apiClient.provinces();
          if (!error) {
            setProvinces(data);
          }
        };
        callApi();
        setInputChecked(boxAddress.province.code);
      }
      if (levelBoxProvince === 2) {
        const callApi = async () => {
          const { error, data } = await apiClient.districts(
            infoProvince?.code ?? 1,
          );
          if (!error) {
            setProvinces(data);
          }
        };
        callApi();
        setInputChecked(boxAddress.district.code);
      }
      if (levelBoxProvince === 3) {
        const callApi = async () => {
          const { error, data } = await apiClient.wards(
            infoDistrict?.code ?? 1,
          );
          if (!error) {
            setProvinces(data);
          }
        };
        callApi();
        setInputChecked(boxAddress.ward.code);
      }
    }
  }, [levelBoxProvince]);

  useEffect(() => {
    if (refTrack.current) {
      setWidthTrack(refTrack.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (dataType2.length > 0) {
      let valueMin = 0;
      let valueMax = valueMaxRange;
      if (
        typeContent === 'price' &&
        boxRangePrice.min &&
        boxRangePrice.max
      ) {
        valueMin = boxRangePrice.min;
        valueMax = boxRangePrice.max;
      }
      if (
        typeContent === 'acreage' &&
        boxRangeAcreage.min &&
        boxRangeAcreage.max
      ) {
        valueMin = boxRangeAcreage.min;
        valueMax = boxRangeAcreage.max;
      }
      const percentThumb1 = Math.ceil(
        (valueMin / valueMaxRange) * 100,
      );
      const percentThumb2 = Math.ceil(
        (valueMax / valueMaxRange) * 100,
      );
      setValueThumb1(percentThumb1);
      setValueThumb2(percentThumb2);
    }
  }, [dataType2.length]);

  useEffect(() => {
    if (refTrackChild.current) {
      if (valueThumb1 - valueThumb2 < 0) {
        refTrackChild.current.style.left = `${valueThumb1}%`;
        refTrackChild.current.style.right = `${
          100 - valueThumb2
        }%`;
      } else {
        refTrackChild.current.style.right = `${
          100 - valueThumb1
        }%`;
        refTrackChild.current.style.left = `${valueThumb2}%`;
      }
    }
  }, [valueThumb1, valueThumb2]);

  return (
    <div className="lg:w-[45rem] ">
      <Stack
        direction="row"
        alignItems="center"
        className="p-3 border-b max-lg:fixed top-0 left-0 right-0 z-10 bg-white"
      >
        <div
          onClick={() => {
            typeContent === 'province'
              ? prevPageProvince()
              : closeModel();
          }}
        >
          <ImArrowLeft2 size={23} />
        </div>
        <p className="font-bold uppercase w-full text-center">
          {header}
        </p>
      </Stack>
      <div
        className={`max-lg:pb-[7em] p-2 lg:px-8 lg:max-h-[23rem] max-lg:h-[100vh] max-lg:overflow-y-scroll max-lg:mt-12  ${
          typeContent === 'province'
            ? 'overflow-y-scroll'
            : ''
        }`}
      >
        {typeModel === 1 ? (
          typeContent === 'category' ? (
            <div>
              <Stack
                direction="row"
                alignItems="center"
                spacing={{ xs: 1 }}
                className="py-2 border-b"
              >
                <input
                  type="radio"
                  id="0"
                  checked={inputChecked === 0}
                  onClick={() =>
                    handleValueInputRadioCategory(
                      0,
                      'Phòng trọ, nhà trọ',
                    )
                  }
                  onChange={() => setInputChecked(0)}
                />
                <label htmlFor={String(0)}>Tất cả</label>
              </Stack>
              {categories.length > 0 &&
                categories.map((item) => (
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 1 }}
                    className="py-2 border-b"
                    key={item.id}
                  >
                    <input
                      type="radio"
                      id={String(item.id)}
                      checked={inputChecked === item.id}
                      onClick={() =>
                        handleValueInputRadioCategory(
                          item.id,
                          item.title,
                        )
                      }
                      onChange={() =>
                        setInputChecked(item.id)
                      }
                    />
                    <label htmlFor={String(item.id)}>
                      {item.title}
                    </label>
                  </Stack>
                ))}
            </div>
          ) : (
            <div>
              {provinces.length > 0 &&
                provinces.map((item) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 1 }}
                    className="py-2 border-b"
                  >
                    <input
                      type="radio"
                      id={String(item.id)}
                      checked={inputChecked == item.code}
                      onClick={() =>
                        handleValueInputRadioProvince(
                          item.title,
                          item.code,
                          item.slug,
                        )
                      }
                      onChange={() =>
                        setInputChecked(item.code)
                      }
                    />
                    <label htmlFor={String(item.id)}>
                      {item.title}
                    </label>
                  </Stack>
                ))}
            </div>
          )
        ) : (
          <div className="h-[350px] sm:px-10 md:mt-10 lg:mt-0 lg:px-0">
            <div className="py-4">
              <h4 className="text-orange-500 text-center font-bold text-2xl">
                {handleTitle(
                  valueThumb1,
                  valueThumb2,
                  valueMaxRange,
                )}
                {typeContent === 'acreage' && <sup>2</sup>}
              </h4>
              <div
                className={`${styles.wrapSliderRange} mt-8`}
              >
                <div
                  className={`${styles.sliderTrack} bg-gray-200`}
                  ref={refTrack}
                  onClick={handleThumbPosition}
                >
                  <div
                    className={`${styles.sliderTrackChild} bg-orange-500`}
                    ref={refTrackChild}
                  ></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={valueThumb1}
                  onChange={(e) =>
                    setValueThumb1(Number(e.target.value))
                  }
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={valueThumb2}
                  onChange={(e) =>
                    setValueThumb2(Number(e.target.value))
                  }
                />
              </div>
              <Stack
                direction="row"
                justifyContent="space-between"
              >
                <span>0</span>
                <span>
                  {typeContent === 'price'
                    ? `${
                        valueMaxRange / Math.pow(10, 6)
                      } triệu+`
                    : `${valueMaxRange}m`}
                  {typeContent === 'acreage' && (
                    <sup>2</sup>
                  )}
                </span>
              </Stack>
            </div>
            <p>Chọn nhanh:</p>
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={{ xs: 1 }}
              className="md:w-1/2 lg:w-4/5 mx-auto py-2"
            >
              {dataType2.length > 0 &&
                dataType2.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-background-color py-1 px-2 rounded-md w-fit cursor-pointer ${handleActiveBox(
                      Number(item.min),
                      item.max,
                      valueMaxRange,
                    )}`}
                    onClick={() =>
                      handleClickRangeBox(
                        Number(item.min),
                        item.max,
                        valueMaxRange,
                      )
                    }
                  >
                    {item.title}
                  </div>
                ))}
            </Stack>
          </div>
        )}
      </div>
      <div
        className="text-center h-[50px] flex items-center justify-center bg-yellow-primary cursor-pointer max-lg:fixed bottom-0 right-0 left-0"
        onClick={handleApplyBtn}
      >
        <p className="font-bold ">Áp dụng</p>
      </div>
    </div>
  );
};

export default BoxFilter;
