import { Fragment } from 'react';
import { Container } from '@mui/material';

import Header from './Header';
import Footer from './Footer';
import WhyUs from './WhyUs';
import Contact from './Contact';
import HeaderMobile from './HeaderMobile';
import { BackToTop } from '@/components';

const DefaultLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const isMobile =
    window.innerWidth <
    Number(import.meta.env.VITE_URL_BREAKPOINT_LG);
  const WrapBody =
    window.innerWidth <
    Number(import.meta.env.VITE_URL_BREAKPOINT_SM)
      ? Fragment
      : Container;
  return (
    <>
      <Header />
      <div className="bg-background-color py-5 max-lg:mt-[60px]">
        <WrapBody>
          <div>{children}</div>
          <WhyUs />
          <Contact />
        </WrapBody>
      </div>
      <Footer />
      <BackToTop />
      {isMobile && <HeaderMobile />}
    </>
  );
};

export default DefaultLayout;
