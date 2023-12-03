/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import {
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import routes from './routes';
import AuthMiddware from './components/AuthMiddleware';
import { localStorage, swal } from '@/helpers';
import { apiClient, apiClient2 } from './api';
import { userAdded } from './redux/slices/user';
import { menuAdded } from './redux/slices/menus';
import { stateLoginSlice } from './redux/slices/auth';
import { categoriesAdded } from './redux/slices/categories';
import {
  rangeAcreageAdded,
  rangePriceAdded,
} from './redux/slices/ranges';
import {
  pushPostFavourite,
  removePostFavourite,
} from './redux/slices/postFavourite';
import {
  useAppDispatch,
  useAppSelector,
} from './redux/hooks';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  let { login } = useAppSelector(stateLoginSlice);
  if (localStorage.getAuth()) {
    const dataStorage = localStorage.getAuth();
    login = dataStorage.login;
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (login) {
      const callApi = async () => {
        const { error, data } =
          await apiClient2.userCurrent();
        if (!error) {
          dispatch(userAdded(data));
        }
      };
      callApi();
    }
  }, []);

  useEffect(() => {
    const callApi = async () => {
      const responseRangePrice =
        await apiClient.rangePrice();
      const responseRangeAcreage =
        await apiClient.rangeAcreage();
      if (!responseRangePrice.error)
        dispatch(rangePriceAdded(responseRangePrice.data));
      if (!responseRangeAcreage.error)
        dispatch(
          rangeAcreageAdded(responseRangeAcreage.data),
        );
    };
    callApi();
  }, []);

  useEffect(() => {
    const callApi = async () => {
      const { error, data } = await apiClient.menus();
      if (!error) {
        dispatch(menuAdded(data));
      }
    };
    callApi();
  }, []);

  useEffect(() => {
    const callApi = async () => {
      const { error, data } = await apiClient.categories();
      if (!error) {
        dispatch(categoriesAdded(data));
      }
    };
    callApi();
  }, []);

  useEffect(() => {
    if (login) {
      const callApi = async () => {
        const { error, data } =
          await apiClient2.getFavourite();
        if (!error) {
          const { total, list } = data;
          dispatch(pushPostFavourite({ total, list }));
        }
      };
      callApi();
    } else {
      dispatch(removePostFavourite());
    }
  }, [login]);

  useEffect(() => {
    window.addEventListener('online', function () {
      swal
        .success('Kết nối mạng thành công !!!')
        .then(() => {
          this.location.reload();
        });
    });
    window.addEventListener('offline', function () {
      swal
        .warning('Vui lòng kiểm tra lại đường truyền !!!')
        .then(() => {
          this.location.reload();
        });
    });
    return () => {
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, []);

  return (
    <>
      <Routes>
        {routes.map(
          ({
            path,
            element: Element,
            layout: Layout,
            isPrivate,
          }) => {
            const MiddwareComp = isPrivate
              ? AuthMiddware
              : Fragment;
            return (
              <Fragment key={path}>
                <Route
                  path={path}
                  element={
                    <MiddwareComp>
                      <Layout>
                        <Element />
                      </Layout>
                    </MiddwareComp>
                  }
                />
              </Fragment>
            );
          },
        )}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
