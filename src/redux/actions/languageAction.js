import { SET_LANGUAGE } from '../types';

const changeLanguage = lang => {
  localStorage.setItem('language', lang);

  return {
    type: SET_LANGUAGE,
    payload: lang,
  };
};

export default changeLanguage;
