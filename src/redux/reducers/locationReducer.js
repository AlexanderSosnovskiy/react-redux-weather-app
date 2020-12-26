import { SET_LOCATION, REMOVE_LOCATION } from '../types';

const initialStates = {
  locations: JSON.parse(localStorage.getItem('locations')) || [],
};

const locationReducer = (state = initialStates, action) => {
  if (action.type === SET_LOCATION) {
    let isExist = state.locations.some(location => location === action.payload);

    if (!isExist) {
      localStorage.setItem(
        'locations',
        JSON.stringify([...state.locations, action.payload]),
      );
      return { ...state, locations: [...state.locations, action.payload] };
    }
  } else if (action.type === REMOVE_LOCATION) {
    let updatedLocations = state.locations.filter(
      location => location !== action.payload,
    );
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
    return { ...state, locations: updatedLocations };
  }

  return state;
};

export default locationReducer;
