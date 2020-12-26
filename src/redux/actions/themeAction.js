import { SET_THEME } from '../types';

const changeTheme = type => {
  return {
    type: SET_THEME,
    payload: type,
  };
};

export default changeTheme;
