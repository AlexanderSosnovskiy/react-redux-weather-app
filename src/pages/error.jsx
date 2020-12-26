import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const Error = () => {
  return (
    <Grid container justify='center' alignItems='center'>
      <Grid item>
        <h1>Ooops! Something went wrong!</h1>
        <Link to='/'>back to home page</Link>
      </Grid>
    </Grid>
  );
};

export default Error;
