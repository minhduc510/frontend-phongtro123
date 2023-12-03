import { Stack } from '@mui/material';
import { useState, useEffect } from 'react';

import { FaArrowUp } from '@/icons';
import styles from './styles.module.scss';

const BackToTop = () => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    document.onscroll = () => {
      window.scrollY > 50 ? setShow(true) : setShow(false);
    };
    return () => {
      document.removeEventListener('scroll', () => {});
    };
  }, []);

  const handleClickToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {show && (
        <Stack
          alignItems="center"
          justifyContent="center"
          className={`${styles.backToTop} rounded-full bg-red-primary bottom-20 lg:bottom-5 right-5 w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] max-sm:text-xl text-3xl`}
          onClick={handleClickToTop}
        >
          <FaArrowUp color="#fff" />
        </Stack>
      )}
    </>
  );
};

export default BackToTop;
