/* eslint-disable react-hooks/exhaustive-deps */
import { Stack } from '@mui/material';
import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  Link,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

import path from '@/routes/path';
import {
  Button,
  Image,
  Loading,
  PaginationManage,
} from '@/components';
import { apiClient2 } from '@/api';
import { MdKeyboardArrowDown } from '@/icons';
import {
  generateSrcImage,
  handleTime,
  handleTextPrice,
  swal,
  handleSlug,
} from '@/helpers';
import {
  ListPostCurrentProps,
  ParamsPostsUserCurrentProps,
} from '@/interface';

const statusFilterText = [
  { name: 'Tất cả' },
  { name: 'Đã kích hoạt', status: 1 },
  { name: 'Đang đợi', status: 0 },
  { name: 'Từ chối kích hoạt', status: -1 },
];

const ListPostsMain = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') ?? 1);
  const [selected, setSelected] = useState(() => {
    const status = searchParams.get('status');
    return status
      ? statusFilterText.find((item) => {
          return handleSlug(item.name) === status;
        }) ?? statusFilterText[0]
      : statusFilterText[0];
  });
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [arrIdPostChecked, setArrIdPostChecked] = useState<
    number[]
  >([]);
  const [inputCheckAll, setInputCheckAll] =
    useState<boolean>(false);
  const [renderPosts, setRenderPosts] =
    useState<boolean>(false);
  const [posts, setPosts] = useState<
    ListPostCurrentProps[]
  >([]);

  const handleDeleteBtn = (id: number) => {
    swal
      .confirm(`Bạn có chắc chắn muốn xóa?`)
      .then(async (result) => {
        if (result.isConfirmed) {
          const { error } = await apiClient2.deletePost(id);
          !error
            ? await swal.success(`Đã xóa bài viết`)
            : await swal.error(`Xóa bài viết thất bại `);
          setRenderPosts(!renderPosts);
        }
      });
  };

  const handleDeleteAllBtn = () => {
    if (arrIdPostChecked.length) {
      swal
        .confirm(
          `Bạn có chắc chắn muốn xóa ${arrIdPostChecked.length} bài viết?`,
        )
        .then(async (result) => {
          if (result.isConfirmed) {
            const { error } = await apiClient2.deletePosts(
              arrIdPostChecked,
            );
            !error
              ? await swal.success(
                  `Đã xóa ${arrIdPostChecked.length} bài viết`,
                )
              : await swal.error(
                  `Xóa ${arrIdPostChecked.length} bài viết thất bại `,
                );
            setRenderPosts(!renderPosts);
            setInputCheckAll(false);
            setArrIdPostChecked([]);
            navigate(path.listPost);
          }
        });
    }
  };

  const handleInputCheckAll = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.checked) {
      const arrIdPost: number[] = [];
      posts.forEach((item) => {
        arrIdPost.push(item.id);
      });
      setArrIdPostChecked(arrIdPost);
    } else {
      setArrIdPostChecked([]);
    }
    setInputCheckAll(e.target.checked);
  };

  const handleInputCheck = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (e.target.checked) {
      const arrStateNew = [...arrIdPostChecked, id];
      if (arrStateNew.length === posts.length) {
        setInputCheckAll(true);
      }
      setArrIdPostChecked(arrStateNew);
    } else {
      const arrStateNew = arrIdPostChecked.filter(
        (item) => item !== id,
      );
      if (arrStateNew.length !== posts.length) {
        setInputCheckAll(false);
      }
      setArrIdPostChecked(arrStateNew);
    }
  };

  const setCheckedInput = (id: number) => {
    return arrIdPostChecked.some((item) => item === id);
  };

  const handleStatus = (status: number) => {
    switch (status) {
      case 1:
        return (
          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
            <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
            Đã kích hoạt
          </span>
        );
      case 0:
        return (
          <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
            <span className="w-2 h-2 mr-1 bg-blue-500 rounded-full"></span>
            Đang chờ
          </span>
        );
      case -1:
        return (
          <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
            Từ chối kích hoạt
          </span>
        );
    }
  };

  useEffect(() => {
    if (typeof selected.status === 'number') {
      const valueStatus = handleSlug(selected.name);
      searchParams.set('status', valueStatus);
      setSearchParams(searchParams);
    } else {
      navigate(path.listPost);
    }
  }, [selected.status]);

  useEffect(() => {
    setLoading(true);
    const objParams: ParamsPostsUserCurrentProps = {
      page,
    };

    if (
      selected.status === -1 ||
      selected.status === 0 ||
      selected.status === 1
    ) {
      objParams.status = selected.status;
    }
    const callApi = async () => {
      const { error, data } =
        await apiClient2.postsUserCurrent(objParams);
      if (!error) {
        setPosts(data.posts.data);
        setTotalPage(data.totalPage);
      }
      setLoading(false);
    };
    callApi();
  }, [page, renderPosts, selected.status]);

  return (
    <div className="lg:pb-[5rem]">
      <div className="sm:px-3 sm:py-2 my-5 rounded-lg sm:bg-gray-100">
        <span className="text-blue-primary">
          Phongtro123.com
        </span>{' '}
        / <span className="text-blue-primary">Quản lý</span>{' '}
        / <span>Danh sách tin đăng</span>
      </div>
      <h2 className="text-3xl">Danh sách tin đăng</h2>
      <div className="mt-5 pt-5 border-t">
        <Stack
          direction="row"
          alignItems={{ xs: 'flex-end', sm: 'center' }}
          spacing={{ xs: 1, sm: 2 }}
          justifyContent={{
            xs: 'space-between',
            sm: 'flex-end',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ sm: 1 }}
            className="max-sm:text-sm"
          >
            <span className="font-semibold max-sm:hidden">
              Trạng thái:
            </span>
            <Listbox
              value={selected}
              onChange={setSelected}
            >
              <div className="relative mt-1 w-[150px]">
                <Listbox.Button className="relative w-full cursor-default rounded-lg border bg-white py-1 p-2 text-left sm:text-sm">
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <span className="block truncate">
                      {selected.name}
                    </span>
                    <MdKeyboardArrowDown />
                  </Stack>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="max-sm:text-sm absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {statusFilterText.map((item, id) => (
                      <Listbox.Option
                        key={id}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-2 pr-4 w-full ${
                            active
                              ? 'bg-amber-100 text-amber-900'
                              : 'text-gray-900'
                          }`
                        }
                        value={item}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected
                                  ? 'font-medium'
                                  : 'font-normal'
                              }`}
                            >
                              {item.name}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </Stack>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            spacing={{ xs: 1, sm: 2 }}
          >
            <div className="rounded-md mt-1 max-sm:text-sm">
              <Button
                type="button"
                content="Đăng tin mới"
                to={`${path.postPosts}`}
                containerStyles="bg-red-primary px-2 py-1"
              />
            </div>
            <Stack
              justifyContent="center"
              alignItems="center"
              onClick={handleDeleteAllBtn}
              className={`rounded-md mt-1 bg-blue-primary py-1 text-white max-sm:w-[95px] px-2 max-sm:text-sm ${
                arrIdPostChecked.length > 0
                  ? 'cursor-pointer hover:opacity-90'
                  : 'opacity-70 cursor-default'
              }`}
            >
              Xóa bài viết
            </Stack>
          </Stack>
        </Stack>
        <div className="overflow-x-auto">
          <table className="max-lg:w-[1500px] w-full mt-5 max-sm:text-sm">
            <thead>
              <tr>
                <th className="border w-[3%] py-2">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={inputCheckAll}
                    onChange={(e) => handleInputCheckAll(e)}
                  />
                </th>
                <th className="border w-[7%] py-2">
                  Mã tin
                </th>
                <th className="border w-[17%] py-2">
                  Ảnh đại diện
                </th>
                <th className="border w-[25%] py-2">
                  Tiêu đề
                </th>
                <th className="border w-[9%] py-2">Giá</th>
                <th className="border w-[9%] py-2">
                  Diện tích
                </th>
                <th className="border w-[10%] py-2">
                  Lần cập nhật cuối
                </th>
                <th className="border w-[10%] py-2">
                  Trạng thái
                </th>
                <th className="border w-[10%] py-2">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {loading ? (
                <tr className="">
                  <td colSpan={9}>
                    <Loading />
                  </td>
                </tr>
              ) : posts.length > 0 ? (
                posts.map((item) => (
                  <tr key={item.id}>
                    <td className="border ">
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={setCheckedInput(item.id)}
                        onChange={(e) =>
                          handleInputCheck(e, item.id)
                        }
                      />
                    </td>
                    <td className="border font-semibold text-sm">
                      #{item.code}
                    </td>
                    <td className="border py-2">
                      <div className="relative w-[130px] h-[80px] mx-auto rounded-md truncate border shadow-md">
                        <Image
                          alt="avatar"
                          src={generateSrcImage(item.image)}
                          fill
                          objectFit="contain"
                        />
                      </div>
                    </td>
                    <td className="border px-3">
                      {item.title}
                    </td>
                    <td className="border ">
                      {handleTextPrice(item.price)}
                    </td>
                    <td className="border ">
                      {item.acreage}m<sup>2</sup>
                    </td>
                    <td className="border capitalize text-sm">
                      {handleTime(item.updated_at)}
                    </td>
                    <td className="border ">
                      {handleStatus(item.status)}
                    </td>
                    <td className="border ">
                      <Stack
                        className="w-2/4 mx-auto"
                        spacing={1}
                      >
                        <Link
                          to={`${path.postDetailManage.replace(
                            ':id',
                            String(item.id),
                          )}`}
                        >
                          <div className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded text-sm">
                            Sửa
                          </div>
                        </Link>
                        <button
                          onClick={() =>
                            handleDeleteBtn(item.id)
                          }
                          className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded text-sm"
                        >
                          Xóa
                        </button>
                      </Stack>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="border py-2 bg-blue-100"
                  >
                    Không có bài viết nào.{' '}
                    <Link
                      to={path.postPosts}
                      className="underline text-blue-primary"
                    >
                      Bấm vào đây
                    </Link>{' '}
                    để tạo mới bài viết!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPage > 1 && (
          <Stack alignItems="center" className="mt-5">
            <PaginationManage
              totalPage={totalPage}
              pageRangeDisplayed={2}
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default ListPostsMain;
