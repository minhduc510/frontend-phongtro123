import { Navigate, useLocation } from 'react-router-dom';

import path from '@/routes/path';
import { useAppSelector } from '@/redux/hooks';
import { stateLoginSlice } from '@/redux/slices/auth';

type IProps = React.PropsWithChildren;

const AuthMiddware: React.FC<IProps> = ({ children }) => {
  const { login, token } = useAppSelector(stateLoginSlice);
  const location = useLocation();
  const redirectTo = `${
    path.login
  }?continue_url=${encodeURIComponent(location.pathname)}`;
  return (
    <>
      {login && token ? (
        children
      ) : (
        <Navigate to={redirectTo} />
      )}
    </>
  );
};

export default AuthMiddware;
