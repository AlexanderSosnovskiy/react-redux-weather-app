import {
  WiDayCloudy,
  WiDayFog,
  WiDayRain,
  WiDaySnow,
  WiDaySunny,
  WiDayThunderstorm,
  WiNightClear,
  WiNightCloudy,
  WiNightFog,
  WiNightRain,
  WiNightSnow,
  WiNightThunderstorm,
} from 'react-icons/wi';
import React from 'react';
import { RiDrizzleLine } from 'react-icons/ri';

export const determineDay = dayNum => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[dayNum];
};

export const transformDate = date => {
  date = date.slice(-2);
  const ending = date.endsWith('1')
    ? 'st'
    : date.endsWith('2')
    ? 'nd'
    : date.endsWith('3')
    ? 'rd'
    : 'th';

  return date + ending;
};

export const getTime = timezone => {
  const d = new Date();
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const result = utc + 1000 * timezone;
  return new Date(result).toLocaleTimeString('en-US');
};

export const determineGif = id => {
  const firstDigit = (id + '')[0];

  if (id === 800) {
    return require('./assets/clear.gif').default;
  }

  switch (firstDigit) {
    case '2':
      return require('./assets/thunderstorm.gif').default;
    case '3':
      return require('./assets/drizzle.gif').default;
    case '5':
      return require('./assets/rain.gif').default;
    case '6':
      return require('./assets/snow.gif').default;
    case '7':
      return require('./assets/fog.gif').default;
    case '8':
      return require('./assets/clouds.gif').default;
    default:
      return null;
  }
};

export const determineIcon = (idOfWeather, day, color, hw) => {
  const firstDigit = (idOfWeather + '')[0];

  if (idOfWeather === 800) {
    return day ? (
      <WiDaySunny style={{ color: color, height: hw, width: hw }} />
    ) : (
      <WiNightClear style={{ color: color, height: hw, width: hw }} />
    );
  }

  switch (firstDigit) {
    case '2':
      return day ? (
        <WiDayThunderstorm style={{ color: color, height: hw, width: hw }} />
      ) : (
        <WiNightThunderstorm style={{ color: color, height: hw, width: hw }} />
      );
    case '3':
      return <RiDrizzleLine style={{ color: color, height: hw, width: hw }} />;
    case '5':
      return day ? (
        <WiDayRain style={{ color: color, height: hw, width: hw }} />
      ) : (
        <WiNightRain style={{ color: color, height: hw, width: hw }} />
      );
    case '6':
      return day ? (
        <WiDaySnow style={{ color: color, height: hw, width: hw }} />
      ) : (
        <WiNightSnow style={{ color: color, height: hw, width: hw }} />
      );
    case '7':
      return day ? (
        <WiDayFog style={{ color: color, height: hw, width: hw }} />
      ) : (
        <WiNightFog style={{ color: color, height: hw, width: hw }} />
      );
    case '8':
      return day ? (
        <WiDayCloudy style={{ color: color, height: hw, width: hw }} />
      ) : (
        <WiNightCloudy style={{ color: color, height: hw, width: hw }} />
      );
    default:
      return null;
  }
};