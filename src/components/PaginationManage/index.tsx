import { Link, useSearchParams } from 'react-router-dom';

interface IProps {
  totalPage: string | number;
  pageRangeDisplayed: number;
}

const PaginationManage = ({
  totalPage,
  pageRangeDisplayed,
}: IProps) => {
  totalPage = Number(totalPage);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const pagePrev = page - 1;
  const pageNext = page + 1;
  let arrIndexPage = [page];
  for (
    let index = 1;
    index <= pageRangeDisplayed;
    index++
  ) {
    if (page - index >= 1) {
      arrIndexPage.push(page - index);
    }
    if (page + index <= totalPage) {
      arrIndexPage.push(page + index);
    }
  }
  arrIndexPage = arrIndexPage.sort((a, b) =>
    a > b ? 1 : -1,
  );

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        {pagePrev > 1 && (
          <li>
            <Link
              to={`?page=${pagePrev}`}
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </Link>
          </li>
        )}
        {page - pageRangeDisplayed > 1 && (
          <li>
            <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              ...
            </div>
          </li>
        )}
        {arrIndexPage.map((item, index) => (
          <li key={index}>
            <Link
              to={`?page=${item}`}
              className={`${
                page == item
                  ? 'bg-blue-primary text-white'
                  : ' text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
              }  flex items-center justify-center px-3 h-8 leading-tight border border-gray-300  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              {item}
            </Link>
          </li>
        ))}
        {page + pageRangeDisplayed < totalPage && (
          <li>
            <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              ...
            </div>
          </li>
        )}
        {pageNext < totalPage && (
          <li>
            <Link
              to={`?page=${pageNext}`}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default PaginationManage;
