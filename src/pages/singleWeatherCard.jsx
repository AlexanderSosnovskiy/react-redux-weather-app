import React from 'react';
import ForecastWeather from '../components/forecastWeather';

const SingleWeatherCard = () => {
  return (
    <div>
      <ForecastWeather coords={JSON.parse(localStorage.getItem('coords'))} />
    </div>
  );
};

export default SingleWeatherCard;
