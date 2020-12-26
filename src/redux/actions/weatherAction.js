import { SET_CURRENT_WEATHER, SET_DAILY_FORECAST } from '../types';

export const fetchCurrentWeatherData = locationName => async () => {
  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
    );

    if (result.status === 200) {
      return {
        type: SET_CURRENT_WEATHER,
        data: await result.json(),
        success: true,
        error: '',
      };
    }

    return {
      type: SET_CURRENT_WEATHER,
      data: {},
      success: false,
      error: result.statusText,
    };
  } catch (error) {
    return {
      type: SET_CURRENT_WEATHER,
      data: {},
      success: false,
      error: error.statusText,
    };
  }
};

export const fetchForecastWeatherData = (lat, lon) => async () => {
  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
    );

    if (result.status === 200) {
      return {
        type: SET_DAILY_FORECAST,
        forecast: await result.json(),
        isLoading: false,
        error: '',
      };
    }

    return {
      type: SET_DAILY_FORECAST,
      forecast: {},
      isLoading: false,
      error: result.statusText,
    };
  } catch (error) {
    return {
      type: SET_DAILY_FORECAST,
      forecast: {},
      isLoading: false,
      error: error.statusText,
    };
  }
};
