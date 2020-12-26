import { SET_LOCATION, REMOVE_LOCATION } from '../types';

export const addLocation = locationName => {
  return {
    type: SET_LOCATION,
    payload: locationName,
  };
};

export const removeLocation = locationName => {
  return {
    type: REMOVE_LOCATION,
    payload: locationName,
  };
};
