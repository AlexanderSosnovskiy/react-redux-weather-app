import { SET_LANGUAGE } from '../types';

const initialState = {
  language: localStorage.getItem('language') || 'ua',
};

const languageReducer = (state = initialState, action) => {
  if (action.type === SET_LANGUAGE) {
    return { ...state, language: action.payload };
  }

  return state;
};

export default languageReducer;
