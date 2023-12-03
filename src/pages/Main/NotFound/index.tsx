import { Stack } from '@mui/material';

import { TbSearchOff } from '@/icons';

const NotFound = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      className="border bg-white rounded-md py-10"
    >
      <TbSearchOff size={60} />
      <p>Đường link này không tồn tại</p>
    </Stack>
  );
};

export default NotFound;
