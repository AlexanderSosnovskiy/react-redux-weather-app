import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = ({ isLoading }) => {
  return isLoading ? <CircularProgress /> : null;
};

export default Loading;
