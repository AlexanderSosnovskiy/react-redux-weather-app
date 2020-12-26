import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ReplayIcon from '@material-ui/icons/Replay';
import Loading from './loading';
import Error from './error';
import WeatherReportDisplay from './weatherReportDisplay';
import { removeLocation } from '../redux/actions/locationAction';
import { fetchCurrentWeatherData } from '../redux/actions/weatherAction';
import { determineGif } from '../utils';

const useStyles = makeStyles(() => ({
  cardContainer: {
    position: 'relative',
  },
  cardController: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  cardButton: {
    padding: '2px',
    boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(3px)',
    color: '#fff',
    transform: 'translate(-50%, -50%)',
  },
  cardMainContent: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.3)',
  },
}));

const WeatherCard = ({ location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState('');
  const [bgUrl, setBgUrl] = useState();

  async function getWeather() {
    setIsLoading(true);

    await dispatch(fetchCurrentWeatherData(location))
      .then(result => {
        setWeather(result.data);
        setIsLoading(result.isLoading);
        setError(result.error);
        setBgUrl(result.data.weather[0].id);
      })
      .catch(err => setError(err));
  }

  useEffect(() => {
    getWeather();
  }, []);

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  } else {
    return (
      <div className={classes.cardContainer}>
        <div className={classes.cardController}>
          <IconButton
            className={classes.cardButton}
            onClick={() => {
              getWeather(location);
            }}
          >
            <ReplayIcon />
          </IconButton>
          <IconButton
            className={classes.cardButton}
            onClick={() => dispatch(removeLocation(location))}
          >
            <CancelIcon />
          </IconButton>
        </div>
        <Link
          component={RouterLink}
          to={`/locations/${location}`}
          onClick={() =>
            localStorage.setItem('coords', JSON.stringify(weather.coord))
          }
          color='textPrimary'
          underline='none'
        >
          <Card
            className={classes.cardMainContent}
            style={{
              backgroundImage: `url(${determineGif(bgUrl)})`,
            }}
            variant='outlined'
          >
            <CardContent>
              <Error error={error} />
              <WeatherReportDisplay weatherData={weather} />
            </CardContent>
          </Card>
        </Link>
      </div>
    );
  }
};

export default WeatherCard;
