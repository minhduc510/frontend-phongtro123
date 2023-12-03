import { combineReducers } from 'redux';

import userSlice from './user';
import authSlice from './auth';
import menusSlice from './menus';
import rangesSlice from './ranges';
import filtersSlice from './filter';
import infoPostSlice from './infoPost';
import categoriesSlice from './categories';
import postFavouriteSlice from './postFavourite';

const rootReducer = combineReducers({
  user: userSlice,
  auth: authSlice,
  menus: menusSlice,
  ranges: rangesSlice,
  filters: filtersSlice,
  infoPost: infoPostSlice,
  categories: categoriesSlice,
  postFavourite: postFavouriteSlice,
});

export default rootReducer;
