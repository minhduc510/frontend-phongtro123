import { Suspense, lazy } from 'react';

import { RangeFilterProps } from '@/interface';
import BoxFilterLoading from './BoxFilterLoading';

const BoxFilterMain = lazy(() => import('./BoxFilterMain'));

interface IProps {
  data: RangeFilterProps[];
  type: 'price' | 'acreage';
}

const BoxFilter = (props: IProps) => {
  return (
    <Suspense
      fallback={<BoxFilterLoading type={props.type} />}
    >
      <BoxFilterMain props={{ ...props }} />
    </Suspense>
  );
};

export default BoxFilter;
