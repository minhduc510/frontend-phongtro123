/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import path from '@/routes/path';
import BoxFilter from './BoxFilter';
import styles from './styles.module.scss';
import { Button } from '..';
import { handleTextLong } from '@/helpers';
import { TypeContentModelFilter } from '@/interface';
import { stateMenusSlice } from '@/redux/slices/menus';
import {
  useAppSelector,
  useAppDispatch,
} from '@/redux/hooks';
import { stateCategoriesSlice } from '@/redux/slices/categories';
import {
  AddressProps,
  filterAddressAdded,
  filterCategoryAdded,
  filterRangeAcreageAdded,
  filterRangePriceAdded,
} from '@/redux/slices/filter';
import {
  initialState,
  stateFiltersSlice,
} from '@/redux/slices/filter';
import {
  TbSquare,
  FiSearch,
  LuBuilding,
  TbReportMoney,
  IoLocationOutline,
  RiDeleteBack2Line,
  MdOutlineKeyboardArrowRight,
} from '@/icons';

const Filter = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [typeModel, setTypeModel] = useState<1 | 2>(1);
  const [typeContent, setTypeContent] =
    useState<TypeContentModelFilter>('category');

  const stateFilters = useAppSelector(stateFiltersSlice);
  const menus = useAppSelector(stateMenusSlice);
  const categories = useAppSelector(stateCategoriesSlice);

  const [boxCategory, setBoxCategory] = useState({
    ...stateFilters.category,
  });
  const [boxAddress, setBoxAddress] = useState({
    ...stateFilters.address,
  });
  const [boxRangePrice, setBoxRangePrice] = useState({
    ...stateFilters.range_price,
  });
  const [boxRangeAcreage, setBoxRangeAcreage] = useState({
    ...stateFilters.range_acreage,
  });

  useEffect(() => {
    setBoxCategory(stateFilters.category);
    setBoxAddress(stateFilters.address);
    setBoxRangePrice(stateFilters.range_price);
    setBoxRangeAcreage(stateFilters.range_acreage);
  }, [JSON.stringify(stateFilters)]);

  const handleStatusAddress = (address: AddressProps) => {
    const active =
      address.province.active ||
      address.district.active ||
      address.ward.active;
    const arrTitle = [];
    for (const item in address) {
      if (address[item as keyof AddressProps].title) {
        arrTitle.push(
          address[item as keyof AddressProps].title,
        );
      }
    }
    const title = arrTitle.join(', ');
    return { active, title };
  };

  const statusAddress = handleStatusAddress(boxAddress);

  const handleRemoveFilter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    type: TypeContentModelFilter,
  ) => {
    e.stopPropagation();
    if (type === 'category') {
      setBoxCategory(initialState.category);
    }
    if (type === 'price') {
      setBoxRangePrice({
        ...initialState.range_price,
        active: false,
      });
    }
    if (type === 'acreage') {
      setBoxRangeAcreage({
        ...initialState.range_acreage,
        active: false,
      });
    }
    if (type === 'province') {
      setBoxAddress(initialState.address);
    }
  };

  const handleDispatchFilter = () => {
    const arrSearch: string[] = [];
    if (boxAddress.province.active) {
      arrSearch.push(
        `province=${boxAddress.province.slug}`,
      );
    }
    if (boxAddress.district.active) {
      arrSearch.push(
        `district=${boxAddress.district.slug}`,
      );
    }
    if (boxAddress.ward.active) {
      arrSearch.push(`ward=${boxAddress.ward.slug}`);
    }
    if (boxRangePrice.active) {
      const minPrice =
        +String(boxRangePrice.min).slice(0, -6) *
        Math.pow(10, 6);
      const maxPrice =
        +String(boxRangePrice.max).slice(0, -6) *
        Math.pow(10, 6);
      if (boxRangePrice.title.includes('Trên')) {
        arrSearch.push(`gia_tu=${minPrice}`);
      } else {
        arrSearch.push(`gia_tu=${minPrice}`);
        arrSearch.push(`gia_den=${maxPrice}`);
      }
    }
    if (boxRangeAcreage.active) {
      if (boxRangeAcreage.title.includes('Trên')) {
        arrSearch.push(
          `dien_tich_tu=${boxRangeAcreage.min}`,
        );
      } else {
        arrSearch.push(
          `dien_tich_tu=${boxRangeAcreage.min}`,
        );
        arrSearch.push(
          `dien_tich_den=${boxRangeAcreage.max}`,
        );
      }
    }
    const slugMenu = menus.find(
      (item) => item.category_id === boxCategory.id,
    );
    const category = categories.find(
      (item) => item.id === boxCategory.id,
    );
    if (!arrSearch.length && !boxCategory.id) {
      navigate(`${path.home}`);
    } else if (
      boxCategory.id &&
      !arrSearch.length &&
      !category?.parent_id
    ) {
      navigate(`${slugMenu?.slug}`);
    } else {
      navigate(`${path.search}?${arrSearch.join('&')}`);
    }
    dispatch(filterCategoryAdded(boxCategory));
    dispatch(filterAddressAdded(boxAddress));
    dispatch(filterRangePriceAdded(boxRangePrice));
    dispatch(filterRangeAcreageAdded(boxRangeAcreage));
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Stack
        direction={{ xs: 'column', lg: 'row' }}
        className={`${styles.filter} rounded-lg py-2 px-3 bg-yellow-primary text-[0.95rem]`}
        spacing={{ xs: 1 }}
      >
        <Stack
          direction="row"
          className={`${styles.filterItem} lg:w-[20%] max-h-[2.4rem] bg-white rounded-md py-[0.4rem] px-[0.3rem] cursor-pointer max-lg:h-[33px]`}
          alignItems="center"
          justifyContent="space-between"
          onClick={() => {
            openModal();
            setTypeModel(1);
            setTypeContent('category');
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            className=""
          >
            <LuBuilding color="rgb(156 163 175)" />
            <p className="mt-[0.1rem] ml-[0.1rem] capitalize font-bold leading-4 ">
              {boxCategory.id === 0
                ? 'Phòng trọ, nhà trọ'
                : boxCategory.title}
            </p>
          </Stack>
          <div
            onClick={(e) =>
              handleRemoveFilter(e, 'category')
            }
          >
            <RiDeleteBack2Line />
          </div>
        </Stack>
        <Stack
          direction="row"
          className={`${styles.filterItem} lg:w-[20%] max-h-[2.4rem] bg-white rounded-md py-[0.4rem] px-[0.3rem] cursor-pointer max-lg:h-[33px]`}
          alignItems="center"
          justifyContent="space-between"
          onClick={() => {
            openModal();
            setTypeModel(1);
            setTypeContent('province');
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            className=""
          >
            <IoLocationOutline color="rgb(156 163 175)" />
            <p
              className={`mt-[0.1rem] ${
                statusAddress.active
                  ? 'font-bold leading-4'
                  : ''
              }`}
            >
              {' '}
              {statusAddress.active
                ? window.innerWidth <
                  Number(
                    import.meta.env.VITE_URL_BREAKPOINT_SM,
                  )
                  ? statusAddress.title
                  : handleTextLong(statusAddress.title, 40)
                : 'Toàn quốc'}
            </p>
          </Stack>
          {statusAddress.active ? (
            <div
              onClick={(e) =>
                handleRemoveFilter(e, 'province')
              }
            >
              <RiDeleteBack2Line />
            </div>
          ) : (
            <MdOutlineKeyboardArrowRight
              color="gray"
              size={20}
            />
          )}
        </Stack>
        <Stack
          direction="row"
          className={`${styles.filterItem} lg:w-[20%] max-h-[2.4rem] bg-white rounded-md py-[0.4rem] px-[0.3rem] cursor-pointer max-lg:h-[33px]`}
          alignItems="center"
          justifyContent="space-between"
          onClick={() => {
            openModal();
            setTypeModel(2);
            setTypeContent('price');
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            className=""
          >
            <TbReportMoney color="rgb(156 163 175)" />
            <p
              className={`${
                boxRangePrice.active ? 'font-bold' : ''
              } mt-[0.1rem]`}
            >
              {boxRangePrice.active
                ? boxRangePrice.title
                : 'Chọn giá'}
            </p>
          </Stack>
          {boxRangePrice.active ? (
            <div
              onClick={(e) =>
                handleRemoveFilter(e, 'price')
              }
            >
              <RiDeleteBack2Line />
            </div>
          ) : (
            <MdOutlineKeyboardArrowRight
              color="gray"
              size={20}
            />
          )}
        </Stack>
        <Stack
          direction="row"
          className={`${styles.filterItem} lg:w-[20%] max-h-[2.4rem] bg-white rounded-md py-[0.4rem] px-[0.3rem] cursor-pointer max-lg:h-[33px]`}
          alignItems="center"
          justifyContent="space-between"
          onClick={() => {
            openModal();
            setTypeModel(2);
            setTypeContent('acreage');
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            className=""
          >
            <TbSquare color="rgb(156 163 175)" />
            <p
              className={`${
                boxRangeAcreage.active ? 'font-bold' : ''
              } mt-[0.1rem]  ml-[0.1rem] `}
            >
              {boxRangeAcreage.active
                ? `${boxRangeAcreage.title}`
                : 'Chọn diện tích'}
              {boxRangeAcreage.active && <sup>2</sup>}
            </p>
          </Stack>
          {boxRangeAcreage.active ? (
            <div
              onClick={(e) =>
                handleRemoveFilter(e, 'acreage')
              }
            >
              <RiDeleteBack2Line />
            </div>
          ) : (
            <MdOutlineKeyboardArrowRight
              color="gray"
              size={20}
            />
          )}
        </Stack>
        <Button
          iconLeft={<FiSearch />}
          type="button"
          content="Tìm kiếm"
          containerStyles="lg:w-[20%] bg-blue-primary rounded-md font-bold max-lg:h-[33px]"
          onClick={handleDispatchFilter}
        />
      </Stack>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[101]"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="z-[102] fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="absolute max-lg:inset-0 transform overflow-hidden lg:rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                  <BoxFilter
                    closeModel={closeModal}
                    typeModel={typeModel}
                    typeContent={typeContent}
                    stateCategory={{
                      boxCategory,
                      setBoxCategory,
                    }}
                    stateAddress={{
                      boxAddress,
                      setBoxAddress,
                    }}
                    stateRangePrice={{
                      boxRangePrice,
                      setBoxRangePrice,
                    }}
                    stateRangeAcreage={{
                      boxRangeAcreage,
                      setBoxRangeAcreage,
                    }}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Filter;
