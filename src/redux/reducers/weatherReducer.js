import { SET_CURRENT_WEATHER, SET_DAILY_FORECAST } from '../types';

const initialState = {
  weather: {},
  isLoading: true,
  error: '',
};

const weatherReducer = (state = initialState, action) => {
  if (action.type === SET_CURRENT_WEATHER) {
    return {
      ...state,
      currentWeather: action.data,
      isLoading: action.isLoading,
      error: action.error,
    };
  } else if (action.type === SET_DAILY_FORECAST) {
    return {
      ...state,
      forecast: action.payload,
    };
  }

  return state;
};

export default weatherReducer;
