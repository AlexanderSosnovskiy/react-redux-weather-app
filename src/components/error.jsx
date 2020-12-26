import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import Typography from '@material-ui/core/Typography';

const Error = ({ error }) => {
  if (!error) return null;

  return (
    <>
      <ErrorIcon color='error' />
      <Typography color='error' variant='h5'>
        {error}
      </Typography>
    </>
  );
};

export default Error;
