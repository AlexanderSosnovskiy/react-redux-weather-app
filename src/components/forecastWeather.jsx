import React, { useState, useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import { fetchForecastWeatherData } from '../redux/actions/weatherAction';
import Loading from './loading';
import Error from './error';
import { determineDay, transformDate, determineIcon } from '../utils';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import { GiCrossedAirFlows } from 'react-icons/gi';
import { MdVisibility } from 'react-icons/md';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import CustomizedAccordions from './forecastDetails';
import Paper from '@material-ui/core/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  forecastLink: {
    color: '#222',
  },
  maxWidth: {
    width: 'auto',
    margin: '0 auto',
  },
  date: {
    fontSize: '1.5rem',
    fontWeight: '600',
  },
  box: {
    padding: '1.5rem 0',
    border: '1px solid #222',
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  main: {
    overflow: 'hidden',
    maxWidth: '80vw',
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
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const palette = [
    '#eef1c3',
    '#f6f5bd',
    '#f9f2c4',
    '#fcf2c7',
    '#FAE3C3',
    '#FFD6AF',
    '#FFC6A4',
    '#FFB3A6',
  ];

  const groupByDay = data => {
    const grouped = data.reduce((list, item) => {
      const forecastDate = item.dt_txt.split(' ')[0];
      list[forecastDate] = list[forecastDate] || [];
      list[forecastDate].push(item);

      return list;
    }, {});

    setGroupedForecast(grouped);
  };

  const getDayInfo = data => {
    const daysOfWeek = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
  };

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

  const showMoreInfo = i => {
    console.log(i.target);
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  } else {
    const tiles = Object.values(groupedForecast);
    const forecastTiles = tiles.length > 5 ? tiles.slice(0, 5) : tiles;

    return (
      <>
        <Box>
          <Box>
            {groupedForecast[activeDay].map((item, i) => {
              console.log(item);
            })}
          </Box>
          <Paper square>
            <Tabs
              value={value}
              indicatorColor='primary'
              textColor='primary'
              onChange={handleChange}
              variant='fullWidth'
              aria-label='full width tabs example'
            >
              {forecastTiles.map((item, i) => (
                <Tab
                  className={classes.forecastLink}
                  label={getDayInfo(item)}
                  onClick={() => {
                    setActiveDay(item[0].dt_txt.split(' ')[0]);
                  }}
                />
              ))}
            </Tabs>
          </Paper>
          <Box>
            {groupedForecast[activeDay].map((item, i) => (
              <div style={{ display: 'inline-block' }}>
                <div
                  onClick={e => {
                    showMoreInfo(e);
                  }}
                >
                  <div>temp {item.main.temp}</div>
                  <div>
                    {determineIcon(item.weather[0].id, false, '#222', '5rem')}
                  </div>
                </div>
                <div style={{ display: 'none' }}>
                  <div>feels like {item.main.feels_like}</div>
                  <div>humidity {item.main.humidity}</div>
                  <div>pressure {item.main.pressure}</div>
                  <div>temp {item.main.temp}</div>
                  <div>description {item.weather[0].description}</div>
                </div>
              </div>
            ))}
          </Box>
        </Box>
      </>
    );
  }
};

export default ForecastWeather;
