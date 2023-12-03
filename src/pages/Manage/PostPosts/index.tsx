/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import path from '@/routes/path';
import styles from './styles.module.scss';
import { swal } from '@/helpers';
import { postPostSchema } from '@/schema';
import { apiClient, apiClient2 } from '@/api';
import { useAppSelector } from '@/redux/hooks';
import { stateUserSlice } from '@/redux/slices/user';
import { AiFillDelete, FcCompactCamera } from '@/icons';
import { stateCategoriesSlice } from '@/redux/slices/categories';
import {
  Image,
  Button,
  InputOptionAddress,
  InputOptionCategory,
} from '@/components';

const PostPosts = () => {
  const navigate = useNavigate();
  const user = useAppSelector(stateUserSlice);

  const categories = useAppSelector(stateCategoriesSlice);
  const [selectedCategory, setSelectedCategory] =
    useState('');

  const [selectedProvince, setSelectedProvince] =
    useState('');
  const [selectedDistrict, setSelectedDistrict] =
    useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const [dataProvince, setDataProvince] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);

  const [imagesFile, setImagesFile] = useState<File[]>([]);

  const [province_id, province_name] =
    selectedProvince.split('-');
  const [district_id, district_name] =
    selectedDistrict.split('-');
  const [ward_id, ward_name] = selectedWard.split('-');

  const handleTextAddressExact = () => {
    let arr: string[] = [];
    arr.push(ward_name);
    arr.push(district_name);
    arr.push(province_name);
    arr = arr.filter((item) => !!item);
    setFieldValue('address', arr.join(', ').trim());
  };

  const handleRemoveImage = (index: number) => {
    const arrImageNew = [...imagesFile];
    arrImageNew.splice(index, 1);
    setImagesFile(arrImageNew);
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      category: '',
      address: '',
      title: '',
      content: '',
      price: '',
      acreage: '',
      images: [],
    },
    validationSchema: postPostSchema,
    onSubmit: async (values) => {
      const {
        category,
        title,
        content,
        price,
        acreage,
        address,
      } = values;
      const formData = new FormData();
      formData.append(
        'category',
        category.split('-')[0].trim(),
      );
      formData.append('title', title);
      formData.append('content', content);
      formData.append('price', price);
      formData.append('acreage', acreage);
      formData.append('address', address);
      formData.append('province', province_id.trim());
      if (district_id) {
        formData.append('district', district_id.trim());
      }
      if (ward_id) {
        formData.append('ward', ward_id.trim());
      }
      for (const image of imagesFile) {
        formData.append('images[]', image);
      }
      const { error } = await apiClient2.uploadPost(
        formData,
      );
      if (!error) {
        swal
          .success(
            'Bài viết đã được cho vào hàng chờ. Vui lòng đợi bài viết được duyệt !!!',
          )
          .then(() => {
            navigate(path.listPost);
          });
      } else {
        swal.error(
          'Đăng bài viết thất bại. Vui lòng kiểm tra lại !!!',
        );
      }
    },
  });

  useEffect(() => {
    setFieldValue('category', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setFieldValue('images', imagesFile);
  }, [imagesFile.length]);

  useEffect(() => {
    handleTextAddressExact();
  }, [province_id, district_id, ward_id]);

  useEffect(() => {
    const callApi = async () => {
      const { error, data } = await apiClient.provinces();
      if (!error) {
        setDataProvince(data);
      }
    };
    callApi();
  }, []);

  useEffect(() => {
    if (province_id) {
      const callApi = async () => {
        const { error, data } = await apiClient.districts(
          province_id,
        );
        if (!error) {
          setDataDistrict(data);
        }
      };
      callApi();
    } else {
      setSelectedProvince('');
    }
    setSelectedDistrict('');
    setDataDistrict([]);
  }, [province_id.trim()]);

  useEffect(() => {
    if (district_id) {
      const callApi = async () => {
        const { error, data } = await apiClient.wards(
          district_id,
        );
        if (!error) {
          setDataWard(data);
        }
      };
      callApi();
    }
    setDataWard([]);
    setSelectedWard('');
  }, [district_id.trim()]);

  return (
    <div className="lg:pb-[5rem]">
      <div className="sm:px-3 sm:py-2 my-5 rounded-lg sm:bg-gray-100">
        <span className="text-blue-primary">
          Phongtro123.com
        </span>{' '}
        / <span className="text-blue-primary">Quản lý</span>{' '}
        / <span>Đăng tin mới</span>
      </div>
      <h2 className="text-3xl">Đăng tin mới</h2>
      <div className="mt-5 pt-5 border-t">
        <Grid container spacing={5}>
          <Grid item xs={12} lg={8}>
            <form
              action=""
              method="post"
              onSubmit={handleSubmit}
              encType='"multipart/form-data"'
            >
              <div>
                <h3 className="font-bold text-2xl">
                  Địa chỉ cho thuê
                </h3>
                <div className="mt-5">
                  <Grid
                    container
                    spacing={{ xs: 3, md: 20 }}
                  >
                    <Grid item xs={12} md={4}>
                      <p className="font-bold">
                        Tỉnh/Thành phố
                      </p>
                      <InputOptionAddress
                        type="province"
                        data={dataProvince}
                        selected={selectedProvince}
                        setSelected={setSelectedProvince}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p className="font-bold">
                        Quận/Huyện
                      </p>
                      <InputOptionAddress
                        type="district"
                        data={dataDistrict}
                        selected={selectedDistrict}
                        setSelected={setSelectedDistrict}
                      />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p className="font-bold">Phường/Xã</p>
                      <InputOptionAddress
                        type="ward"
                        data={dataWard}
                        selected={selectedWard}
                        setSelected={setSelectedWard}
                      />
                    </Grid>
                  </Grid>
                </div>
                <div className="mt-8">
                  <p className=" font-bold">
                    Địa chỉ chính xác
                  </p>
                  <div className="bg-gray-100 border rounded-md p-2">
                    <input
                      readOnly
                      type="text"
                      name="address"
                      value={values.address}
                      className="bg-transparent outline-none w-full"
                    />
                  </div>
                  {touched.address && errors.address && (
                    <span className="text-red-primary text-sm italic">
                      {errors.address}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-10">
                <h3 className="font-bold text-2xl">
                  Thông tin mô tả
                </h3>
                <div className="sm:w-[50%] mt-5">
                  <p className="font-bold">
                    Loại chuyên mục
                  </p>
                  <InputOptionCategory
                    selected={selectedCategory}
                    setSelected={setSelectedCategory}
                    data={categories}
                  />
                  {touched.category && errors.category && (
                    <span className="text-red-primary text-sm italic">
                      {errors.category}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <p className="font-bold">Tiêu đề</p>
                  <div className="border rounded-md p-2">
                    <input
                      type="text"
                      name="title"
                      value={values.title}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="bg-transparent outline-none w-full"
                    />
                  </div>
                  {touched.title && errors.title && (
                    <span className="text-red-primary text-sm italic">
                      {errors.title}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <p className="font-bold">
                    Nội dung mô tả
                  </p>
                  <div className="border rounded-md p-2">
                    <textarea
                      rows={14}
                      value={values.content}
                      name="content"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="w-full outline-none"
                    >
                      {values.content}
                    </textarea>
                  </div>
                  {touched.content && errors.content && (
                    <span className="text-red-primary text-sm italic">
                      {errors.content}
                    </span>
                  )}
                </div>
                <div className="mt-5 sm:w-[50%]">
                  <p className="font-bold">
                    Thông tin liên hệ
                  </p>
                  <div className="border bg-gray-100 rounded-md p-2">
                    <input
                      readOnly
                      type="text"
                      value={user.username}
                      className="bg-transparent outline-none w-full"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:w-[50%]">
                  <p className="font-bold">Điện thoại</p>
                  <div className="border bg-gray-100 rounded-md p-2">
                    <input
                      readOnly
                      type="text"
                      value={user.phone}
                      className="bg-transparent outline-none w-full"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:w-[50%]">
                  <p className="font-bold">Giá cho thuê</p>
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="border rounded-md"
                  >
                    <div className="w-[70%] p-2">
                      <input
                        min={0}
                        name="price"
                        type="number"
                        value={values.price}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="bg-transparent outline-none w-full"
                      />
                    </div>
                    <div className="w-[30%] p-2 bg-gray-100 text-center">
                      đồng/tháng
                    </div>
                  </Stack>
                  {touched.price && errors.price && (
                    <span className="text-red-primary text-sm italic">
                      {errors.price}
                    </span>
                  )}
                  <p className="text-xs font-bold mt-1">
                    Nhập đầy đủ số, ví dụ 1 triệu thì nhập
                    là 1000000
                  </p>
                </div>
                <div className="mt-5 sm:w-[50%]">
                  <p className="font-bold">Diện tích</p>
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="border rounded-md"
                  >
                    <div className="w-[85%] p-2">
                      <input
                        min={0}
                        type="number"
                        name="acreage"
                        value={values.acreage}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        className="bg-transparent outline-none w-full"
                      />
                    </div>
                    <div className="w-[15%] p-2 bg-gray-100 text-center">
                      m<sup>2</sup>
                    </div>
                  </Stack>
                  {touched.acreage && errors.acreage && (
                    <span className="text-red-primary text-sm italic">
                      {errors.acreage}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-10">
                <h3 className="font-bold text-2xl">
                  Hình ảnh
                </h3>
                <p className="mt-5">
                  Cập nhật hình ảnh rõ ràng sẽ cho thuê
                  nhanh hơn
                </p>
                <div className="mt-5 h-[200px] border-4 border-dashed relative">
                  <input
                    type="file"
                    name="myImage"
                    accept="image/png, image/gif, image/jpeg"
                    className={`absolute inset-0 opacity-100 ${styles.inputFile}`}
                    multiple
                    onChange={(e) =>
                      setImagesFile([
                        ...imagesFile,
                        ...Array.from(e.target.files ?? []),
                      ])
                    }
                  />
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    className="w-full h-full"
                  >
                    <FcCompactCamera size={100} />
                    <p>Thêm ảnh</p>
                  </Stack>
                </div>
                {touched.images && errors.images && (
                  <span className="text-red-primary text-sm italic">
                    {errors.images}
                  </span>
                )}
                <Stack
                  direction="row"
                  gap={2}
                  className="mt-3"
                  justifyContent={{
                    xs: 'center',
                    sm: 'initial',
                  }}
                  flexWrap="wrap"
                >
                  {imagesFile?.length > 0 &&
                    Array.from(imagesFile)?.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="relative max-sm:w-[175px] max-sm:h-[90px] sm:w-[235px] sm:h-[150px] border rounded-md bg-gray-100"
                        >
                          <Image
                            alt="image"
                            src={URL.createObjectURL(item)}
                            fill
                            objectFit="contain"
                          />
                          <Stack
                            alignItems="center"
                            justifyContent="center"
                            className="absolute top-1 right-2 w-[30px] h-[30px] rounded-full transition-colors text-white bg-black cursor-pointer border hover:bg-white hover:text-black"
                            onClick={() =>
                              handleRemoveImage(index)
                            }
                          >
                            <AiFillDelete size={17} />
                          </Stack>
                        </div>
                      ),
                    )}
                </Stack>
              </div>
              <div className="mt-10 rounded-md sm:text-lg font-bold">
                <Button
                  type="submit"
                  content={`${
                    isSubmitting ? 'Đang xử lý' : 'Tiếp tục'
                  }`}
                  containerStyles="w-full bg-green-600 py-[0.5rem]"
                />
              </div>
            </form>
          </Grid>
          <Grid item lg={4} className="max-lg:hidden">
            <div className="bg-amber-100 text-yellow-800 p-4 rounded-md">
              <p className="text-2xl">Lưu ý khi đăng tin</p>
              <div></div>
              <ul className="mt-3">
                <li
                  className={`text-sm ${styles.noticeItem}`}
                >
                  <p className="pl-5">
                    Nội dung phải viết bằng tiếng Việt có
                    dấu
                  </p>
                </li>
                <li
                  className={`text-sm ${styles.noticeItem}`}
                >
                  <p className="pl-5">
                    Tiêu đề tin không dài quá 100 kí tự
                  </p>
                </li>
                <li
                  className={`text-sm ${styles.noticeItem}`}
                >
                  <p className="pl-5">
                    Các bạn nên điền đầy đủ thông tin vào
                    các mục để tin đăng có hiệu quả hơn.
                  </p>
                </li>
                <li
                  className={`text-sm ${styles.noticeItem}`}
                >
                  <p className="pl-5">
                    Để tăng độ tin cậy và tin rao được nhiều
                    người quan tâm hơn, hãy sửa vị trí tin
                    rao của bạn trên bản đồ bằng cách kéo
                    icon tới đúng vị trí của tin rao.
                  </p>
                </li>
                <li
                  className={`text-sm ${styles.noticeItem}`}
                >
                  <p className="pl-5">
                    Tin đăng có hình ảnh rõ ràng sẽ được xem
                    và gọi gấp nhiều lần so với tin rao
                    không có ảnh. Hãy đăng ảnh để được giao
                    dịch nhanh chóng!
                  </p>
                </li>
              </ul>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PostPosts;
