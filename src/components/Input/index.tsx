import { ChangeEvent, useState } from 'react';
import { Stack } from '@mui/material';

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from '@/icons';

interface IProps {
  id?: string;
  name: string;
  value: string;
  type: 'text' | 'password';
  errors: string | undefined;
  touched: boolean | undefined;
  inputStyles?: string;
  containerStyles?: string;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement, Element>,
  ) => void;
  handleChange: (e: ChangeEvent) => void;
}

const Input: React.FC<IProps> = ({
  id,
  type,
  name,
  value,
  errors,
  touched,
  inputStyles,
  containerStyles,
  handleBlur,
  handleChange,
}) => {
  const [showPassword, setShowPassword] =
    useState<boolean>(false);
  const [typeInput, setTypeInput] = useState(type);

  const handleChangeType = () => {
    if (showPassword) {
      setTypeInput('password');
    } else {
      setTypeInput('text');
    }
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        className={`${containerStyles} border rounded-md p-2`}
      >
        <input
          type={typeInput}
          value={value}
          className={`${inputStyles} outline-none w-full bg-transparent`}
          name={name}
          id={id}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {type === 'password' && (
          <div onClick={handleChangeType}>
            {showPassword ? (
              <AiOutlineEye size={23} />
            ) : (
              <AiOutlineEyeInvisible size={23} />
            )}
          </div>
        )}
      </Stack>
      {touched && errors && (
        <span className="italic text-red-primary text-sm">
          {errors}
        </span>
      )}
    </>
  );
};

export default Input;
