import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { fetchForecastWeatherData } from '../redux/actions/weatherAction';
import Loading from './loading';
import Error from './error';
import {
  getDay,
  transformDate,
  determineIcon,
  degToTextDirection,
  windSpeedToText,
  palette,
} from '../utils';

const useStyles = makeStyles(theme => ({
  forecastMenu: {
    margin: '1rem auto',
  },
  forecastLink: {
    fontSize: '1.5rem',
    color: '#222',
  },
  forecast: {
    display: 'flex',
    justifyContent: 'center',
  },
  forecastSlot: {
    display: 'flex',
    border: '1px solid lightgray',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  forecastSlotPrimary: {
    width: '5rem',
    margin: '0 auto',
    padding: '0.5rem 0',
    textAlign: 'center',
  },
  forecastSlotSecondary: {
    width: '250px',
    height: '100%',
    backgroundColor: '#f3f3ee',
    padding: '0.5rem 1rem',
  },
  hide: {
    display: 'none',
  },
  forecastItem: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    height: '20rem',
    textAlign: 'center',
  },
  forecastWind: {
    position: 'relative',
    maxWidth: '2rem',
    margin: '0 auto',
    textAlign: 'center',
  },
  forecastWindSpeed: {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '5',
    display: 'inline-block',
    width: '100%',
    height: '100%',
    lineHeight: '2rem',
    fontWeight: '600',
  },
  forecastWindIcon: {
    display: 'inline-block',
    width: '100%',
    height: '100%',
    margin: '0 auto',
  },
}));

const ForecastWeather = ({ coords }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [groupedForecast, setGroupedForecast] = useState([]);
  const [activeDay, setActiveDay] = useState();
  const [hour, setHour] = useState(0);
  const [value, setValue] = useState(0);

  async function getForecast() {
    setIsLoading(true);

    await dispatch(fetchForecastWeatherData(coords.lat, coords.lon))
      .then(result => {
        groupByDay(result.forecast.list);
        setActiveDay(result.forecast.list[0].dt_txt.split(' ')[0]);
        setIsLoading(result.isLoading);
        setError(result.error);
      })
      .catch(error => {
        setIsLoading(false);
        setError(error);
      });
  }

  useEffect(() => {
    getForecast();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const groupByDay = data => {
    const grouped = data.reduce((list, item) => {
      const forecastDate = item.dt_txt.split(' ')[0];
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);

      return list;
    }, {});

    setGroupedForecast(grouped);
  };

  const getDailyInfo = (data, min = [], max = [], day = '', date = '') => {
    data.map(item => {
      max.push(item.main.temp_max);
      min.push(item.main.temp_min);
      day = getDay(item);
      date = transformDate(item.dt_txt.split(' ')[0]);
    });

    const minMax = {
      min: Math.round(Math.min(...min)),
      max: Math.round(Math.max(...max)),
    };

    return (
      <>
        <div>
          <strong>{`${day} ${date}`}</strong>
        </div>
        <div>
          <strong>{`${minMax.max}°C`}</strong> /{`${minMax.min}°C`}
        </div>
      </>
    );
  };

  const createCurve = temp => {
    temp = Math.round(temp);
    const dailyTemp = groupedForecast[activeDay].map(v =>
      Math.round(v.main.temp),
    );
    const uniqueDailyTemp = dailyTemp.filter((v, i, a) => a.indexOf(v) === i);
    const sortedDailyTemp = uniqueDailyTemp.sort((a, b) => a - b);

    return {
      position: 'absolute',
      bottom: `${
        ((sortedDailyTemp.indexOf(temp) + 1) * 12.5) 
      }%`,
      left: '50%',
      width: '100%',
      transform: 'translateX(-50%)',
      backgroundColor: `${palette[sortedDailyTemp.indexOf(temp)]}`,
    };
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  } else if (error) {
    return <Error error={error} />;
  } else {
    const tiles = Object.values(groupedForecast);
    const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

    return (
      <Box justifyContent='center'>
        <Paper square>
          <Tabs
            className={classes.forecastMenu}
            value={value}
            indicatorColor='primary'
            textColor='primary'
            onChange={handleChange}
            variant='fullWidth'
            aria-label='full width tabs example'
          >
            {forecastTiles.map((item, i) => (
              <Tab
                key={item[i].dt_txt}
                className={classes.forecastLink}
                label={getDailyInfo(item)}
                onClick={() => {
                  setActiveDay(item[0].dt_txt.split(' ')[0]);
                }}
              />
            ))}
          </Tabs>
        </Paper>
        <Box className={classes.forecast}>
          {groupedForecast[activeDay].map((item, i) => (
            <div className={classes.forecastSlot}>
              <div
                key={i}
                className={classes.forecastSlotPrimary}
                onClick={() => {
                  setHour(item.dt_txt.split(' ')[1]);
                }}
              >
                <Typography variant='h5'>
                  {item.dt_txt.split(' ')[1].slice(0, 5)}
                </Typography>
                <div className={classes.forecastItem}>
                  <div
                    style={createCurve(item.main.temp)}
                    className={classes.forecastCurve}
                  >
                    {determineIcon(item.weather[0].id, false, '#222', '4rem')}
                    <Typography variant='h5'>
                      {`${Math.round(item.main.temp)}°C`}
                    </Typography>
                  </div>
                </div>
                <div className={classes.forecastWind}>
                  <span className={classes.forecastWindSpeed}>
                    {Math.round(item.wind.speed)}
                  </span>
                  <span className={classes.forecastWindIcon}>
                    <svg
                      style={{
                        transform: `rotate(${item.wind.deg - 90}deg)`,
                      }}
                      viewBox='0 0 32 32'
                    >
                      <rect width='100%' height='100%' fill='#FFFFFF'></rect>
                      <rect
                        width='100%'
                        height='100%'
                        stroke='none'
                        fill='#FFFFFF'
                      ></rect>
                      <g
                        transform='translate(16.0, 16.0) rotate(90.0) translate(-16.0, -16.0)'
                        fill='#000000'
                        stroke='none'
                      >
                        <path d='M13.1 5.1l2.1-2.2V16h1.6V2.9l2.1 2.2L20 4l-4-4-4 4'></path>
                      </g>
                      <circle
                        fill='#FFFFFF'
                        stroke='#000000'
                        strokeWidth='1'
                        cx='16'
                        cy='16'
                        r='9.5'
                      ></circle>
                    </svg>
                  </span>
                </div>
              </div>
              {item.dt_txt.split(' ')[1] === hour ? (
                <div className={classes.forecastSlotSecondary}>
                  <Typography variant='h6'>
                    <strong>
                      {`${item.weather[0].description.replace(
                        /^./,
                        item.weather[0].description[0].toUpperCase(),
                      )} ${windSpeedToText(item.wind.speed)}`}
                    </strong>
                  </Typography>
                  <Typography variant='h6'>
                    {`Temperature feels like ${Math.round(
                      item.main.feels_like,
                    )}°C`}
                  </Typography>
                  <Typography variant='h6'>
                    <div>Humidity {item.main.humidity}%</div>
                    <div>Pressure {item.main.pressure} mb</div>
                    <div>Visibility {item.visibility / 100}%</div>
                  </Typography>
                  <Typography variant='h6'>
                    description {item.weather[0].description}
                  </Typography>
                  <Typography variant='h6'>
                    {`A ${
                      item.weather[0].description
                    } from the ${degToTextDirection(item.wind.deg)}`}
                  </Typography>
                </div>
              ) : null}
            </div>
          ))}
        </Box>
      </Box>
    );
  }
};

export default ForecastWeather;
