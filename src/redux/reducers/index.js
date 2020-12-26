import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import languageReducer from './languageReducer';
import locationReducer from './locationReducer';
import weatherReducer from './weatherReducer';

const reducers = combineReducers({
  theme: themeReducer,
  language: languageReducer,
  location: locationReducer,
  weather: weatherReducer,
});

export default reducers;
