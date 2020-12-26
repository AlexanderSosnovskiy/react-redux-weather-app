import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { IoLocationOutline } from 'react-icons/io5';
import { determineIcon } from '../utils';
import { getTime } from '../utils';

const useStyles = makeStyles(theme => ({
  locationName: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    padding: '0.5rem 0.75rem',
    boxShadow: '0 3px 5px rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(3px)',
    color: '#fff',
  },
  locationIcon: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    color: '#fff',
  },
  light: {
    textAlign: 'center',
    color: '#fff',
  },
}));

const WeatherReportDisplay = ({ weatherData }) => {
  const classes = useStyles();

  const {
    name,
    main,
    temp,
    timezone,
    id,
    windRotation,
    windSpeed,
  } = useMemo(() => {
    const [weather] = weatherData.weather || [];

    return {
      name: weatherData.name ? weatherData.name : '',
      main: weather ? weather.main : '',
      timezone: weatherData.timezone ? weatherData.timezone : '',
      temp: weatherData.main
        ? Math.round(weatherData.main.temp).toString()
        : '',
      id: weather ? weather.id : '',
      windRotation: weatherData.wind ? weatherData.wind.deg - 90 : null,
      windSpeed: weatherData.wind ? Math.round(weatherData.wind.speed) : 0,
    };
  }, [weatherData]);

  return (
    <Grid container spacing={1} justify='center' alignItems='center'>
      {name && (
        <Grid item>
          <p className={classes.light}>last update: {getTime(timezone)}</p>
          <Typography className={classes.locationName} variant='h4'>
            <IoLocationOutline className={classes.locationIcon} />
            {name}
          </Typography>
        </Grid>
      )}

      <Grid item container spacing={5} justify='center' alignItems='center'>
        {id && <Grid item>{determineIcon(id, true, '#fff', '4rem')}</Grid>}
        {temp && (
          <Grid item>
            <Typography className={classes.light} variant='h5'>
              {temp}°C
            </Typography>
          </Grid>
        )}
      </Grid>

      <Grid container item spacing={4} justify='center' alignItems='center'>
        {main && (
          <Grid item>
            <Typography className={classes.light} variant='h6'>
              {main}
            </Typography>
          </Grid>
        )}
        {windSpeed > 0 && (
          <Grid item>
            <Typography className={classes.light} variant='h6'>
              {windRotation !== null && (
                <ArrowRightAltIcon
                  className={classes.light}
                  style={{ transform: `rotateZ(${windRotation}deg)` }}
                />
              )}
              {`${windSpeed} km/h`}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default WeatherReportDisplay;
