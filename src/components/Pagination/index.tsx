import { Stack } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from '@/icons';

interface IProps {
  totalPage: number;
  pageAppear: number;
}

const Pagination = ({ totalPage, pageAppear }: IProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage =
    Number(searchParams.get('page')) === 0
      ? 1
      : Number(searchParams.get('page'));
  const minPage = currentPage - pageAppear;
  const maxPage = currentPage + pageAppear;
  const handleIndexPage = (arrIndexPage: number[]) => {
    for (let i = 1; i <= pageAppear; ++i) {
      if (currentPage - i >= 1) {
        arrIndexPage.push(currentPage - i);
      }
      if (currentPage + i <= totalPage) {
        arrIndexPage.push(currentPage + i);
      }
    }
    return arrIndexPage.sort(function (a, b) {
      return a - b;
    });
  };

  return (
    <div className="py-5">
      <Stack
        direction="row"
        justifyContent="center"
        spacing={{ xs: 1 }}
      >
        {currentPage !== 1 && (
          <div
            onClick={() =>
              setSearchParams({
                page: String(currentPage - 1),
              })
            }
            className="cursor-pointer"
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              className="max-lg:w-[35px] max-lg:h-[35px] lg:w-[45px] lg:h-[45px] bg-white rounded-md cursor-pointer"
            >
              <MdKeyboardDoubleArrowLeft />
            </Stack>
          </div>
        )}
        {minPage > 1 && (
          <Stack
            justifyContent="center"
            alignItems="center"
            className="max-lg:w-[35px] max-lg:h-[35px] lg:w-[45px] lg:h-[45px] bg-white rounded-md cursor-context-menu  "
          >
            ...
          </Stack>
        )}
        {handleIndexPage([currentPage]).map((item) => {
          return (
            <div
              onClick={() =>
                setSearchParams({ page: String(item) })
              }
              key={item}
              className="cursor-pointer"
            >
              <Stack
                justifyContent="center"
                alignItems="center"
                className={`max-lg:w-[35px] max-lg:h-[35px] lg:w-[45px] lg:h-[45px] rounded-md ${
                  currentPage === item
                    ? 'bg-red-primary text-white'
                    : 'bg-white text-black'
                }`}
              >
                <span>{item}</span>
              </Stack>
            </div>
          );
        })}

        {maxPage < totalPage && (
          <Stack
            justifyContent="center"
            alignItems="center"
            className="max-lg:w-[35px] max-lg:h-[35px] lg:w-[45px] lg:h-[45px] bg-white rounded-md cursor-context-menu"
          >
            ...
          </Stack>
        )}
        {currentPage !== totalPage && (
          <div
            onClick={() =>
              setSearchParams({
                page: String(currentPage + 1),
              })
            }
            className="cursor-pointer"
          >
            <Stack
              justifyContent="center"
              alignItems="center"
              className="max-lg:w-[35px] max-lg:h-[35px] lg:w-[45px] lg:h-[45px] bg-white rounded-md cursor-pointer"
            >
              <MdKeyboardDoubleArrowRight />
            </Stack>
          </div>
        )}
      </Stack>
    </div>
  );
};

export default Pagination;
