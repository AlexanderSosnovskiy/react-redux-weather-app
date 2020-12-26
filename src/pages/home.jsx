import React from 'react';
import Autocomplete from '../components/autocomplete';
import CurrentWeatherList from '../components/currentWeatherList';

const Home = () => {
  return (
    <>
      <Autocomplete />
      <CurrentWeatherList />
    </>
  );
};

export default Home;
