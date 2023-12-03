import React from 'react';
import { Stack } from '@mui/material';
import { Link, LinkProps } from 'react-router-dom';

import styles from './styles.module.scss';

interface IProps {
  type: 'button' | 'submit';
  content: string;
  containerStyles?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  to?: string;
  onClick?: () => void;
}

interface IPropsComp {
  [key: string]: string;
}

const Button: React.FC<IProps> = ({
  type,
  iconLeft,
  iconRight,
  to,
  content,
  containerStyles,
  onClick,
}) => {
  const props: IPropsComp = {};
  let Comp:
    | React.ForwardRefExoticComponent<
        LinkProps & React.RefAttributes<HTMLAnchorElement>
      >
    | string = 'div';
  if (to) {
    props.to = to;
    Comp = Link;
  }
  return (
    <button
      type={type}
      className={`rounded-md text-white ${
        containerStyles || ''
      } ${styles.hover}`}
      onClick={() => onClick && onClick()}
    >
      <Comp {...props}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={{ xs: 0.5 }}
        >
          {iconLeft}
          {content}
          {iconRight}
        </Stack>
      </Comp>
    </button>
  );
};

export default Button;
